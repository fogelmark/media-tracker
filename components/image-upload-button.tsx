"use client";

import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import book_placeholder from "@/public/images/book-placeholder.png";
import CloudArrow from "@/components/svg/cloud-arrow";
import Image from "next/image";
// import { ErrorMessage, useFormikContext } from "formik";

export default function ImageUploadButton({ errors }: any) {
  const [bookCoverUrl, setBookCoverUrl] = useState("");
  const [coverDetails, setCoverDetails] = useState<any>(null);

  // const { values, setFieldValue } = useFormikContext<any>();

  // useEffect(() => {
  //   if (values.cover_id) {
  //     setBookCoverUrl(
  //       getCldImageUrl({
  //         src: values.cover_id,
  //       })
  //     );
  //   }
  // }, [values.cover_id]);

  return (
    <div className="grid grid-cols-2 grid-rows-[auto_1rem] mt-20">
      <div className="flex-initial">
        <CldUploadWidget
          uploadPreset="next-media"
          onSuccess={(result: any) => {
            const info = result?.info;
            if (info) {
              // setFieldValue("cover_id", info.public_id);
              setCoverDetails({
                filename: info.original_filename,
                format: info.format,
                width: info.width,
                height: info.height,
                size: info.bytes,
              });
            }
          }}
        >
          {({ open }) => (
            <div className="flex flex-col text-sm">
              <button
                type="button"
                className="px-4 py-2 flex gap-2 uppercase justify-center font-semibold text-sm items-center bg-gradient-to-b drop-shadow-md from-amber-500 to-amber-700  max-w-[220px] rounded-3xl mb-4"
                onClick={() => open()}
              >
                <CloudArrow />
                upload an image
              </button>
              <ul className="indent-4">
                {coverDetails?.filename ? (
                  <li>
                    {coverDetails.filename}.{coverDetails.format}
                  </li>
                ) : (
                  <li>No image uploaded.</li>
                )}
                {coverDetails?.height &&
                  coverDetails?.width &&
                  coverDetails?.size && (
                    <>
                      <li className="text-slate-400">
                        {coverDetails.height}x{coverDetails.width}
                      </li>
                      <li className="text-slate-400">
                        {Math.ceil(coverDetails.size / 1000)} KB
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
      {/* <ErrorMessage
        name="cover_id"
        component="div"
        className="text-sm text-red-700"
      /> */}
    </div>
  );
}
