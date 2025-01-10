import Book from "@/models/book";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // Explicitly typing as Promise
) {
  try {
    await connectToDatabase();

    const { slug } = await params; // Extract the book slug from the URL

    const book = await Book.findOne({ slug });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Book found", book });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // Explicitly typing as Promise
) {
  try {
    await connectToDatabase();

    // Await the params to handle any potential async behavior
    const { slug } = await params;

    const deletedBook = await Book.findOneAndDelete({ slug });

    if (!deletedBook) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Book deleted successfully', deletedBook });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // Explicitly typing as Promise
) {
  try {
    await connectToDatabase();

    const { slug } = await params; // Extract the book slug from the URL
    const updates = await request.json(); // Get the updated fields from the request body

    const updatedBook = await Book.findOneAndUpdate({ slug }, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
