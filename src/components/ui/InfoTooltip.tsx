import { useState } from 'react';
import React from 'react';
import { Info } from 'lucide-react';

interface Props {
  content: React.ReactNode;
}

export function InfoTooltip({ content }: Props) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <span className="relative inline-flex items-center">
      <Info
        size={12}
        className="text-slate-400 hover:text-slate-600 cursor-help ml-1 flex-shrink-0"
        onMouseEnter={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({ x: r.left + r.width / 2, y: r.top });
        }}
        onMouseLeave={() => setPos(null)}
      />
      {pos && (
        <span
          className="fixed z-[9999] w-56 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg leading-relaxed pointer-events-none"
          style={{ left: pos.x, top: pos.y - 8, transform: 'translate(-50%, -100%)' }}
        >
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </span>
      )}
    </span>
  );
}
