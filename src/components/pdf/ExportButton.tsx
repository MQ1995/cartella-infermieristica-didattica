import { Download } from 'lucide-react';

export default function ExportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-white text-emerald-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-emerald-50 transition-colors print:hidden"
    >
      <Download size={18} />
      Esporta PDF
    </button>
  );
}
