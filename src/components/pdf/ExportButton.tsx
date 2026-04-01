import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AssessmentPDF } from '../../utils/pdfExport';
import type { NursingAssessment } from '../../types/form';

export default function ExportButton({ data }: { data: NursingAssessment }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <PDFDownloadLink
      document={<AssessmentPDF data={data} />}
      fileName={`cartella-inf-${data.studentName?.replace(/\s+/g, '-').toLowerCase() || 'studente'}.pdf`}
      className="bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-1.5 rounded-md flex items-center gap-2 text-sm font-bold shadow-sm transition-colors"
    >
      {({ loading, error }) => {
        if (error) {
           console.error("PDF generation error:", error);
           return (
             <span className="flex items-center gap-2 text-rose-500">
                <Download size={16} />
                Errore PDF
             </span>
           );
        }
        return (
          <span className={`flex items-center gap-2 ${loading ? 'opacity-70 pointer-events-none' : ''}`}>
            <Download size={16} className={loading ? 'animate-bounce' : ''} />
            {loading ? 'Generazione in corso...' : 'Esporta PDF'}
          </span>
        )
      }}
    </PDFDownloadLink>
  );
}
