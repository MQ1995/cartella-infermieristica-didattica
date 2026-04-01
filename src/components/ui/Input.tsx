import { useFormContext } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ name, label, type = 'text', className = '', ...props }) => {
  const { register } = useFormContext();

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
          print:border-b print:border-t-0 print:border-x-0 print:rounded-none print:shadow-none print:px-0 print:bg-transparent"
        {...register(name)}
        {...props}
      />
    </div>
  );
};