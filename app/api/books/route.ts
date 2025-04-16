import Book from "@/models/book";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";  
import Genre from "../../../models/genre";

// Fetch all books
export async function GET() {
  try {
    await connectToDatabase();
    const books = await Book.find().populate("genre", "-__v");
    return NextResponse.json(books);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add a new book
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    body.genre = body.genre.map((id: string) => new mongoose.Types.ObjectId(id));
    const newBook = new Book(body);
    await newBook.save();

    return NextResponse.json(newBook, { status: 201 });
  } catch (error: any) {

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A book with the same title and author already exists." },
        { status: 400 }
      );
    }

    const statusCode = error.message.includes("Rating can only be set when the book is completed.")
      ? 400
      : 500;

    return NextResponse.json({ error: error.message }, { status: statusCode });
  }
}