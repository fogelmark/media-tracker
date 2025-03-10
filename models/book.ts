import mongoose, { Schema, Document, Model } from "mongoose";
import {
  generateSlug,
  validateBookStatus,
} from "@/app/middleware/book-middleware";

export interface Book extends Document {
  id: string;
  title: string;
  author: string;
  cover: string;
  slug: string;
  genre: mongoose.Types.ObjectId[];
  status: "Want To Read" | "In Progress" | "Completed";
  language: "Swedish" | "English";
  pages?: number;
  rating?: number | null;
  first_published?: number;
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
  cover: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true }],
  status: {
    type: String,
    enum: ["Want To Read", "In Progress", "Completed"],
    default: "Want To Read",
  },
  language: {
    type: String,
    enum: ["Swedish", "English"],
    default: "Swedish",
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
  first_published: {
    type: Number,
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
