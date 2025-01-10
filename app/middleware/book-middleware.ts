import { Schema } from 'mongoose';
import slugify from 'slugify';

// Middleware function to validate the rating based on status
export function validateBookStatus(schema: Schema) {
  schema.pre('save', function (next) {
    const doc: any = this; // Ensure correct typing for `this`

    // Debugging logs
    console.log('Saving document:', doc);
    console.log('Status:', doc.status);
    console.log('Rating:', doc.rating);

    if (doc.status !== 'Completed' && doc.rating != null) {
      return next(
        new Error('Rating can only be set if the book status is "Completed".')
      );
    }
    next();
  });
}

export function generateSlug(schema: Schema) {
  schema.pre('save', function (next) {
    const doc: any = this; // Ensure correct typing for `this`

    if (doc.title && doc.author) {
      doc.slug = slugify(`${doc.title} ${doc.author}`, { lower: true, strict: true });
    }

    next();
  });
}
