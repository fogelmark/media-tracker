import { cn } from "@/lib/utils";
import RatingSystem from "./rating-system";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  options?: string[] | number[];
  genres?: { _id: string; name: string }[];
  first_published?: number;
  className?: string;
}

export default function Input({
  label,
  name,
  options,
  genres,
  type,
  className,
  ...props
}: InputProps) {
  if (type === "rating") {
    return (
      <div className="flex flex-col gap-2">
        <span className="uppercase font-semibold text-xs">{label}</span>
        <RatingSystem name={name} value={Number(props.value) || 0} onChange={props.onChange || (() => {})} />
      </div>
    );
  }
  
  
  if (type === "radio" && options) {
    return (
      <div className="flex flex-col gap-2">
        <span className="uppercase font-semibold text-xs">{label}</span>
        <div className="flex max-sm:flex-col gap-2">
          {options.map((option) => (
            <label key={option} className="cursor-pointer max-sm:text-center">
              <input
                type={type}
                name={name}
                value={option}
                // TODO - Drop shadow error on these radio buttons - investigate
                className="sr-only peer drop-shadow-[0_100px_100px_rgba(250,0,0)]"
                checked={props.value === option}
                onChange={props.onChange}
              />
              <div className="px-4 py-2 rounded select-none text-xs font-semibold hover:bg-slate-600 bg-slate-700 uppercase peer-checked:bg-blue-500 transition">
                {typeof option === "string" ? option.charAt(0).toUpperCase() + option.slice(1) : option}
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "checkbox" && genres) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase font-semibold text-xs">{label}</span>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <label key={genre._id} className="cursor-pointer">
              <input
                type="checkbox"
                name={name}
                value={genre._id}
                className="sr-only peer"
                checked={
                  Array.isArray(props.value) && props.value.includes(genre._id)
                }
                onChange={props.onChange}
              />
              <div className="px-4 py-2 select-none hover:bg-slate-600 rounded text-xs font-semibold bg-slate-700 uppercase peer-checked:bg-blue-500 transition">
                {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
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
        className={cn(
          "py-2 px-4 bg-slate-50 rounded border border-slate-300 text-black",
          className
        )}
        {...props}
      />
    </div>
  );
}
