import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  options?: string[];
  ratings?: number[];
  firstPublished?: number;
  className?: string;
}

export default function Input({
  label,
  name,
  options,
  ratings,
  type = "text",
  className,
  ...props
}: InputProps) {
  if (type === "radio" && options) {
    return (
      <div className="flex flex-col gap-2">
        <span className="uppercase font-semibold text-xs">{label}</span>
        <div className="flex gap-2">
          {options.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option}
                className="sr-only peer drop-shadow-[0_100px_100px_rgba(250,0,0)]"
                checked={props.value === option}
                onChange={props.onChange}
              />
              <div className="px-4 py-2 rounded-md select-none text-xs font-semibold hover:bg-slate-600 bg-slate-700 uppercase peer-checked:bg-blue-500 transition">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "checkbox" && options) {
    return (
      <div className="flex flex-col gap-2">
        <span className="uppercase font-semibold text-xs">{label}</span>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="checkbox"
                name={name}
                value={option}
                className="sr-only peer"
                checked={
                  Array.isArray(props.value) && props.value.includes(option)
                }
                onChange={props.onChange}
              />
              <div className="px-4 py-2 select-none hover:bg-slate-600 rounded-md text-xs font-semibold bg-slate-700 uppercase peer-checked:bg-blue-500 transition">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="uppercase font-semibold text-xs">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={cn("py-2 px-4 bg-slate-50 rounded border border-slate-300 text-black", className)}
        {...props}
      />
    </div>
  );
}
