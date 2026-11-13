
import { translations, type Language } from "../translations";
import type { Product } from "../types";
import { CartIcon } from "./FiberFanIcons/CartIcon";
import { StarIcon } from "./FiberFanIcons/StarIcon";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: any) => void;
  isAdded: boolean; // Indicates if the product is already added to the cart
  lang?: Language; // Language prop to determine which translation to use
}

// ==========================================
// REUSABLE COMPONENT: ProductCard.jsx
// ==========================================
export function ProductCard({ product, onAddToCart, isAdded, lang = 'en' }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#1a8dcd] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-900">
          <img
            src={product.publicImageUrl}
            alt={product.clothingItem}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e: any) => {
              e.target.onerror = null;
              console.log(`Image not found for ${product.clothingItem} as ${product.publicImageUrl}. Using placeholder image.`);
              console.debug(e)
              e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

          <span className="absolute top-3 left-3 bg-[#7757a5] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
            {product.category}
          </span>

          <span className="absolute top-3 right-3 bg-black/80 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg border border-slate-700 shadow">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-[#1a8dcd] truncate max-w-[140px]">{product.fiberType}</span>
            <div className="flex items-center space-x-1">
              <StarIcon filled={true} />
              <span className="font-bold text-xs text-slate-700">{product.durability}/5</span>
            </div>
          </div>

          <h3 className="font-bold text-base text-slate-900 group-hover:text-[#1a8dcd] transition-colors line-clamp-1">
            {product.clothingItem}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.materialComposition}
          </p>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700">
            <span className="text-[10px] uppercase font-bold text-[#6bb345] block mb-0.5">{translations[lang].keyEnvPoint}</span>
            <p className="line-clamp-2 leading-snug">"{product.keyEnvironmentalPoint}"</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <button
          onClick={() => onAddToCart(product)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
            isAdded
              ? 'bg-[#6bb345] text-white shadow-md'
              : 'bg-[#1a8dcd] hover:bg-[#1572a7] text-white shadow-md'
          }`}
        >
          <CartIcon />
          <span>{isAdded ? translations[lang].addedToOutfit : translations[lang].addToOutfit}</span>
        </button>
      </div>
    </div>
  );
}
