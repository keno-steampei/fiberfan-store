/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { DataSourceModal } from './components/DataSourceModal';
import { CartIcon } from './components/FiberFanIcons/CartIcon';
import { DatabaseIcon } from './components/FiberFanIcons/DatabaseIcon';
import { SearchIcon } from './components/FiberFanIcons/SearchIcon';
import { GarmentImpactModal } from './components/GarmentImpactModal';
import { ImpactReceiptModal } from './components/ImpactReceiptModal';
import { ProductCard } from './components/ProductCard';
import { DEFAULT_CSV_DATA, DEFAULT_CSV_URL, LOCAL_STORAGE_GSHEET_DATA_KEY, LOCAL_STORAGE_GSHEET_URL_KEY } from './constants';
import type { Product } from './types';

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
// const convertToCSVUrl = (url) => {https://docs.google.com/spreadsheets/d/e/2PACX-1vR8MZPrvX5l1VwozCXcqF4-9SFBC9uu53XaLlh24nNhxuokZj_b1t0nQ4oRcWx6oA/pubhtml?gid=288112212&single=true
//   if (!url) return '';
//   if (url.includes('docs.google.com/spreadsheets')) {
//     const matches = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
//     if (matches && matches[1]) {
//       const sheetId = matches[1];
//       let gid = '0';
//       const gidMatch = url.match(/gid=([0-9]+)/);
//       if (gidMatch && gidMatch[1]) {
//         gid = gidMatch[1];
//       }
//       return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
//     }
//   }
//   return url;
// };
// Robust conversion helper handling BOTH "Publish to web" and standard Share links
const convertToCSVUrl = (url: string) => {
  if (!url) return '';
  const trimmed = url.trim();

  // 1. If it's already a "Publish to web" CSV link, return as-is
  if (trimmed.includes('/pub?') && trimmed.includes('output=csv')) {
    return trimmed;
  }

  // 2. If it's a "Publish to web" standard link, convert output to csv
  if (trimmed.includes('/pubhtml') || trimmed.includes('/pub?')) {
    return trimmed.replace(/\/pubhtml.*/, '/pub?output=csv').replace(/output=[^&]+/, 'output=csv');
  }

  // 3. Handle standard Google Sheet edit/share URLs (/d/SHEET_ID/edit...)
  const sheetIdMatch = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (sheetIdMatch && sheetIdMatch[1]) {
    const sheetId = sheetIdMatch[1];
    const gidMatch = trimmed.match(/[?&]gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}`;
  }

  return trimmed;
};

const parseCSV = (csvText: string): { [key: string]: string }[] | any => {
  if (!csvText) return [];
  const lines = [];
  let currentLine = [];
  let currentToken = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentToken += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentLine.push(currentToken.trim());
      currentToken = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentLine.push(currentToken.trim());
      if (currentLine.some((cell) => cell.length > 0)) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentToken = '';
    } else {
      currentToken += char;
    }
  }

  if (currentToken.length > 0 || currentLine.length > 0) {
    currentLine.push(currentToken.trim());
    lines.push(currentLine);
  }

  if (lines.length < 2) return [];

  const headers = lines[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));

  return lines.slice(1).map((row, index) => {
    const rawMap: { [key: string]: string } = {};
    headers.forEach((header, colIndex) => {
      rawMap[header] = row[colIndex] || '';
    });

    const getVal = (possibleKeys: string[], fallback = '') => {
      for (const k of possibleKeys) {
        const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (rawMap[cleanK] !== undefined && rawMap[cleanK] !== '') {
          return rawMap[cleanK];
        }
      }
      return fallback;
    };

    const price = parseFloat(getVal(['Price', 'price'], '0')) || 0;
    const durability = parseInt(getVal(['Durability (1–5)', 'Durability (1-5)', 'Durability', 'durability'], '3'), 10) || 3;

    return {
      id: index + 1,
      clothingItem: getVal(['Clothing item', 'ClothingItem', 'title', 'name'], `Garment ${index + 1}`),
      category: getVal(['Category', 'category'], 'Apparel'),
      materialComposition: getVal(['Material / composition', 'Material/composition', 'Material'], 'Standard Fiber'),
      fiberType: getVal(['Fiber type', 'FiberType', 'fiber'], 'Blended Fiber'),
      exampleMadeIn: getVal(['Example made in', 'ExampleMadeIn', 'made in', 'origin'], 'Sourced globally'),
      waterImpact: getVal(['Water impact', 'WaterImpact'], 'Standard water footprint'),
      climateImpact: getVal(['Climate impact', 'ClimateImpact'], 'Standard carbon impact'),
      durability: Math.min(Math.max(durability, 1), 5),
      expectedUsefulLife: getVal(['Expected useful life', 'ExpectedUsefulLife', 'useful life'], '1-3 years'),
      repairability: getVal(['Repairability', 'repairability'], 'Moderate'),
      endOfLifeOptions: getVal(['End-of-life options', 'EndOfLifeOptions', 'end of life'], 'Recycling / Landfill'),
      keyEnvironmentalPoint: getVal(['Key environmental point', 'KeyEnvironmentalPoint'], 'Environmental impact varies across lifecycle.'),
      price: price,
      publicImageUrl: getVal(['Public image url', 'PublicImageUrl', 'image', 'url'], 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80')
    };
  });
};

// ==========================================
// MAIN APPLICATION COMPONENT (App.jsx)
// ==========================================
export default function App() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [rawCsvText, setRawCsvText] = useState(DEFAULT_CSV_DATA);
  const [loading, setLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Modals & Drawers State
  const [selectedImpactProduct, setSelectedImpactProduct] = useState(null); // Managed via Cart Drawer clicks
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Cart / Selection
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchGoogleSheetData = async (urlToFetch: string) => {
    const inputUrl = urlToFetch || googleSheetUrl;
    const targetUrl = convertToCSVUrl(inputUrl);

    if (!targetUrl) {
      notify('Please enter a valid Google Spreadsheet URL');
      return;
    }

    setLoading(true);
    try {
      let csvText = '';
      
      // Primary Fetch Attempt
      let response = await fetch(targetUrl);

      // Fallback: If standard fetch fails due to CORS restrictions on export links,
      // fetch using a CORS proxy (e.g., corsproxy.io)
      if (!response.ok) {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
        response = await fetch(proxyUrl);
      }

      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch CSV data`);

      csvText = await response.text();

      // Check if Google returned an HTML login page instead of actual CSV data
      if (csvText.trim().toLowerCase().startsWith('<!doctype html') || csvText.includes('<html')) {
        throw new Error(
          'Received HTML instead of CSV. Ensure your sheet is set to "Anyone with the link can view" or use "File > Share > Publish to web".'
        );
      }

      const parsed = parseCSV(csvText);

      if (parsed && parsed.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_GSHEET_URL_KEY, inputUrl);
        localStorage.setItem(LOCAL_STORAGE_GSHEET_DATA_KEY, csvText);
        setProducts(parsed);
        setIsDataModalOpen(false);
        notify(`Loaded ${parsed.length} eco garments!`);
      } else {
        notify('Spreadsheet loaded, but no valid CSV rows were found.');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      notify(err.message || 'Error fetching Google Sheet. Make sure permissions are correct.');
    } finally {
      setLoading(false);
    }
  };

  // Initial Load & Local Storage Sync
  useEffect(() => {
    const savedUrl = localStorage.getItem(LOCAL_STORAGE_GSHEET_URL_KEY) || DEFAULT_CSV_URL;
    const cachedData = localStorage.getItem(LOCAL_STORAGE_GSHEET_DATA_KEY);

    if (savedUrl) {
      // 1. If user previously saved a custom URL, use it
      setGoogleSheetUrl(savedUrl);
      if (cachedData) {
        setProducts(parseCSV(cachedData));
      } else {
        fetchGoogleSheetData(savedUrl);
      }
    } else {
      // 2. HARDCODED DEFAULT: Automatically fetch the default spreadsheet on first load
      setGoogleSheetUrl(DEFAULT_CSV_URL);
      fetchGoogleSheetData(DEFAULT_CSV_URL);
    }

    if (savedUrl && cachedData) {
      const parsed = parseCSV(cachedData);
      if (parsed.length > 0) {
        setProducts(parsed);
        return;
      }
    }

    const fallbackParsed = parseCSV(DEFAULT_CSV_DATA);
    setProducts(fallbackParsed);
  }, []);

  // const fetchGoogleSheetData = async (urlToFetch) => {
  //   const targetUrl = convertToCSVUrl(urlToFetch || googleSheetUrl);
  //   if (!targetUrl) {
  //     notify('Please enter a valid Google Spreadsheet URL');
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await fetch(targetUrl);
  //     if (!response.ok) throw new Error('Failed to fetch CSV data');
  //     const csvText = await response.text();
  //     const parsed = parseCSV(csvText);

  //     if (parsed.length > 0) {
  //       localStorage.setItem(LOCAL_STORAGE_GSHEET_URL_KEY, urlToFetch || googleSheetUrl);
  //       localStorage.setItem(LOCAL_STORAGE_GSHEET_DATA_KEY, csvText);
  //       setProducts(parsed);
  //       setIsDataModalOpen(false);
  //       notify(`Loaded ${parsed.length} eco garments!`);
  //     } else {
  //       notify('Spreadsheet loaded, but no valid CSV rows were found.');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     notify('Error fetching Google Sheet. Make sure sheet is shared with "Anyone with link can view".');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleClearCachedSheet = () => {
    localStorage.removeItem(LOCAL_STORAGE_GSHEET_URL_KEY);
    localStorage.removeItem(LOCAL_STORAGE_GSHEET_DATA_KEY);
    setGoogleSheetUrl('');
    const parsed = parseCSV(rawCsvText || DEFAULT_CSV_DATA);
    setProducts(parsed);
    notify('Cleared Google Sheet cache.');
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const text = e.target.result;
        setRawCsvText(text);
        const parsed = parseCSV(text);
        if (parsed.length > 0) {
          setProducts(parsed);
          setIsDataModalOpen(false);
          notify(`Imported ${parsed.length} items from CSV.`);
        } else {
          notify('Could not parse CSV formatting.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleRawCsvSubmit = () => {
    const parsed = parseCSV(rawCsvText);
    if (parsed.length > 0) {
      setProducts(parsed);
      setIsDataModalOpen(false);
      notify(`Loaded ${parsed.length} items from input!`);
    } else {
      notify('Invalid CSV header or row structure.');
    }
  };

  const categories = useMemo(() => {
    const cats = products ? new Set(products.map((p) => p.category)) : new Set();
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts: Product[] | undefined = useMemo(() => {
    return products
      ?.filter((p: Product) => {
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesQuery =
          p.clothingItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.materialComposition.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.keyEnvironmentalPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fiberType.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesQuery;
      })
      .sort((a: Product, b: Product) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'durability') return b.durability - a.durability;
        if (typeof a.id === 'string' && typeof b.id === 'string') {
          return a.id.toLowerCase().localeCompare(b.id.toLowerCase());
        } else {
          return (a as any).id - (b as any).id;
        }
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  const addToCart = (product: any) => {
    setCart((prev: any) => {
      const existing = prev.find((item: any) => item.id === product.id);
      if (existing) {
        return prev.map((item: any) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    notify(`Added "${product.clothingItem}" to selection!`);
  };

  const updateQuantity = (id: any, delta: any) => {
    setCart((prev: any) =>
      prev
        .map((item: any) => {
          if (item.id === id) {
            const qty = item.quantity + delta;
            return qty > 0 ? { ...item, quantity: qty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id: any) => {
    setCart((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-[#7757a5] selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#6bb345] text-white px-5 py-3 rounded-2xl shadow-2xl font-bold flex items-center space-x-2 animate-bounce">
          <span>✓</span>
          <span className="text-sm">{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="bg-[#7757a5] text-white p-2 rounded-xl shadow-md logo-background">
              <img className="tn-atom__img t-img loaded"
                data-original="https://static.tildacdn.net/tild6331-3264-4236-b532-633238303935/Logo_Container.svg"
                src="https://static.tildacdn.net/tild6331-3264-4236-b532-633238303935/Logo_Container.svg"
                alt="" />
              {/* <LeafIcon /> */}
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 block leading-tight">FiberFan Online</span>
              <span className="text-[10px] text-[#1a8dcd] font-semibold uppercase tracking-wider block">Sustainability Matrix</span>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search fibers, eco metrics, clothing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 focus:border-[#1a8dcd] rounded-full outline-none text-slate-800 placeholder-slate-400 transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                ✕
              </button>
            )}
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsDataModalOpen(true)}
              className="flex items-center space-x-1.5 text-xs font-medium px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-slate-700 transition"
            >
              <DatabaseIcon />
              <span className="hidden md:inline">Data Source</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#f6861f] hover:bg-[#e27613] text-white rounded-xl transition shadow-md font-bold"
            >
              <CartIcon />
              {cart.reduce((sum, item: any) => sum + item.quantity, 0) > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#b62025] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cart.reduce((sum, item: any) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Banner */}
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-[#7757a5] via-[#1a8dcd] to-slate-900 text-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30">
              Educational Interactive Storefront
            </span>
            <h2 className="text-2xl font-extrabold">How does your wardrobe impact the planet?</h2>
            <p className="text-xs text-purple-100 leading-relaxed">
              Add garments to your selection outfit. Open the <strong>Selected Garments Cart</strong> to reveal deep lifecycle metrics: water consumption, carbon intensity, durability, and end-of-life recyclability.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#7757a5] text-white font-bold shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between sm:justify-end space-x-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
            <span className="text-xs font-medium text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 py-1.5 pl-3 pr-8 rounded-xl outline-none focus:border-[#1a8dcd]"
            >
              <option value="featured">Featured Order</option>
              <option value="durability">Highest Durability Score</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: Product) => {
              const isAdded = cart.some((item: any) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  isAdded={isAdded}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8 my-4">
            <h3 className="text-lg font-bold text-slate-800">No garments match criteria</h3>
            <p className="text-slate-500 text-xs max-w-md mx-auto mt-1">Try adjusting search terms or category selection.</p>
          </div>
        )}
      </main>

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onSelectImpactItem={(item: any) => setSelectedImpactProduct(item)} // Clicking cart item opens Garment Impact Modal
        onExport={() => {
          setIsCartOpen(false);
          setIsReceiptModalOpen(true); // Triggers Summary Receipt Modal
        }}
      />

      {/* Printable Eco-Impact Receipt Modal */}
      <ImpactReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        cart={cart}
        onClearCart={() => setCart([])}
      />

      {/* Garment Impact Analysis Modal (Triggered via Cart) */}
      <GarmentImpactModal
        product={selectedImpactProduct}
        onClose={() => setSelectedImpactProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Data Source Modal Component */}
      <DataSourceModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        googleSheetUrl={googleSheetUrl}
        setGoogleSheetUrl={setGoogleSheetUrl}
        onFetchSheet={fetchGoogleSheetData}
        onClearCache={handleClearCachedSheet}
        rawCsvText={rawCsvText}
        setRawCsvText={setRawCsvText}
        onFileUpload={handleFileUpload}
        onApplyRawCsv={handleRawCsvSubmit}
        loading={loading}
      />
    </div>
  );
}