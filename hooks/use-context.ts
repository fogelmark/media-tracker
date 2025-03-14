
import { BookDetailsContext } from "@/context/book-details"
import { useContext } from "react"

export function useBookDetailsContext() {
  const context = useContext(BookDetailsContext)

  if (!context) {
    throw new Error("useBookDetailsContext must be used within a BookDetailsContextProvider")
  }
  return context
}
