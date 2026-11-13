// ==========================================
// UTILITY FUNCTIONS
// ==========================================

import type { Language } from "./translations";

// Robust conversion helper handling BOTH "Publish to web" and standard Share links
export const convertToCSVUrl = (url: string) => {
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

export const parseCSV = (csvText: string, lang: Language = 'en'): { [key: string]: string }[] | any => {
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

    const price = lang == 'en'
       ? parseFloat(getVal(['Price', 'price'], '0')) || 0
       : parseFloat(getVal(['Prix', 'prix', 'Prix ($)'], '0')) || 0;
    const durability = lang == 'en'
      ? parseInt(getVal(['Durability (1–5)', 'Durability (1-5)', 'Durability', 'durability'], '3'), 10) || 3
      : parseInt(getVal(['Durabilité (1 à 5)', 'Durabilité (1-5)', 'Durabilité', 'durabilité'], '3'), 10) || 3;
/// Vêtement,Catégorie,Matière / composition,
// Type de fibre,Pays de fabrication (exemple),
// Impact sur l’eau,Impact sur le climat,
// Durabilité (1 à 5),Durée de vie estimée,Facilité de réparation,
// Options en fin de vie,Point environnemental clé,
// Prix ($),URL de l’image publique,
    return {
      id: index + 1,
      clothingItem:  lang == 'en'
        ? getVal(['Clothing item', 'ClothingItem', 'title', 'name'], `Garment ${index + 1}`)
        : getVal(['Vêtement', 'vêtement', 'title', 'name'], `Vêtement ${index + 1}`),
      category: lang == 'en'
        ? getVal(['Category', 'category'], 'Apparel')
        : getVal(['Catégorie', 'category'], 'Vêtements'),
      materialComposition: lang == 'en'
        ? getVal(['Material / composition', 'Material/composition', 'Material'], 'Standard Fiber')
        : getVal(['Matière / composition', 'Material/composition', 'Material'], 'Fibre standard'),
      fiberType: lang == 'en'
        ? getVal(['Fiber type', 'FiberType', 'fiber'], 'Blended Fiber')
        : getVal(['Type de fibre', 'FiberType', 'fiber'], 'Fibre mélangée'),
      exampleMadeIn: lang == 'en'
        ? getVal(['Example made in', 'ExampleMadeIn', 'made in', 'origin'], 'Sourced globally')
        : getVal(['Exemple fabriqué en', 'ExampleMadeIn', 'made in', 'origin'], 'Sourcing mondial'),
      waterImpact: lang == 'en'
        ? getVal(['Water impact', 'WaterImpact'], 'Standard water footprint')
        : getVal(['Impact sur l’eau', 'WaterImpact'], 'Empreinte eau standard '),
      climateImpact: lang == 'en'
        ? getVal(['Climate impact', 'ClimateImpact'], 'Standard carbon impact')
        : getVal(['Impact sur le climat', 'ClimateImpact'], 'Impact carbone standard'),
      durability: Math.min(Math.max(durability, 1), 5),
      expectedUsefulLife: lang == 'en'
        ? getVal(['Expected useful life', 'ExpectedUsefulLife', 'useful life'], '1-3 years')
        : getVal(['Durée de vie estimée', 'ExpectedUsefulLife', 'useful life'], '1-3 ans'),
      repairability: lang == 'en'
        ? getVal(['Repairability', 'repairability'], 'Moderate')
        : getVal(['Facilité de réparation', 'repairability'], 'Modéré e'),
      endOfLifeOptions: lang == 'en'
        ? getVal(['End-of-life options', 'EndOfLifeOptions', 'end of life'], 'Recycling / Landfill')
        : getVal(['Options en fin de vie', 'EndOfLifeOptions', 'end of life'], 'Recyclage / Décharge'),
      keyEnvironmentalPoint: lang == 'en'
        ? getVal(['Key environmental point', 'KeyEnvironmentalPoint'], 'Environmental impact varies across lifecycle.')
        : getVal(['Point environnemental clé', 'KeyEnvironmentalPoint'], 'L\'impact environnemental varie selon le cycle de vie.'),
      price: price,
      publicImageUrl: lang == 'en'
        ? getVal(['Public image url', 'PublicImageUrl', 'image', 'url'], 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80')
        : getVal(['Image publique ', 'URL de l’image publique', 'image', 'url'], 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80')
    };
  });
};
