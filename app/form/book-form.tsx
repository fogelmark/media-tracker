"use client";

import type React from "react";

import { Suspense, use, useState } from "react";
import {
  Upload,
  Star,
  BookOpen,
  BookText,
  Clock,
  Cloud,
  CircleX,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import normal_people from "@/public/images/normal-people.jpg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Cloudinary from "@/components/ui/cloudinary";
import GenreSkeleton from "@/components/loaders/genre-skeleton";
import { handleSubmit } from "./form-submit-handler";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  pages: z.string(),
  first_published: z.string(),
  language: z.enum(["English", "Swedish"]),
  status: z.enum(["Want to Read", "In Progress", "Completed"]),
  rating: z.number().min(0).max(5),
  notes: z.string().optional(),
  cover_id: z.string().optional(),
  genre: z.array(z.string()),
});

export default function ShadBookForm({
  genres,
}: {
  genres: Promise<{ _id: string; name: string }[]>;
}) {
  const allGenres = genres ? use(genres) : null;
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      pages: "",
      first_published: "",
      language: "Swedish",
      status: "Want to Read",
      rating: 0,
      notes: "",
      cover_id: "",
      genre: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);
    await handleSubmit({ ...values, genre: selectedGenres });
    form.reset();
    setSelectedGenres([]);
  };

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const setRating = (rating: number) => {
    form.setValue("rating", rating);
  };

  return (
    <div className=" text-gray-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-medium text-gray-300">
            Add New Book
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-6">
              <Tabs defaultValue="book details" className="space-y-6 w-full">
                <TabsList>
                  <TabsTrigger value="book details">
                    <BookText className="mr-2 h-4 w-4" />
                    book details
                  </TabsTrigger>
                  <TabsTrigger value="reading status">
                    <Clock className="mr-2 h-4 w-4" />
                    reading status
                  </TabsTrigger>
                  <TabsTrigger value="genres & categories">
                    <BookOpen className="mr-2 h-4 w-4" />
                    genres & categories
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="book details" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Title"
                                className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-400 focus-visible:ring-indigo-500"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Author"
                                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus-visible:ring-indigo-500"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="pages"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="string"
                                  placeholder="Pages"
                                  className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus-visible:ring-indigo-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="first_published"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="string"
                                  placeholder="First Published Year"
                                  className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus-visible:ring-indigo-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue="Swedish"
                              >
                                <div className="flex items-center w-fit cursor-pointer space-x-2">
                                  <RadioGroupItem
                                    value="Swedish"
                                    id="Swedish"
                                  />
                                  <Label
                                    htmlFor="Swedish"
                                    className="cursor-pointer text-xs uppercase font-semibold"
                                  >
                                    Swedish
                                  </Label>
                                </div>
                                <div className="flex items-center w-fit cursor-pointer space-x-2">
                                  <RadioGroupItem
                                    value="English"
                                    id="English"
                                  />
                                  <Label
                                    htmlFor="English"
                                    className="cursor-pointer text-xs uppercase font-semibold"
                                  >
                                    English
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="cover_id"
                      render={({ field }) => (
                        <Cloudinary field={field} form={form} />
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="reading status" className="space-y-6">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-sm font-medium text-gray-300">
                            Reading Status
                          </FormLabel>
                          <div className="grid grid-cols-3 gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              className={`border-gray-600 bg-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 ${
                                field.value === "Want to Read"
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : ""
                              }`}
                              onClick={() =>
                                form.setValue("status", "Want to Read")
                              }
                            >
                              Want to Read
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className={`border-gray-600 bg-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 ${
                                field.value === "In Progress"
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : ""
                              }`}
                              onClick={() =>
                                form.setValue("status", "In Progress")
                              }
                            >
                              In Progress
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className={`border-gray-600 bg-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 ${
                                field.value === "Completed"
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : ""
                              }`}
                              onClick={() =>
                                form.setValue("status", "Completed")
                              }
                            >
                              Completed
                            </Button>
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-sm font-medium text-slate-300">
                            Your Rating
                          </FormLabel>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  strokeWidth={1.5}
                                  className={`h-8 w-8 ${
                                    (field.value ?? 0) >= star
                                      ? "fill-amber-500 text-amber-500"
                                      : "text-amber-500"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-sm font-medium text-gray-300">
                            Reading Notes (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Add your personal notes about this book"
                              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus-visible:ring-indigo-500 min-h-[150px]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="genres & categories" className="space-y-6">
                  <div className="space-y-6">
                    <Label className="text-sm font-medium text-gray-300">
                      Select Genres (Multiple)
                    </Label>
                    <Suspense fallback={<GenreSkeleton />}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {allGenres &&
                          allGenres.map((genre) => (
                            <Badge
                              key={genre._id}
                              className={`cursor-pointer py-2 px-3 text-sm justify-center select-none ${
                                selectedGenres.includes(genre._id)
                                  ? "bg-gradient-to-b from-acapulco-500 to-acapulco-600"
                                  : "bg-gray-700 hover:bg-gray-600"
                              }`}
                              onClick={() => handleGenreToggle(genre._id)}
                            >
                              {genre.name}
                            </Badge>
                          ))}
                      </div>
                    </Suspense>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-700 p-6">
              <Button
                type="button"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-b from-acapulco-500 to-acapulco-600 text-gray-100 hover:bg-gradient-to-t hover:from-acapulco-600 hover:to-acapulco-500"
              >
                Save Book
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
