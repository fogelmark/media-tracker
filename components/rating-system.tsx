import { cn } from "@/lib/utils";
import { Field, useField } from "formik";
import { useEffect, useState } from "react";

interface RatingSystemProps {
  maxRating?: number;
  name: string;
  status?: string;
}

const RatingSystem = ({ maxRating = 5, name, status }: RatingSystemProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [field, , helpers] = useField(name);

  const isDisabled = status !== "Completed";

  useEffect(() => {
    if (isDisabled) {
      helpers.setValue(0);
      setHoverRating(0);
    }
  }, [status]);

  return (
    <div role="group" className="flex gap-0">
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= (hoverRating || field.value);

        return (
          <label
            key={ratingValue}
            className={cn("cursor-pointer", {
              "opacity-50 cursor-default": isDisabled,
            })}
          >
            <Field
              disabled={isDisabled}
              type="radio"
              name={name}
              value={ratingValue}
              checked={ratingValue}
              className="sr-only"
              onClick={() => !isDisabled && helpers.setValue(ratingValue)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFilled ? "url(#grad1)" : "none"}
              stroke="url(#grad1)"
              strokeWidth={1.5}
              className="size-8"
              onMouseEnter={() => !isDisabled && setHoverRating(ratingValue)}
              onMouseLeave={() => !isDisabled && setHoverRating(0)}
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="50%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#eab308", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#f59e0b", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default RatingSystem;
