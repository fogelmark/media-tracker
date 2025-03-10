"use client";

import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";
import { getCldImageUrl } from "next-cloudinary";
import { useState, useEffect } from "react";
import book_placeholder from "@/public/images/book-placeholder.png";
import Image from "next/image";
import Input from "@/components/input";
import RatingSystem from "@/components/rating-system";
import axios from "axios";

export default function Page() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [genre, setGenre] = useState<string[]>([]);
  const [status, setStatus] = useState("Want To Read");
  const [language, setLanguage] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [firstPublishedYear, setFirstPublishedYear] = useState("");
  const [genres, setGenres] = useState<{ _id: string; name: string }[]>([]);

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
    setTitle(book.title || "");
    setAuthor(book.author_name?.join(", ") || "");
    setPages(book.number_of_pages || "");
    setFirstPublishedYear(book.first_publish_year || "");
  };

  return (
    <div className="flex">
      <div className="flex flex-col px-20 py-10 w-1/2">
        <CldUploadWidget uploadPreset="next-media">
          {({ open }) => {
            return (
              <button
                className="px-5 py-3 bg-blue-500 max-w-[200px] rounded-md mb-4"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <div className="flex max gap-16 justify-between">
            <Input
              label="pages"
              name="pages"
              type="number"
              className="w-full"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />
            <Input
              label="first published year"
              name="first published year"
              type="number"
              className="w-full"
              value={firstPublishedYear}
              onChange={(e) => setFirstPublishedYear(e.target.value)}
            />
          </div>
          <Input
            label="status"
            name="status"
            type="radio"
            options={["Want To Read", "In Progress", "Completed"]}
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          />
          {status === "Completed" && (
            <RatingSystem name="rating" maxRating={5} />
          )}
          <Input
            label="language"
            name="language"
            type="radio"
            options={["English", "Swedish"]}
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          />
          <Input
            label="genre"
            name="genre"
            type="checkbox"
            genres={genres} // Detta kommer vara en array av objekt
            onChange={(e) => {
              const { value, checked } = e.target;
              setGenre(
                (prev) =>
                  checked
                    ? [...prev, value] // Lägg till id:t i listan när checkbox är ikryssad
                    : prev.filter((genre) => genre !== value) // Ta bort id:t från listan när checkbox avmarkeras
              );
            }}
            value={genre}
          />
        </form>
      </div>
      {/* TODO - Create a preview for how the card will look */}
    </div>
  );
}
