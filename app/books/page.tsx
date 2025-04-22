import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book, Genre } from "@/types";
import { BookOpenText, Calendar, Languages, Star } from "lucide-react";
import Image from "next/image";
import { getCldImageUrl } from "next-cloudinary";
import DescriptionDropdown from "@/components/description-dropdown";

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/books/");
  const books = await data.json();

  return (
    <div className="flex max-sm:px-4 flex-col py-10 w-full gap-4 md:min-h-min items-center">
      {books.map((book: Book) => (
        <Card
          key={book._id}
          className="flex max-sm:flex-col w-full max-w-4xl border-t-[1px] border-highlight overflow-hidden"
        >
          <div className="p-6 pr-0">
            <div className="relative min-w-[200px] h-auto aspect-[2/3]">
              <Image
                src={getCldImageUrl({
                  src: book.cover_id,
                })}
                fill
                className="rounded"
                alt="bok"
              />
            </div>
          </div>
          <div>
            <CardContent className="grid text-sm gap-4">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-3xl">{book.title}</h2>
                <h3 className="text-xl">by {book.author}</h3>
              </div>
              <div className="flex max-sm:justify-self-center gap-[1px]">
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
              <div className="flex max-sm:row-start-5 text-gray-400 flex-col md:flex-row md:items-center">
                <div className="flex flex-col md:flex-row gap-1 md:gap-5">
                  <div className="flex gap-2 items-center">
                    <Languages className="size-4" />
                    <p>
                      Read in <span className="lowercase">{book.language}</span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BookOpenText className="size-4" />
                    <p>{book.pages} pages</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Calendar className="size-4" />
                    <p>
                      First published {book.first_published}
                    </p>
                  </div>
                </div>
              </div>
              {book.description && (
                <DescriptionDropdown description={book.description} />
              )}
              <div>
                <h3 className="font-semibold mb-1">Genres</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  {book.genre.map((genre: Genre) => (
                    <div
                      key={genre._id}
                      className="font-semibold gap-2 items-center inline-block bg-gradient-to-b from-acapulco-400 to-acapulco-500 leading-4 bg-clip-text text-transparent "
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
              {book.notes && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-1">
                    Notes
                  </h3>
                  <div className="bg-gray-700/50 rounded-md p-3 text-gray-300 text-sm italic">
                    <p>{book.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
            {/* <CardFooter><p>Card Footer</p></CardFooter> */}
          </div>
        </Card>
      ))}
    </div>
  );
}
