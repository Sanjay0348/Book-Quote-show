import mongoose, { Document, Schema } from 'mongoose';

export interface IQuote extends Document {
  text: string;
  author: string;
  book: string;
  category: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new Schema<IQuote>({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  book: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 50
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      // delete ret.__v;
      return ret;
    }
  }
});

// Indexes for performance
quoteSchema.index({ category: 1 });
quoteSchema.index({ author: 1 });
quoteSchema.index({ likes: -1 });
quoteSchema.index({ createdAt: -1 });

// Text search index
quoteSchema.index({
  text: 'text',
  author: 'text',
  book: 'text'
});

export const Quote = mongoose.model<IQuote>('Quote', quoteSchema);