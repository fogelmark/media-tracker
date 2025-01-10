import Book from "@/models/book";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Book deleted successfully', deletedBook });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = params; // Extract the book ID from the URL
    const updates = await request.json(); // Get the updated fields from the request body

    const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedBook) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Book updated successfully', updatedBook });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}