import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import Genre from "@/models/genre";

// Fetch all genres
export async function GET() {
  try {
    await connectToDatabase();
    const genres = await Genre.find();
    return NextResponse.json(genres);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add a new genre
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newGenre = new Genre(body);
    await newGenre.save();

    return NextResponse.json(newGenre, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
