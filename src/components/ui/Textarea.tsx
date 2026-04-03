import { useFormContext, useWatch } from 'react-hook-form';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  className?: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({ name, label, className = '', rows = 3, ...props }) => {
  const { register } = useFormContext();
  const value = useWatch({ name });
  const isEmpty = value === '' || value === null || value === undefined;

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <textarea
          id={name}
          rows={rows}
          data-empty={isEmpty ? '' : undefined}
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
            disabled:bg-transparent disabled:border-transparent disabled:shadow-none
            disabled:text-slate-800 disabled:[-webkit-text-fill-color:theme(colors.slate.800)] disabled:cursor-not-allowed
            print:border print:border-slate-200 print:shadow-none print:bg-transparent resize-y"
          {...register(name)}
          {...props}
        />
        {isEmpty && (
          <span className="field-empty-dash absolute top-2 left-3 text-sm text-slate-300 pointer-events-none opacity-0 print:hidden">
            —
          </span>
        )}
      </div>
    </div>
  );
};
