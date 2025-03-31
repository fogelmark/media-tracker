import React from "react";
import ShadBookForm from "./book-form";
import { getGenres } from "@/lib/get-genres";

export default function Page() {
  const genresPromise = getGenres();
  return (
    <div>
      <ShadBookForm genres={genresPromise} />
    </div>
  );
}
