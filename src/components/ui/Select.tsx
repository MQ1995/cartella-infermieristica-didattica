import { useFormContext } from 'react-hook-form';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ name, label, options, className = '', ...props }) => {
  const { register } = useFormContext();

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
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
    </div>
  );
};