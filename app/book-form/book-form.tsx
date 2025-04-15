"use client";

import type React from "react";

import { Suspense, use, useEffect } from "react";
import { Star, BookOpen, BookText, Clock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

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
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    pages: z.string().min(1, { message: "Pages is required" }),
    first_published: z.string().min(1, {
      message: "First publication year is required",
    }),
    language: z.enum(["English", "Swedish"]),
    status: z.enum(["Want to Read", "In Progress", "Completed"]),
    rating: z.number().nullable().optional(),
    notes: z.string().optional(),
    cover_id: z.string().optional(),
    genre: z
      .array(z.string().min(1))
      .min(1, { message: "At least one genre is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.status === "Completed" && (!data.rating || data.rating < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Rating is required when status is 'Completed'",
        path: ["rating"],
      });
    }
  });

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
    <div className=" text-gray-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl flex items-center gap-2 text-gray-300">
            <BookText className="h-6 w-6" />
            <h1>Add a book</h1>
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
                                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus-visible:ring-gray-300"
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
                                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus-visible:ring-gray-300"
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
                                  className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus-visible:ring-gray-300 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                                  className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus-visible:ring-gray-300 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                                    className="cursor-pointer text-sm font-semibold"
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
                                    className="cursor-pointer text-sm font-semibold"
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
                          {/* <FormLabel className="text-sm font-semibold text-gray-300">
                            Reading Status
                          </FormLabel> */}
                          <div className="grid grid-cols-3 gap-4">
                            <Button
                              type="button"
                              variant="default"
                              className={`border-gray-600 bg-gray-700 font-semibold ${
                                field.value === "Want to Read"
                                  ? "bg-gradient-to-b from-acapulco-500 to-acapulco-600 text-gray-300"
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
                              className={`border-gray-600 bg-gray-700 font-semibold ${
                                field.value === "In Progress"
                                  ? "bg-gradient-to-b from-acapulco-500 to-acapulco-600 text-gray-300"
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
                              className={`border-gray-600 bg-gray-700 font-semibold ${
                                field.value === "Completed"
                                  ? "bg-gradient-to-b from-acapulco-500 to-acapulco-600 text-gray-300"
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
                            Your Rating
                          </FormLabel> */}
                          <div className="flex w-fit">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="focus:outline-none px-[1px] disabled:opacity-50"
                                disabled={status !== "Completed"}
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
                          {/* <FormLabel className="text-sm font-medium text-gray-300">
                            Reading Notes (Optional)
                          </FormLabel> */}
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Add your personal notes about this book (optional)"
                              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus-visible:ring-gray-300 min-h-[150px]"
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
                          {/* <FormLabel className="text-sm font-medium text-gray-300">
                            Select Genres (Multiple)
                          </FormLabel> */}

                          <Suspense fallback={<GenreSkeleton />}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {allGenres?.map((genre) => (
                                <Badge
                                  key={genre._id}
                                  className={`cursor-pointer py-2 px-3 text-sm justify-center select-none ${
                                    field.value?.includes(genre._id)
                                      ? "bg-gradient-to-b from-acapulco-500 to-acapulco-600"
                                      : "bg-gray-700"
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
            <CardFooter className="flex border-t border-gray-700 p-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-b px-10 font-semibold from-acapulco-500 to-acapulco-600 text-gray-100 hover:bg-gradient-to-t hover:from-acapulco-600 hover:to-acapulco-500"
              >
                Add Book
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
