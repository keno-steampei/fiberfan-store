import { translations, type Language } from "../translations";
import { CloseIcon } from "./FiberFanIcons/CloseIcon";
import { LeafIcon } from "./FiberFanIcons/LeafIcon";
import { StarIcon } from "./FiberFanIcons/StarIcon";

interface GarmentImpactModalProps {
  readonly product: any;
  readonly onClose: () => void;
  readonly onAddToCart: (product: any) => void;
  readonly lang?: Language; // Language prop to determine which translation to use
}

// ==========================================
// REUSABLE COMPONENT: GarmentImpactModal.jsx
// ==========================================
export function GarmentImpactModal({ product, onClose, onAddToCart, lang = 'en' }: GarmentImpactModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl relative overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#7757a5] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-white/20 rounded-lg">
              <LeafIcon />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">{translations[lang].garmentModalTitle}</h3>
              <p className="text-[10px] text-purple-100">{translations[lang].garmentModalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white bg-white/10 rounded-xl transition"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <img
              src={product.publicImageUrl}
              alt={product.clothingItem}
              className="w-full sm:w-40 h-40 object-cover rounded-2xl bg-slate-100 border border-slate-200"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80';
              }}
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-[#7757a5]/10 text-[#7757a5] border border-[#7757a5]/30 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                  {product.category}
                </span>
                <span className="text-lg font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{product.clothingItem}</h2>
              <div className="text-xs text-slate-600 space-y-1">
                <p><strong className="text-slate-800">{translations[lang].composition}:</strong> {product.materialComposition}</p>
                <p><strong className="text-slate-800">{translations[lang].fiberType}:</strong> {product.fiberType}</p>
                <p><strong className="text-slate-800">{translations[lang].originLabel}</strong> {product.exampleMadeIn}</p>
              </div>
            </div>
          </div>

          {/* Environmental Highlight */}
          <div className="p-4 rounded-2xl bg-[#6bb345]/10 border border-[#6bb345]/30 text-[#1a5500]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6bb345] block mb-1">{translations[lang].keyEnvImpact}</span>
            <p className="text-sm font-medium leading-relaxed text-slate-800">"{product.keyEnvironmentalPoint}"</p>
          </div>

          {/* Comprehensive Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-[#1a8dcd] uppercase tracking-wider block mb-1">💧 {translations[lang].waterImpact}</span>
              <p className="text-slate-700">{product.waterImpact}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-[#7757a5] uppercase tracking-wider block mb-1">☁️ {translations[lang].climateImpact}</span>
              <p className="text-slate-700">{product.climateImpact}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-[#f6861f] uppercase tracking-wider block mb-1">★ {translations[lang].durabilityScore}</span>
              <div className="flex items-center space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= product.durability} />
                ))}
                <span className="text-slate-800 ml-2 font-bold">({product.durability}/5)</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-[#6bb345] uppercase tracking-wider block mb-1">⏱ {translations[lang].expectedLife}</span>
              <p className="text-slate-800 font-semibold">{product.expectedUsefulLife}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-[#b62025] uppercase tracking-wider block mb-1">🔧 {translations[lang].repairability}</span>
              <p className="text-slate-700">{product.repairability}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-[#1a8dcd] uppercase tracking-wider block mb-1">♻️ {translations[lang].endOfLife}</span>
              <p className="text-slate-700">{product.endOfLifeOptions}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
          >
            {translations[lang].closeanalysis}
          </button>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-4 py-2 bg-[#1a8dcd] hover:bg-[#1572a7] text-white text-xs font-extrabold rounded-xl transition shadow"
          >
            + {translations[lang].addQuantity}
          </button>
        </div>
      </div>
    </div>
  );
}
