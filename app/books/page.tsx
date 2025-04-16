import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book, Genre } from "@/types";
import { Badge, Languages, Star } from "lucide-react";
import book_placeholder from "@/public/images/book-placeholder.png";
import Image from "next/image";

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/books/");
  const books = await data.json();
  console.log(books);

  return (
    <div className="flex flex-col py-10 w-full gap-4 min-h-screen items-center">
      {books.map((book: Book) => (
        <Card
          key={book._id}
          className="flex shadow-highlight overflow-hidden"
        >
          <div className="py-6 pl-6 relative justify-self-center h-auto aspect-[2/3]">
            <Image src={book_placeholder} className="rounded" alt="bok" />
          </div>
          <div>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription className="text-gray-400">
                by {book.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex gap-2 items-center text-gray-400">
                <div className="flex gap-[1px]">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < book.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                <Languages className="h-4 w-4" />
                <p className="">{book.language}</p>
                <p className="">{book.pages} pages</p>
              </div>
              <p className="text-gray-400">
                First published {book.first_published}
              </p>
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-gray-400">{book.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Genres</h3>
                <div className="flex gap-2 items-center">
                {book.genre.map((genre: Genre) => (
                  <div key={genre._id} className="flex text-xs font-semibold gap-2 items-center">
                    <p>{genre.name}</p>
                  </div>
                ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-300 mb-1">Notes</h3>
                <div className="bg-gray-700/50 rounded-md p-3 text-gray-300 text-sm italic">
                  <p className="line-clamp-2">{book.notes}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}
