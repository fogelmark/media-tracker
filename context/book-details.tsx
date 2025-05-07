"use client";

import { Book } from "@/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

const initialValues: Book = {
  title: "",
  author: "",
  cover_id: "",
  pages: "",
  first_published: "",
  status: "Want To Read",
  rating: 0,
  language: "Swedish",
  genre: [],
  _id: "",
  description: "",
  notes: ""
};


type OpenProviderProps = {
  children: React.ReactNode;
};

type BookDetailsContextType = {
  initialValues: Book;
  formData: Book;
  setFormData: Dispatch<SetStateAction<Book>>;
};

export const BookDetailsContext = createContext<BookDetailsContextType | null>(null);

export function BookDetailsContextProvider({ children }: OpenProviderProps) {
  const [formData, setFormData] = useState(initialValues);

  return (
    <BookDetailsContext.Provider value={{initialValues, formData, setFormData }}>
      {children}
    </BookDetailsContext.Provider>
  );
} 