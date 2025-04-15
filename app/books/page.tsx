import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book } from "@/types";
import { Badge, Languages, Star } from "lucide-react";
import book_placeholder from "@/public/images/book-placeholder.png";
import Image from "next/image";

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/books/");
  const books = await data.json();
  console.log(books);

  return (
    <div className="flex gap-4 min-h-screen justify-center items-center">
      {books.map((book: Book) => (
        <Card key={book._id}>
          <div>
            {/* <Image /> */}
          </div>
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>by {book.author}</CardDescription>
          </CardHeader>
          <CardContent>
          <Languages className="h-4 w-4 mr-1" />
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
