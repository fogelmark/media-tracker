import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  pages: Yup.number().required("Pages is required"),
  first_published: Yup.number().required("First published year is required"),
  rating: Yup.number()
    .nullable()
    .required("Rating is required")
    .min(1, "You must select a rating"),
  genre: Yup.array().min(1, "You must select at least one genre"),
  cover_id: Yup.string().required("Cover image is required"),
});