"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface FormData {
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

const initState: FormData = {
  title: "",
  author: "",
  cover_id: "",
  pages: "",
  first_published: "",
  status: "Want To Read",
  rating: 0,
  language: "Swedish",
  genre: [],
};


type OpenProviderProps = {
  children: React.ReactNode;
};

type BookDetailsContextType = {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
};

export const BookDetailsContext = createContext<BookDetailsContextType | null>(null);

export function BookDetailsContextProvider({ children }: OpenProviderProps) {
  const [formData, setFormData] = useState(initState);

  return (
    <BookDetailsContext.Provider value={{formData, setFormData }}>
      {children}
    </BookDetailsContext.Provider>
  );
} 