import { Book } from "@/types";
import axios from "axios";
import { FormikHelpers } from "formik";
import toast from "react-hot-toast";

export const handleSubmit = async (
  values: Book,
  { resetForm, setSubmitting }: FormikHelpers<Book>,
  setErrorMessage: (msg: string | null) => void,
  setIsSuccess: (success: boolean) => void
) => {
  setErrorMessage(null);

  const submitPromise = axios.post("/api/books", values);

  toast.promise(submitPromise, {
    loading: "Submitting...",
    success: "Book added successfully!",
    error: "Something went wrong, try again later",
  });

  try {
    const response = await submitPromise;

    if (response.status === 201) {
      setIsSuccess(true);
      resetForm();
    }
  } catch (error: any) {
    if (error.response?.status === 400) {
      setErrorMessage(error.response.data.error);
    } else {
      setErrorMessage("Something went wrong, try again later");
    }
    console.error(error);
  } finally {
    setSubmitting(false);
  }
};
