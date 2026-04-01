import { useState, useRef } from "react";
import { useFormContext } from 'react-hook-form';
import { Plus, Trash2, X } from 'lucide-react';

interface Wound {
  id: string;
  x: number;
  y: number;
  type: string;
  location: string;
  description: string;
}

export default function BodyMap() {
  const { setValue, watch } = useFormContext();
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Watch the wounds array from react-hook-form
  const formWounds = watch('wounds') || [];
  
  // Local state for the popup modal
  const [selectedWound, setSelectedWound] = useState<Wound | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // SVG dimensions for calculating relative positions
  const viewBox = { w: 300, h: 500 };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || isEditing) return;

    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
    
    // Create a new wound at the clicked coordinates
    const newWound: Wound = {
      id: Math.random().toString(36).substring(7),
      x: svgP.x,
      y: svgP.y,
      type: 'LDP', // Default to Lesione da Pressione
      location: '',
      description: ''
    };

    setSelectedWound(newWound);
    setIsEditing(true);
  };

  const handleSaveWound = () => {
    if (!selectedWound) return;
    
    // Check if it's an existing wound being edited or a new one
    const existingIndex = formWounds.findIndex((w: Wound) => w.id === selectedWound.id);
    
    let updatedWounds;
    if (existingIndex >= 0) {
      updatedWounds = [...formWounds];
      updatedWounds[existingIndex] = selectedWound;
    } else {
      updatedWounds = [...formWounds, selectedWound];
    }
    
    setValue('wounds', updatedWounds, { shouldDirty: true });
    setIsEditing(false);
    setSelectedWound(null);
  };

  const handleDeleteWound = (id: string) => {
    const updatedWounds = formWounds.filter((w: Wound) => w.id !== id);
    setValue('wounds', updatedWounds, { shouldDirty: true });
    setIsEditing(false);
    setSelectedWound(null);
  };

  const getColorForType = (type: string) => {
    switch(type) {
      case 'LDP': return '#ef4444'; // Red
      case 'Chirurgica': return '#3b82f6'; // Blue
      case 'Stoma': return '#f59e0b'; // Amber
      case 'Altro': return '#8b5cf6'; // Purple
      default: return '#10b981'; // Green
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Interactive SVG Body Map */}
      <div className="relative border border-slate-200 rounded-xl bg-white shadow-sm p-4 w-full max-w-sm mx-auto flex-shrink-0 cursor-crosshair">
        <svg 
          ref={svgRef}
          viewBox={`0 0 ${viewBox.w} ${viewBox.h}`} 
          className="w-full h-auto drop-shadow-sm"
          onClick={handleSvgClick}
        >
          {/* Simple Human Outline (Front) */}
          <g stroke="#94a3b8" strokeWidth="2" fill="#f8fafc" strokeLinejoin="round">
            {/* Head */}
            <circle cx="150" cy="50" r="25" />
            {/* Torso */}
            <path d="M 115 80 L 185 80 L 190 220 L 110 220 Z" />
            {/* Left Arm */}
            <path d="M 115 80 Q 80 120 70 200" fill="none" />
            {/* Right Arm */}
            <path d="M 185 80 Q 220 120 230 200" fill="none" />
            {/* Left Leg */}
            <path d="M 110 220 L 110 420 L 140 420 L 140 220" />
            {/* Right Leg */}
            <path d="M 160 220 L 160 420 L 190 420 L 190 220" />
          </g>

          {/* Render Pins for Wounds */}
          {formWounds.map((wound: Wound) => (
            <g 
              key={wound.id} 
              transform={`translate(${wound.x}, ${wound.y})`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWound(wound);
                setIsEditing(true);
              }}
              className="cursor-pointer hover:scale-110 transition-transform origin-center"
            >
              <circle cx="0" cy="0" r="6" fill={getColorForType(wound.type)} className="animate-pulse" />
              <circle cx="0" cy="0" r="10" fill="none" stroke={getColorForType(wound.type)} strokeWidth="2" opacity="0.6" />
            </g>
          ))}
        </svg>

        {/* Floating Tooltip/Modal for the selected wound */}
        {isEditing && selectedWound && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl border border-slate-200 p-4 w-72 z-10 print:hidden">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-slate-800">Dettaglio Lesione</h4>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600">Tipo Lesione</label>
                <select 
                  className="w-full mt-1 px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                  value={selectedWound.type}
                  onChange={(e) => setSelectedWound({...selectedWound, type: e.target.value})}
                >
                  <option value="LDP">Lesione da Pressione (LDP)</option>
                  <option value="Chirurgica">Ferita Chirurgica</option>
                  <option value="Stoma">Stoma</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-slate-600">Sede (es. Tallone Sx)</label>
                <input 
                  type="text" 
                  className="w-full mt-1 px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                  value={selectedWound.location}
                  onChange={(e) => setSelectedWound({...selectedWound, location: e.target.value})}
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">Descrizione (Stadio, Medicazione)</label>
                <textarea 
                  className="w-full mt-1 px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 resize-none"
                  rows={2}
                  value={selectedWound.description}
                  onChange={(e) => setSelectedWound({...selectedWound, description: e.target.value})}
                />
              </div>

              <div className="flex justify-between mt-4 pt-3 border-t border-slate-100">
                <button 
                  onClick={() => handleDeleteWound(selectedWound.id)}
                  className="text-rose-600 hover:bg-rose-50 p-1.5 rounded flex items-center justify-center transition-colors"
                  title="Elimina"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={handleSaveWound}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded text-sm hover:bg-indigo-700 transition-colors"
                >
                  Salva Modifiche
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* List of mapped wounds */}
      <div className="flex-1 w-full bg-slate-50 p-4 rounded-xl border border-slate-200 min-h-[500px]">
        <h4 className="font-semibold text-slate-700 mb-4 flex items-center justify-between">
          <span>Elenco Lesioni Mappate ({formWounds.length})</span>
          {formWounds.length === 0 && (
            <span className="text-xs font-normal text-slate-400 bg-white px-2 py-1 border border-slate-200 rounded-full">
              Nessuna lesione
            </span>
          )}
        </h4>
        
        <div className="space-y-3">
          {formWounds.map((wound: Wound) => (
            <div 
              key={wound.id} 
              className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex gap-3 group"
            >
              <div 
                className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" 
                style={{ backgroundColor: getColorForType(wound.type) }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h5 className="font-medium text-slate-800 text-sm">{wound.type} - {wound.location || 'Sede non specificata'}</h5>
                  <button 
                    onClick={() => {
                      setSelectedWound(wound);
                      setIsEditing(true);
                    }}
                    className="text-xs text-indigo-600 hover:underline print:hidden opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Modifica
                  </button>
                </div>
                <p className="text-slate-600 text-xs mt-1 whitespace-pre-wrap">
                  {wound.description || 'Nessuna descrizione.'}
                </p>
              </div>
            </div>
          ))}

          {formWounds.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400">
              <Plus size={48} className="mb-2 opacity-20" />
              <p className="text-sm">Clicca sulla sagoma a sinistra<br/>per mappare una nuova lesione</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}