import React from "react";

interface CardProps {
  id: string;
  title: string;
  author: string;
  status: string;
  rating?: number | null | string;
  cover?: any;
}

export default function Card({ id, title, author, status, rating }: CardProps) {
  return (
    <div key={id} className="p-4 drop shadow-xl bg-slate-700">
      <h2>{title}</h2>
      <p>{author}</p>
      <p>{status}</p>
      {rating && <p>{rating}</p>}
    </div>
  );
}
