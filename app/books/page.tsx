import { getGenres } from "@/lib/get-genres";
import BookForm from "./book-form/book-form";

export default function Page() {
  const genresPromise = getGenres();

  return (
    <div className="flex justify-center">
      <BookForm genres={genresPromise} />
    </div>
  );
}
