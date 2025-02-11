import { Schema, UpdateQuery } from 'mongoose';
import slugify from 'slugify';

interface BookDocument extends Document {
  title: string;
  author: string;
  status: string;
  rating?: number;
  slug?: string;
}

export function validateBookStatus(schema: Schema) {
  console.log('Applying validateBookStatus middleware...'); // ✅ Debugging

  const validateRating = async function (
    this: BookDocument,
    next: (err?: Error) => void
  ) {
    console.log('Validating rating - Status:', this.status, 'Rating:', this.rating);

    if (this.rating != null && this.status !== 'Completed') {
      return next(new Error('Rating can only be set when the book is completed.'));
    }

    next();
  };

  schema.pre<BookDocument>('save', function (next) {
    console.log('🔄 Pre-save middleware triggered');
    validateRating.call(this, next);
  });

  schema.pre('findOneAndUpdate', async function (next) {
    console.log('🔄 Pre-update middleware triggered');

    const update = this.getUpdate();
    if (!update || !(update as UpdateQuery<BookDocument>).rating) return next();

    console.log('🔍 Update payload:', update);

    const book = await this.model.findOne(this.getQuery());
    if (!book) return next(new Error('Book not found.'));

    validateRating.call(book, next);
  });
}


export function generateSlug(schema: Schema) {
  schema.pre<BookDocument>('save', function (next) {
    const doc = this; // Ensure correct typing for `this`

    if (doc.title && doc.author) {
      doc.slug = slugify(`${doc.title} ${doc.author}`, { lower: true, strict: true });
    }

    next();
  });
}
