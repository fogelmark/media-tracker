import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  type?: string;
  className?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  type = "text",
  className = "",
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="min-h-[65px]">
          {/* <FormLabel className="text-sm font-semibold text-neutral-200">
            Your Rating
          </FormLabel> */}
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={className}
            />
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
}
