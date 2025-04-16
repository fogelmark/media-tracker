import mongoose, { Schema, Document, Model } from "mongoose";

export interface Genre extends Document {
  name: string;
}

const genreSchema: Schema<Genre> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

delete mongoose.models["Genre"];

const Genre: Model<Genre> =
  mongoose.models.Genre || mongoose.model<Genre>("Genre", genreSchema);

export default Genre;
