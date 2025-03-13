"use client";

import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";
import { getCldImageUrl } from "next-cloudinary";
import { useState, useEffect } from "react";
import book_placeholder from "@/public/images/book-placeholder.png";
import Image from "next/image";
import Input from "@/components/input";
import axios from "axios";

interface FormData {
  title: string;
  author: string;
  cover_id: string;
  pages: number | string;
  first_published: number | string;
  status: string;
  rating: number;
  language: string;
  genre: string[];
  [key: string]: any;
}

const initState: FormData = {
  title: "",
  author: "",
  cover_id: "",
  pages: "",
  first_published: "",
  status: "Want To Read",
  rating: 0,
  language: "Swedish",
  genre: [],
};

export default function Page() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState([]);
  const [genres, setGenres] = useState<{ _id: string; name: string }[]>([]);
  const [resource, setResource] = useState();
  const [formData, setFormData] = useState(initState);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookCoverUrl, setBookCoverUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);



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

  const fetchBooks = async (searchQuery: string) => {
    if (!searchQuery) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${searchQuery}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch books");
      }
      const data = response.data;
      setBooks(data.docs.slice(0, 10) || []);
    } catch (error) {
      setError("Could not fetch books. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) fetchBooks(query);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelectedBook = (book: any) => {
    setBooks([]);
    setSelectedBook(book);

    setFormData((prev) => ({
      ...prev,
      title: book.title || "",
      author: book.author_name?.join(", ") || "",
      pages: book.number_of_pages || "",
      first_published: book.first_published || "",
    }));
  };

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
              className="px-5 py-3 bg-blue-500 max-w-[200px] rounded-md mb-4"
              onClick={() => open()}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload an Image"}
            </button>
          )}
        </CldUploadWidget>

        {bookCoverUrl && (
          <div className="relative w-auto h-[263px] mb-4">
            <Image src={bookCoverUrl} fill alt="Uploaded Image" />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="search" className="uppercase font-semibold text-xs">
            Search for a book
          </label>
          <input
            id="search"
            name="search"
            placeholder="title / author / isbn"
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            className={cn(
              "placeholder:italic placeholder:uppercase placeholder:text-xs  py-2 px-4 bg-slate-50 rounded border-b border-slate-300 text-black",
              { "rounded-none rounded-t": books.length > 0 }
            )}
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {books.length > 0 && (
          <ul className="bg-slate-50 flex flex-col rounded-b max-h-[300px] overflow-hidden">
            <div className="divide-y divide-slate-300 overflow-y-scroll">
              {books.map((book: any, index) => (
                <li
                  key={index}
                  className="flex gap-4 bg-slate-50 p-4 cursor-pointer hover:bg-slate-200 transition"
                  onClick={() => handleSelectedBook(book)}
                >
                  <div className="min-w-[44px] max-h-[62px]">
                    <Image
                      width={44}
                      height={62}
                      loading="lazy"
                      src={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                          : book_placeholder
                      }
                      alt={book.title}
                      className="rounded-sm w-auto h-auto"
                    />
                  </div>
                  <div className="flex flex-col text-black">
                    <p className="font-bold">{book.title}</p>
                    {book.author_name && (
                      <p>by {book.author_name?.join(", ")}</p>
                    )}
                  </div>
                </li>
              ))}
            </div>
          </ul>
        )}
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
            options={["Swedish", "English" ]}
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
