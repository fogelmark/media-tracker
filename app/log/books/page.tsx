import React from "react";
import { getGenres } from "@/lib/get-genres";
import BookForm from "./book-form";

export default function Page() {
  const genresPromise = getGenres();
  return (
    <div>
      <BookForm genres={genresPromise} />
    </div>
  );
}
