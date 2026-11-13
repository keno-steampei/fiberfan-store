import { translations, type Language } from '../translations';
import { CartIcon } from './FiberFanIcons/CartIcon';
import { CloseIcon } from './FiberFanIcons/CloseIcon';
import { InfoIcon } from './FiberFanIcons/InfoIcon';

// ==========================================
// REUSABLE COMPONENT: CartDrawer.jsx
// ==========================================
interface CartDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly cart: any[];
  readonly onUpdateQuantity: (itemId: string, delta: number) => void;
  readonly onRemoveItem: (itemId: string) => void;
  readonly onSelectImpactItem: (item: any) => void;
  readonly onExport: () => void;
  readonly lang?: Language; // Language prop to determine which translation to use
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onSelectImpactItem,
  onExport,
  lang = 'en',
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-[#7757a5] text-white flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">{translations[lang].yourOutfitItems} ({cart.length})</h2>
              <p className="text-[11px] text-purple-200 font-medium">💡 {translations[lang].viewItemImpact}</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white p-1">
              <CloseIcon />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-100">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex space-x-4 group">
                  {/* Clickable Image & Info triggering Garment Impact Breakdown */}
                  <img
                    src={item.publicImageUrl}
                    alt={item.clothingItem}
                    onClick={() => onSelectImpactItem(item)}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-100 cursor-pointer hover:opacity-80 transition border border-slate-200"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => onSelectImpactItem(item)}
                          className="text-xs font-bold text-slate-900 hover:text-[#1a8dcd] cursor-pointer transition truncate pr-2"
                        >
                          {item.clothingItem}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-[#b62025] text-xs p-0.5"
                        >
                          ✕
                        </button>
                      </div>

                      <button
                        onClick={() => onSelectImpactItem(item)}
                        className="text-[10px] text-[#1a8dcd] hover:underline flex items-center space-x-1 mt-0.5 font-semibold"
                      >
                        <InfoIcon />
                        <span>{translations[lang].viewItemInfo}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 bg-slate-50 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-slate-700 hover:bg-slate-200 transition rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-slate-700 hover:bg-slate-200 transition rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs space-y-2">
                <CartIcon />
                <p>{translations[lang].emptyCartTitle}</p>
                <p className="text-[11px] text-slate-400">{translations[lang].emptyCartDesc}</p>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="flex justify-between text-sm font-bold text-slate-900">
                <span>{translations[lang].totalCost}</span>
                <span className="text-[#1a8dcd]">${totalAmount.toFixed(2)}</span>
              </div>
              <button
                onClick={onExport}
                className="w-full py-3 bg-[#f6861f] hover:bg-[#e27613] text-white font-extrabold text-xs rounded-xl transition shadow-md"
              >
                {translations[lang].exportReceiptBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
