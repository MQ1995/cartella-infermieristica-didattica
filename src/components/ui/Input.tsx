import { useFormContext, useWatch } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
  className?: string;
}

// Shared input class used by table-cell bare inputs across the app
export const INPUT_BASE_CLS =
  'w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 ' +
  'focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ' +
  'disabled:bg-transparent disabled:border-transparent disabled:shadow-none ' +
  'disabled:text-slate-800 disabled:[-webkit-text-fill-color:theme(colors.slate.800)] disabled:cursor-not-allowed ' +
  'print:border-b print:border-t-0 print:border-x-0 print:rounded-none print:shadow-none print:px-0 print:bg-transparent';

export const Input: React.FC<InputProps> = ({ name, label, type = 'text', className = '', ...props }) => {
  const { register } = useFormContext();
  const value = useWatch({ name });
  const isEmpty = value === '' || value === null || value === undefined;

  const isRequired = label.endsWith(' *');
  const displayLabel = isRequired ? label.slice(0, -2) : label;
  const bare = label === '';

  const inputEl = (
    <div className="relative min-w-0">
      <input
        id={name}
        type={type}
        data-empty={isEmpty ? '' : undefined}
        className={bare ? className : INPUT_BASE_CLS}
        {...register(name)}
        {...props}
      />
      {isEmpty && (
        <span className="field-empty-dash absolute inset-y-0 left-3 flex items-center text-sm text-slate-300 pointer-events-none opacity-0 print:hidden">
          —
        </span>
      )}
    </div>
  );

  if (bare) return inputEl;

  return (
    <div className={`flex flex-col space-y-1 min-w-0 ${className}`}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {displayLabel}{isRequired && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {inputEl}
    </div>
  );
};
