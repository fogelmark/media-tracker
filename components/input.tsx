import { cn } from "@/lib/utils";
import RatingSystem from "./rating-system";
import {
  Field,
  ErrorMessage,
  FormikValues,
  FormikErrors,
  FormikTouched,
} from "formik";
import { use } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  touched?: FormikTouched<FormikValues>;
  errors?: FormikErrors<FormikValues>;
  options?: string[] | number[];
  first_published?: number;
  className?: string;
  values?: FormikValues;
  genres?: Promise<{ _id: string; name: string }[]>;
}

export default function Input({
  label,
  name,
  touched,
  errors,
  options,
  genres,
  type,
  className,
  values,
  ...props
}: InputProps) {
  const allGenres = genres ? use(genres) : null;

  if (name === "rating") {
    return (
      <div className="grid grid-rows-input-layout gap-1">
        <span
          className={cn("uppercase font-semibold text-xs", {
            "opacity-50 cursor-default": values?.status !== "Completed",
          })}
        >
          {label}
        </span>
        <RatingSystem name={name} status={values?.status} />
        {values?.status === "Completed" && (
          <ErrorMessage
            name={name}
            component="div"
            className="text-xs text-red-700"
          />
        )}
      </div>
    );
  }

  if (type === "radio" && options) {
    return (
      <div className="grid grid-rows-input-layout gap-1">
        <span className="uppercase font-semibold text-xs">{label}</span>
        <div role="group" className="flex max-sm:flex-col gap-2">
          {options.map((option) => (
            <label key={option} className="cursor-pointer max-sm:text-center">
              <Field
                type={type}
                name={name}
                value={option}
                // TODO - Drop shadow error on these radio buttons - investigate
                className="sr-only peer drop-shadow-[0_100px_100px_rgba(250,0,0)]"
              />
              <div className="px-4 py-2 rounded select-none text-xs font-semibold hover:bg-gray-600 bg-gray-700 uppercase peer-checked:bg-blue-600 transition">
                {typeof option === "string"
                  ? option.charAt(0).toUpperCase() + option.slice(1)
                  : option}
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "checkbox" && genres) {
    return (
      <div className="grid grid-rows-input-layout gap-1 w-full">
        <span className="uppercase font-semibold text-xs">{label}</span>
        <div role="group" className="flex flex-wrap gap-2">
          {allGenres &&
            allGenres.map((genre) => (
              <label key={genre._id} className="cursor-pointer">
                <Field
                  type="checkbox"
                  name={name}
                  value={genre._id}
                  className="sr-only peer"
                />
                <div className="px-4 py-2 select-none hover:bg-gray-600 rounded text-xs font-semibold bg-gray-700 uppercase peer-checked:bg-gradient-to-b from-blue-500 to-blue-700 transition">
                  {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
                </div>
              </label>
            ))}
        </div>
        <ErrorMessage
          name={name}
          component="div"
          className="text-xs text-red-700"
        />
      </div>
    );
  }

  // ONLY SHOW ERROR WHEN FORM IS SUBMITTED, NOT ON CHANGE/TOUCH
  return (
    <div className="grid grid-rows-input-layout gap-1">
      <label htmlFor={name} className={cn("uppercase font-semibold text-xs", {
        "text-red-700": errors?.[name] && touched?.[name],
      })}>
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        className={cn(
          "border shadow-md py-2 px-4 bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 outline-none rounded",
          // {
          //   "border-red-700": errors?.[name] && touched?.[name],
          // },

          className
        )}
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-xs text-red-700"
      />
    </div>
  );
}
