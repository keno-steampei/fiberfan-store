import { LOCAL_STORAGE_GSHEET_DATA_KEY } from "../constants";
import { CloseIcon } from "./FiberFanIcons/CloseIcon";

interface DataSourceModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly googleSheetUrl: string;
  readonly setGoogleSheetUrl: (url: string) => void;
  readonly onFetchSheet: (url: string) => void;
  readonly onClearCache: () => void;
  readonly rawCsvText: string;
  readonly setRawCsvText: (text: string) => void;
  readonly onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onApplyRawCsv: () => void;
  readonly loading: boolean;
}

export function DataSourceModal({
  isOpen,
  onClose,
  googleSheetUrl,
  setGoogleSheetUrl,
  onFetchSheet,
  onClearCache,
  rawCsvText,
  setRawCsvText,
  onFileUpload,
  onApplyRawCsv,
  loading
}: DataSourceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1">
          <CloseIcon />
        </button>

        <h3 className="text-base font-bold text-slate-900 mb-1">Educational CSV Data Config</h3>
        <p className="text-xs text-slate-500 mb-6">Connect a Google Sheet link or paste raw CSV metrics.</p>

        {/* Google Sheets Sync */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6 space-y-3">
          <span className="text-xs font-bold text-[#7757a5] uppercase tracking-wider block">Option 1: Google Sheet Link</span>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={googleSheetUrl}
              onChange={(e) => setGoogleSheetUrl(e.target.value)}
              className="flex-1 text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none text-slate-800 focus:border-[#1a8dcd]"
            />
            <button
              onClick={() => onFetchSheet(googleSheetUrl)}
              disabled={loading}
              className="px-3 py-2.5 bg-[#1a8dcd] hover:bg-[#1572a7] text-white text-xs font-bold rounded-xl whitespace-nowrap shadow"
            >
              Sync Link
            </button>
          </div>

          {localStorage.getItem(LOCAL_STORAGE_GSHEET_DATA_KEY) && (
            <div className="flex items-center justify-between text-xs text-[#6bb345] bg-[#6bb345]/10 p-2.5 rounded-xl border border-[#6bb345]/30">
              <span>Google Sheet active in LocalStorage</span>
              <button onClick={onClearCache} className="text-xs text-[#b62025] font-bold hover:underline">
                Clear Cache
              </button>
            </div>
          )}
        </div>

        {/* Local CSV Option */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Option 2: Raw CSV Upload / Input</span>
          <label className="border-2 border-dashed border-slate-300 hover:border-[#1a8dcd] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition">
            <span className="text-xs font-bold text-slate-700">Upload `.csv` File</span>
            <input type="file" accept=".csv" onChange={onFileUpload} className="hidden" />
          </label>

          <textarea
            value={rawCsvText}
            onChange={(e) => setRawCsvText(e.target.value)}
            rows={4}
            className="w-full text-xs font-mono p-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl focus:outline-none resize-none"
          />

          <button
            onClick={onApplyRawCsv}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
          >
            Apply CSV Text
          </button>
        </div>
      </div>
    </div>
  );
}
