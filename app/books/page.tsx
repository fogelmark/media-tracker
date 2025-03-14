"use client";

import { useBookDetailsContext } from "@/hooks/use-context";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageUploadButton from "@/components/image-upload-button";
import Input from "@/components/input";

export default function Page() {
  const [genres, setGenres] = useState<{ _id: string; name: string }[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const { formData, setFormData } = useBookDetailsContext();
  console.log(formData);

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

  // useEffect(() => {
  //   fetchGenres();
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/books",
        formData
      );
      if (response.status === 201) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col px-4 md:w-2/3 lg:w-2/5 py-10 w-full">
        {/* TODO - Refactor this to an array that maps all the inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <ImageUploadButton />
          <div className="border-t flex items-center justify-center border-slate-600 pt-8">
          <button
            type="submit"
            className="px-10 py-2 uppercase justify-center font-semibold text-sm items-center bg-blue-500 max-w-[200px] rounded-3xl"
          >
            submit
          </button>
          </div>
        </form>
      </div>
      {/* TODO - Create a preview for how the card will look */}
    </div>
  );
}
