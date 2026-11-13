/* eslint-disable react-hooks/purity */
import { translations, type Language } from "../translations";
import { CloseIcon } from "./FiberFanIcons/CloseIcon";
import { LeafIcon } from "./FiberFanIcons/LeafIcon";
import { PrinterIcon } from "./FiberFanIcons/PrinterIcon";

interface ImpactReceiptModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  // readonly cart: <Product extends {quantity: number}[]>;
  readonly cart: Array<{
    id: string;
    clothingItem: string;
    materialComposition: string;
    fiberType: string;
    quantity: number;
    price: number;
    waterImpact: string;
    climateImpact: string;
    keyEnvironmentalPoint: string;
    durability: number; // Durability score (1-5)
    endOfLifeOptions: string; // e.g., "Recyclable, Biodegradable"
    expectedUsefulLife: string; // e.g., "1-3 years"
  }>;
  lang?: Language;
  readonly onClearCart?: () => void; // Optional callback to clear the cart
}

// ==========================================
// REUSABLE COMPONENT: ImpactReceiptModal.jsx (Summary Receipt/Invoice)
// ==========================================
export function ImpactReceiptModal({ isOpen, onClose, cart, onClearCart, lang = 'en' }: ImpactReceiptModalProps) {
  if (!isOpen || !cart || cart.length === 0) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      {/* Print Styles inline for pure printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-eco-receipt, #printable-eco-receipt * {
            visibility: visible;
          }
          #printable-eco-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none;
            border: none;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-300 shadow-2xl overflow-hidden my-8 flex flex-col">
        {/* Receipt Controls Bar (No Print) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-[#f6861f] rounded-lg text-white">
              <PrinterIcon />
            </span>
            <div>
              <h3 className="text-sm font-bold">{translations[lang].receiptTitle}</h3>
              <p className="text-[10px] text-slate-400">Printable Educational Environmental Invoice</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#6bb345] hover:bg-[#5aa038] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow"
            >
              <PrinterIcon />
              <span>{translations[lang].printReceipt}</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div id="printable-eco-receipt" className="p-8 space-y-6 text-slate-800 bg-white max-h-[75vh] overflow-y-auto">
          {/* Header Branding */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="p-1.5 bg-[#7757a5] text-white rounded-lg">
                  <LeafIcon />
                </div>
                <h1 className="text-xl font-black text-slate-900">FiberFan Online Shop</h1>
              </div>
              <p className="text-xs text-slate-500">{translations[lang].clothingImpactHeader}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-[#1a8dcd]/10 text-[#1a8dcd] border border-[#1a8dcd]/30 text-xs font-bold rounded-lg mb-1">
                {translations[lang].invoiceImpactTitle}
              </span>
              <p className="text-xs text-slate-500">{translations[lang].dateLabel} {currentDate}</p>
              <p className="text-xs font-mono text-slate-400">REF-ECO-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
          </div>

          {/* Outfit Summary Table */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#7757a5] mb-3">
              {translations[lang].recieptTableHeader}
            </h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                    <th className="p-3">{translations[lang].itemColumn}</th>
                    <th className="p-3">{translations[lang].quantityColumn}</th>
                    <th className="p-3">{translations[lang].metricsColumn}</th>
                    <th className="p-3 text-right">{translations[lang].lifeExpectancy}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {cart.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{item.clothingItem}</div>
                        <div className="text-[10px] text-slate-500">{item.materialComposition} ({item.fiberType})</div>
                      </td>
                      <td className="p-3 font-semibold text-slate-800">{item.quantity}</td>
                      <td className="p-3 max-w-xs">
                        <div className="text-[14px] text-[#1a8dcd] font-semibold">💧 {item.waterImpact}</div>
                        <div className="text-[12px] text-slate-600">☁️ {item.climateImpact}</div>
                        <div className="text-[12px] text-[#6bb345] italic mt-0.5 font-medium">"{item.keyEnvironmentalPoint}"</div>
                        <div className="text-[12px] text-slate-600 mt-0.5 font-medium">⚙️ {item.endOfLifeOptions}</div>
                      </td>
                      <td className="p-3 text-right font-bold text-[#f6861f]">{item.expectedUsefulLife}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Environmental Totals Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#7757a5]/10 border border-[#7757a5]/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7757a5] block">{translations[lang].totalCost}</span>
                <span className="text-2xl font-black text-slate-900">${totalAmount.toFixed(2)}</span>
              </div>
              <hr />
              {translations[lang].checkoutReflection.map((line, index) => (
                <p key={index} className="text-[12px] text-slate-500 mt-2">{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center no-print">
          <button
            onClick={() => {
              if (onClearCart) onClearCart();
              onClose();
            }}
            className="px-4 py-2 bg-[#b62025] hover:bg-[#96181c] text-white text-xs font-bold rounded-xl transition"
          >
            {translations[lang].clearCart}
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
            >
              {translations[lang].keepInCart}
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-[#1a8dcd] hover:bg-[#1572a7] text-white text-xs font-extrabold rounded-xl transition shadow"
            >
              {translations[lang].printReceipt}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
