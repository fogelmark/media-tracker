import mongoose, { Schema, Document, Model } from 'mongoose';
import { generateSlug, validateBookStatus } from '@/app/middleware/book-middleware';

// Define the Book interface
export interface IBook extends Document {
  title: string;
  author: string;
  slug: string;
  genre: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  language: 'Swedish' | 'English';
  pages?: number;
  rating?: number | null;
  createdAt: Date;
}

// Define the Book schema
const bookSchema: Schema<IBook> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  genre: {
    type: String,
    enum: [
      'Fiction',
      'Non-Fiction',
      'Mystery',
      'Fantasy',
      'Science Fiction',
      'Biography',
      'History',
      'Self-Help',
      'Thriller',
      'Other',
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  language: {
    type: String,
    enum: ['Swedish', 'English'],
    default: 'Swedish',
  },
  pages: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

validateBookStatus(bookSchema);
generateSlug(bookSchema);

// Create the Book model
const Book: Model<IBook> =
  mongoose.models.book || mongoose.model<IBook>('book', bookSchema);

export default Book;
