"use client";

import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";
import { getCldImageUrl } from "next-cloudinary";
import { useState, useEffect } from "react";
import book_placeholder from "@/public/images/book-placeholder.png";
import normal from "@/public/images/normal-people.jpg";
import Image from "next/image";
import Input from "@/components/input";
import axios from "axios";
import CloudArrow from "@/components/svg/cloud-arrow";
import { useBookDetailsContext } from "@/hooks/use-context";

export default function Page() {
  const [genres, setGenres] = useState<{ _id: string; name: string }[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookCoverUrl, setBookCoverUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { formData, setFormData } = useBookDetailsContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? checked
            ? [...(prevState[name] || []), value]
            : prevState[name].filter((v: string) => v !== value)
          : type === "number" || name === "rating"
          ? Number(value) || ""
          : value,
    }));

    setIsSuccess(false);
  };

  // TODO - Move this to an API route (see open-api.ts)
  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/genres");
      if (response.status !== 200) {
        throw new Error("Failed to fetch genres");
      }
      setGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

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
    <div className="flex justify-center">
      <div className="flex flex-col px-4 md:w-2/3 lg:w-1/2 py-10 w-full">
        {/* TODO - STYLE THE UPLOAD BUTTON. GET AN UPLOAD ICON */}
        <CldUploadWidget
          uploadPreset="next-media"
          onSuccess={(result: any) => {
            setFormData((prev) => ({
              ...prev,
              cover_id: result?.info?.public_id,
            }));
          }}
        >
          {({ open }) => (
            <button
              className="px-4 py-2 flex gap-2 uppercase justify-center font-semibold text-xs items-center bg-blue-500 max-w-[200px] rounded mb-4"
              onClick={() => open()}
              disabled={isUploading}
            >
              <CloudArrow />
              {isUploading ? "Uploading..." : "Upload an Image"}
            </button>
          )}
        </CldUploadWidget>

        <div className="relative w-[200px] h-auto aspect-[2/3] mb-4 rounded overflow-hidden">
          <Image
            placeholder="blur"
            src={bookCoverUrl ? bookCoverUrl : normal}
            fill
            alt="Book cover image"
          />
        </div>

        {/* TODO - Refactor this to an array that maps all the inputs */}
        <form action="submit" className="flex mt-4 flex-col gap-4">
          <Input
            label="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            label="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <div className="flex max gap-16 justify-between">
            <Input
              label="pages"
              name="pages"
              type="number"
              className="w-full"
              value={formData.pages}
              onChange={handleChange}
            />
            <Input
              label="first published year"
              name="first_published"
              type="number"
              className="w-full"
              value={formData.first_published}
              onChange={handleChange}
            />
          </div>
          <Input
            label="status"
            name="status"
            type="radio"
            options={["Want To Read", "In Progress", "Completed"]}
            onChange={handleChange}
            value={formData.status}
          />
          {formData.status === "Completed" && (
            <Input
              label="rating"
              name="rating"
              type="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          )}
          <Input
            label="language"
            name="language"
            type="radio"
            options={["Swedish", "English"]}
            onChange={handleChange}
            value={formData.language}
          />
          <Input
            label="genre"
            name="genre"
            type="checkbox"
            genres={genres}
            onChange={handleChange}
            value={formData.genre}
          />
        </form>
      </div>
      {/* TODO - Create a preview for how the card will look */}
    </div>
  );
}
