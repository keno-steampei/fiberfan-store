export interface Product {
  id: string | number;
  clothingItem: string;
  materialComposition: string;
  fiberType: string;
  price: number;
  waterImpact: string;
  climateImpact: string;
  keyEnvironmentalPoint: string;
  durability: number; // Durability score (1-5)
  endOfLifeOptions: string; // e.g., "Recyclable, Biodegradable"
  publicImageUrl: string; // Public URL for the product image
  category: string; // e.g., "Shirt", "Pants", etc.
}
