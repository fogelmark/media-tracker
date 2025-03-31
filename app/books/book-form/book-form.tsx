"use client";
import { Suspense, useState } from "react";

import { Formik, Form } from "formik";
import { handleSubmit } from "./book-form-handler";
import { Toaster } from "react-hot-toast";
import { useBookDetailsContext } from "@/hooks/use-context";
import { validationSchema } from "./form-validation";
import GenreSkeleton from "@/components/loaders/genre-skeleton";
import ImageUploadButton from "@/components/image-upload-button";
import Input from "@/components/input";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookText, Clock, BookOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BookForm({
  genres,
}: {
  genres: Promise<{ _id: string; name: string }[]>;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { initialValues } = useBookDetailsContext();

  return (
    <>
      <Toaster />
      {/* TODO - Refactor this to an array that maps all the inputs */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, helpers) => {
          handleSubmit(values, helpers, setErrorMessage, setIsSuccess);
        }}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form className="flex flex-col gap-4">
            <Tabs defaultValue="book details" className="w-full">
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
              <TabsContent value="book details">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Input
                      label="title"
                      name="title"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    <Input
                      label="author"
                      name="author"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    <div className="flex justify-between gap-4">
                      <Input
                        label="pages"
                        name="pages"
                        type="number"
                        className="w-full"
                        errors={errors}
                        touched={touched}
                      />
                      <Input
                        label="first published year"
                        name="first_published"
                        type="number"
                        className="w-full"
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                    <RadioGroup defaultValue="english">
                      <div className="flex items-center w-fit cursor-pointer space-x-2">
                        <RadioGroupItem value="english" id="english" />
                        <Label htmlFor="english" className="cursor-pointer text-xs uppercase font-semibold">English</Label>
                      </div>
                      <div className="flex items-center w-fit cursor-pointer space-x-2">
                        <RadioGroupItem value="swedish" id="swedish" />
                        <Label htmlFor="swedish" className="cursor-pointer text-xs uppercase font-semibold">Swedish</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <ImageUploadButton />
                </div>
              </TabsContent>
              <TabsContent value="reading status">
                <Input
                  label="status"
                  name="status"
                  type="radio"
                  options={["Want To Read", "In Progress", "Completed"]}
                />
                <Input
                  label="rating"
                  name="rating"
                  errors={errors}
                  values={values}
                />
              </TabsContent>
              <TabsContent value="genres & categories">
                <Suspense fallback={<GenreSkeleton />}>
                  <Input
                    label="genre"
                    name="genre"
                    type="checkbox"
                    genres={genres}
                    errors={errors}
                  />
                </Suspense>
              </TabsContent>
            </Tabs>
            <div className="border-t flex items-center justify-center border-gray-600 pt-8">
              <button
                disabled={isSubmitting}
                type="submit"
                className="px-10 py-2 uppercase justify-center font-semibold text-xs items-center bg-blue-500 max-w-[200px] rounded-3xl"
              >
                submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
