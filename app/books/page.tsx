"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import book_placeholder from "@/public/images/book-placeholder.png";

export default function Page() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async (searchQuery: string) => {
    if (!searchQuery) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data.docs.slice(0, 10) || []);
    } catch (err) {
      setError("Could not fetch books. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) fetchBooks(query);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  console.log(selectedBook);

  const handleSelectedBook = (book: any) => {
    setBooks([]);
    setSelectedBook(book);
  };

  return (
    <div className="p-20 flex flex-col justify-center items-center">
      <input
        onChange={(e) => setQuery(e.target.value.split(" ").join("+"))}
        className={cn(
          "py-2 px-4 w-[400px] bg-slate-50 rounded border-b border-slate-300 text-black",
          { "rounded-none rounded-t": books.length > 0 }
        )}
        type="text"
        placeholder="Search"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {books.length > 0 && (
        <ul className="bg-slate-50 flex flex-col w-[400px] rounded-b max-h-[300px] overflow-hidden">
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
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col text-black">
                  <p className="font-bold">{book.title}</p>
                  {book.author_name && <p>by {book.author_name?.join(", ")}</p>}
                </div>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
}
