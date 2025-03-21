export interface Book {
  title: string;
  author: string;
  cover_id: string;
  pages: number | string;
  first_published: number | string;
  status: string;
  rating: number;
  language: string;
  genre: string[];
  [key: string]: any;
}