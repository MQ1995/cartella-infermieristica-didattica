import React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '../../shared/utils/cn';

interface Props {
  title: string;
  modelNumber: number;
  children: React.ReactNode;
  className?: string;
}

export default function ModelWrapper({ title, modelNumber, children, className }: Props) {
  const { register } = useFormContext();
  
  const statusFieldName = `model${modelNumber}Status`;
  const notesFieldName = `model${modelNumber}Notes`;

  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", className)}>
      <div className="bg-emerald-700 px-6 py-4">
        <h2 className="text-white font-bold text-lg">
          {modelNumber}. {title}
        </h2>
      </div>
      
      <div className="p-6 space-y-8">
        {children}
        
        <div className="pt-8 border-t border-slate-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Valutazione del Modello
              </label>
              <div className="flex gap-6">
                {['FUNZIONALE', 'DISFUNZIONALE'].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      value={status}
                      {...register(statusFieldName)}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700 transition-colors">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex-[2] space-y-2">
              <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Note Conclusive
              </label>
              <textarea
                {...register(notesFieldName)}
                className="w-full min-h-[100px] p-3 rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm transition-all"
                placeholder="Inserire eventuali osservazioni conclusive per questo modello..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
