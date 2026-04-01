import { useFormContext } from 'react-hook-form';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ name, label, className = '', ...props }) => {
  const { register } = useFormContext();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        id={name}
        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
        {...register(name)}
        {...props}
      />
      <label className="text-sm font-medium text-slate-700 select-none" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};