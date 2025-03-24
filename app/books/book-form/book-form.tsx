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

export default function BookForm({
  genres,
}: {
  genres: Promise<{ _id: string; name: string }[]>;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { initialValues } = useBookDetailsContext();

  return (
    <div
      className="flex flex-col px-4 md:w-2/3 lg:w-2/5 py-10 w-full"
    >
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
            <Input
              label="language"
              name="language"
              type="radio"
              options={["Swedish", "English"]}
            />
            <Suspense fallback={<GenreSkeleton />}>
              <Input
                label="genre"
                name="genre"
                type="checkbox"
                genres={genres}
                errors={errors}
              />
            </Suspense>
            <ImageUploadButton />
            <div className="border-t flex items-center justify-center border-slate-600 pt-8">
              <button
                disabled={isSubmitting}
                type="submit"
                className="px-10 py-2 uppercase justify-center font-semibold text-sm items-center bg-blue-500 max-w-[200px] rounded-3xl"
              >
                submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
