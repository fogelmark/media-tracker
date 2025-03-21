import { Book } from "@/types";
import axios from "axios";
import { FormikHelpers } from "formik";

export const handleSubmit = async (
  values: Book,
  { setSubmitting }: FormikHelpers<Book>,
  setErrorMessage: (msg: string | null) => void,
  setIsSuccess: (success: boolean) => void
) => {
  setErrorMessage(null);

  try {
    const response = await axios.post("/api/books", values);

    if (response.status === 201) {
      setIsSuccess(true);
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
