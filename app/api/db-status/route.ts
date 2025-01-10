import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ status: 'success', message: 'Database is connected' });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: `Database connection failed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
