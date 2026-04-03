import { useFormContext, useWatch } from 'react-hook-form';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ name, label, options, className = '', ...props }) => {
  const { register } = useFormContext();
  const value = useWatch({ name });
  const isEmpty = value === '' || value === null || value === undefined;

  const isRequired = label.endsWith(' *');
  const displayLabel = isRequired ? label.slice(0, -2) : label;

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {displayLabel}{isRequired && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          data-empty={isEmpty ? '' : undefined}
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
            disabled:bg-transparent disabled:border-transparent disabled:shadow-none
            disabled:text-slate-800 disabled:[-webkit-text-fill-color:theme(colors.slate.800)] disabled:cursor-not-allowed
            print:border-b print:border-t-0 print:border-x-0 print:rounded-none print:shadow-none print:px-0 print:bg-transparent print:appearance-none"
          {...register(name)}
          {...props}
        >
          <option value="">Seleziona...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {isEmpty && (
          <span className="field-empty-dash absolute inset-y-0 left-3 flex items-center text-sm text-slate-300 pointer-events-none opacity-0 print:hidden">
            —
          </span>
        )}
      </div>
    </div>
  );
};
