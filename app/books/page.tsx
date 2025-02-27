import { Book } from '@/models/book';
import React from 'react'

export default async function Page() {
  const data = await fetch('http://localhost:3000/api/books')
  const books: Book[] = await data.json()
  
  return (
    <div>
      {books.map((book) => (
        <div key={book._id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.status}</p>
          {book.rating && <p>{book.rating}</p>}
        </div>
      ))}
    </div>
  )
}
