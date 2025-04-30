import { z } from "zod";

export const formSchema = z
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
    cover_id: z.string().min(1, { message: "A book cover must be uploaded" }),
    description: z.string().optional(),
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

export type FormSchemaType = z.infer<typeof formSchema>;