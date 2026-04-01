import { useFormContext } from 'react-hook-form';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  className?: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({ name, label, className = '', rows = 3, ...props }) => {
  const { register } = useFormContext();

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        rows={rows}
        className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
          print:border print:border-slate-200 print:shadow-none print:bg-transparent resize-y"
        {...register(name)}
        {...props}
      />
    </div>
  );
};