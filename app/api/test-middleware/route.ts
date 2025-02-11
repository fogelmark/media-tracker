// import { connectToDatabase } from '@/lib/mongodb';
// import Book from '@/models/book';
// import { NextResponse } from 'next/server'; // Ensure you're connecting to MongoDB

// export async function GET() {
//   await connectToDatabase();

//   try {
//     const book = new Book({
//       title: 'Middleware Test',
//       author: 'John Doe',
//       status: 'In Progress',
//       rating: 5, // 🚨 Should trigger middleware error
//     });

//     await book.save();
//     return NextResponse.json({ message: 'Book saved successfully' });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
