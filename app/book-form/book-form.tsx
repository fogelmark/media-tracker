"use client";

import type React from "react";

import { Suspense, use, useEffect } from "react";
import { Star, BookOpen, BookText, Clock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { FormInput } from "./form-input";
import { handleSubmit } from "./form-submit-handler";
import { useToast } from "@/hooks/use-toast";
import Cloudinary from "@/components/ui/cloudinary";
import GenreSkeleton from "@/components/loaders/genre-skeleton";
import { formSchema, FormSchemaType } from "./form-schema";
import ReadingLanguage from "./reading-language";

export default function BookForm({
  genres,
}: {
  genres: Promise<{ _id: string; name: string }[]>;
}) {
  const allGenres = genres ? use(genres) : null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      pages: "",
      first_published: "",
      language: "Swedish",
      status: "Want to Read",
      rating: null,
      notes: "",
      cover_id: "",
      genre: [],
    },
  });

  const { toast } = useToast();

  const { isSubmitting } = form.formState;

  const selectedGenres = form.watch("genre") || [];
  const status = form.watch("status");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await handleSubmit({ ...values, genre: selectedGenres });

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const setRating = (rating: number) => {
    if (status === "Completed") {
      form.setValue("rating", rating);
    } else {
      form.setValue("rating", null);
    }
  };

  useEffect(() => {
    if (status !== "Completed") {
      form.setValue("rating", null);
      form.clearErrors("rating");
    }
  }, [status, form]);

  return (
    <div className="text-neutral-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-ash-highlight">
        <CardHeader className="border-b dark:border-ash-highlight">
          <CardTitle className="text-2xl flex items-center gap-2 text-neutral-200">
            <BookText className="h-6 w-6" />
            <h1>Add a book</h1>
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-6">
              <Tabs defaultValue="book details" className="space-y-6 w-full">
                <TabsList className="shadow-ash">
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
                    <div className="space-y-2">
                      <FormInput<FormSchemaType>
                        name="title"
                        control={form.control}
                        placeholder={`"The Fellowship of the Ring"`}
                        className="dark:bg-ash-field border-2 shadow-ash dark:border-ash-highlight/50 text-neutral-200 placeholder:text-gray-400 focus-visible:ring-gray-300"
                      />

                      <FormInput<FormSchemaType>
                        name="author"
                        control={form.control}
                        placeholder={`"J.R.R. Tolkien"`}
                        className="dark:bg-ash-field border-2 shadow-ash dark:dark:border-ash-highlight/50 text-neutral-200 placeholder:text-gray-400 focus-visible:ring-gray-300"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormInput<FormSchemaType>
                          name="pages"
                          control={form.control}
                          placeholder={`"432"`}
                          className="dark:bg-ash-field border-2 shadow-ash dark:border-ash-highlight/50 text-neutral-200 placeholder:text-gray-400 focus-visible:ring-gray-300 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <FormInput<FormSchemaType>
                          name="first_published"
                          control={form.control}
                          placeholder={`"July 29, 1954"`}
                          className="dark:bg-ash-field border-2 shadow-ash dark:border-ash-highlight/50 text-neutral-200 placeholder:text-gray-400 focus-visible:ring-gray-300 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </div>
                      <ReadingLanguage control={form.control} />
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
                          <div className="grid grid-cols-3 gap-4">
                            <Button
                              type="button"
                              variant="default"
                              className={`bg-ash-field shadow-ash font-semibold ${
                                field.value === "Want to Read"
                                  ? "bg-gradient-to-b from-acapulco-700 to-acapulco-800 text-neutral-200"
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
                              variant="default"
                              className={`bg-ash-field shadow-ash font-semibold ${
                                field.value === "In Progress"
                                  ? "bg-gradient-to-b from-acapulco-700 to-acapulco-800 text-neutral-200"
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
                              variant="default"
                              className={`bg-ash-field shadow-ash font-semibold ${
                                field.value === "Completed"
                                  ? "bg-gradient-to-b from-acapulco-700 to-acapulco-800 text-neutral-200"
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
                          {/* <FormLabel className="text-sm font-medium text-slate-300">
                            Rating
                          </FormLabel> */}
                          <div className="flex w-fit">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="focus:outline-none px-[1px] disabled:opacity-30"
                                disabled={status !== "Completed"}
                              >
                                <Star
                                  strokeWidth={1.5}
                                  className={`h-8 w-8 ${
                                    (field.value ?? 0) >= star
                                      ? "fill-amber-500 text-amber-500"
                                      : "text-neutral-600"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                          {status === "Completed" && (
                            <FormMessage className="text-red-400" />
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          {/* <FormLabel className="text-sm font-medium text-neutral-200">
                            Reading Notes (Optional)
                          </FormLabel> */}
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Add your personal notes about this book (optional)"
                              className="min-h-[150px]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="genres & categories" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => {
                      const handleToggle = (id: string) => {
                        const current = field.value || [];
                        const updated = current.includes(id)
                          ? current.filter((genreId: string) => genreId !== id)
                          : [...current, id];
                        field.onChange(updated);
                      };

                      return (
                        <FormItem>
                          {/* <FormLabel className="text-sm font-medium text-neutral-200">
                            Select Genres (Multiple)
                          </FormLabel> */}

                          <Suspense fallback={<GenreSkeleton />}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {allGenres?.map((genre) => (
                                <Badge
                                  key={genre._id}
                                  className={`cursor-pointer py-2 px-3 text-sm justify-center select-none ${
                                    field.value?.includes(genre._id)
                                      ? "bg-gradient-to-b from-acapulco-700 to-acapulco-800"
                                      : "dark:bg-ash-field dark:text-neutral-200"
                                  }`}
                                  onClick={() => handleToggle(genre._id)}
                                >
                                  {genre.name}
                                </Badge>
                              ))}
                            </div>
                          </Suspense>

                          <FormMessage className="text-red-400" />
                        </FormItem>
                      );
                    }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex border-t border-ash-highlight p-6">
              <Button
                type="submit"
                variant="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-b px-10 font-semibold from-acapulco-700 to-acapulco-800 text-neutral-200"
              >
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
