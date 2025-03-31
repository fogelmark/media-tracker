import mongoose, { Schema, Document, Model } from "mongoose";
import {
  generateSlug,
  validateBookStatus,
} from "@/app/middleware/book-middleware";

export interface Book extends Document {
  id: string;
  title: string;
  author: string;
  cover_id: string;
  slug: string;
  genre: mongoose.Types.ObjectId[];
  status: "Want to Read" | "In Progress" | "Completed";
  language: "Swedish" | "English";
  pages?: number;
  rating?: number | null;
  first_published?: number;
  notes: string;
  createdAt: Date;
}

const bookSchema: Schema<Book> = new mongoose.Schema({
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
  cover_id: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  genre: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true },
  ],
  status: {
    type: String,
    enum: ["Want to Read", "In Progress", "Completed"],
    default: "Want to Read",
  },
  language: {
    type: String,
    enum: ["Swedish", "English"],
    default: "Swedish",
  },
  pages: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  first_published: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

validateBookStatus(bookSchema);
generateSlug(bookSchema);

const Book: Model<Book> =
  mongoose.models.book || mongoose.model<Book>("book", bookSchema);

// frontend-friendly interface
// export type BookClient = Omit<Book, 'createdAt'>

export default Book;
