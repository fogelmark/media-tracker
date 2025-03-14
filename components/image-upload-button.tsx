"use client";

import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import { useBookDetailsContext } from "@/hooks/use-context";
import React, { useEffect, useState } from "react";
import book_placeholder from "@/public/images/book-placeholder.png";
import CloudArrow from "@/components/svg/cloud-arrow";
import Image from "next/image";

export default function ImageUploadButton() {
  const [bookCoverUrl, setBookCoverUrl] = useState("");
  const [resources, setResources] = useState<any>();
  const { formData, setFormData } = useBookDetailsContext();

  useEffect(() => {
    if (formData.cover_id) {
      setBookCoverUrl(
        getCldImageUrl({
          src: formData.cover_id,
        })
      );
    }
  }, [formData.cover_id]);

  return (
    <div className="grid grid-cols-2 mt-20">
      <div className="flex-initial">
        <CldUploadWidget
          uploadPreset="next-media"
          onSuccess={(result: any) => {
            setResources(result?.info);
            setFormData((prev) => ({
              ...prev,
              cover_id: result?.info?.public_id,
            }));
          }}
        >
          {({ open }) => (
            <div className="flex flex-col text-sm">
              <button
                type="button"
                className="px-4 py-2 flex gap-2 uppercase justify-center font-semibold text-sm items-center bg-gradient-to-b drop-shadow-md from-indigo-500 to-indigo-700  max-w-[220px] rounded-3xl mb-4"
                onClick={() => open()}
              >
                <CloudArrow />
                upload an image
              </button>
              <ul className="indent-4">
                {resources?.original_filename ? (
                  <li>
                    {resources?.original_filename}.{resources?.format}
                  </li>
                ) : (
                  <li>No image uploaded.</li>
                )}
                {resources?.height && resources?.width && resources?.bytes && (
                  <>
                    <li className="text-slate-400">
                      {resources?.height}x{resources?.width}
                    </li>
                    <li className="text-slate-400">
                      {Math.ceil(resources?.bytes / 1000)} KB
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </CldUploadWidget>
      </div>

      <div className="w-[150px] relative justify-self-center h-auto aspect-[2/3] mb-4 rounded overflow-hidden">
        <Image
          src={bookCoverUrl ? bookCoverUrl : book_placeholder}
          fill
          alt="Book cover image"
        />
      </div>
    </div>
  );
}
