export interface Book {
  _id: string;
  title: string;
  author: string;
  cover_id: string;
  pages: number | string;
  first_published: number | string;
  status: string;
  rating: number;
  language: string;
  genre: Genre[];
  [key: string]: any;
}

export interface Genre {
  _id: string;
  name: string;
}