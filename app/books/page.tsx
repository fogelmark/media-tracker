import { getGenres } from "@/lib/get-genres";
import BookForm from "./book-form/book-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Star, BookOpen, BookText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  const genresPromise = getGenres();

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-4xl bg-gray-800 text-gray-100">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-2xl font-medium">Add New Book</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <BookForm genres={genresPromise} />
        </CardContent>
      </Card>
    </div>
  );
}
