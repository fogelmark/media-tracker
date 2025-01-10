import Book from "@/models/book";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Fetch all books
export async function GET() {
  try {
    await connectToDatabase();
    const books = await Book.find();
    return NextResponse.json(books);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add a new book
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newBook = new Book(body);
    await newBook.save();

    return NextResponse.json(newBook, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

