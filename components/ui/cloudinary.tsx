import { CloudUpload, Upload } from "lucide-react";
import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import React, { useState } from "react";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import Image from "next/image";

interface CloudinaryProps {
  field: any;
  form: any;
}

export default function Cloudinary({ field, form }: CloudinaryProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <FormItem>
      <FormControl>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 h-[300px] bg-gray-700/50">
          {field.value ? (
            <div className="relative w-full">
              <div className="w-[150px] relative justify-self-center rounded overflow-hidden h-auto aspect-[2/3]">
              {isLoading && (
                <div className="animate-pulse bg-gray-500 w-[150px] h-auto aspect-[2/3]" />
              )}
                <Image
                  src={getCldImageUrl({
                    src: field.value,
                  })}
                  fill
                  alt="Book cover"
                  className="w-full h-auto rounded"
                  onLoadingComplete={() => setIsLoading(false)}
                />
              </div>
              <button
                type="button"
                className="absolute top-2 right-8 cursor-pointer"
                onClick={() => form.setValue("cover_id", "")}
              >
                ❌
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-600 flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 mb-4">
                PNG, JPG or GIF up to 5MB
              </p>
              <CldUploadWidget
                uploadPreset="next-media"
                onSuccess={(result: any) => {
                  const info = result?.info;
                  if (info) {
                    form.setValue("cover_id", info.public_id);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    className="px-4 py-2 flex gap-2 justify-center font-semibold text-sm items-center bg-gradient-to-b shadow-sm from-acapulco-500 to-acapulco-600 max-w-[250px] rounded-md"
                    onClick={() => open()}
                  >
                    <CloudUpload />
                    Upload Cover
                  </button>
                )}
              </CldUploadWidget>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage className="text-red-400" />
    </FormItem>
  );
}
