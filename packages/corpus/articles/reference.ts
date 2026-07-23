import { Schema } from "effect";

/** One reviewed source reference attached to an authored article. */
export const ReferenceSchema = Schema.Struct({
  authors: Schema.String,
  citation: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
  publication: Schema.optional(Schema.String),
  title: Schema.String,
  url: Schema.optional(Schema.String),
  year: Schema.Number,
}).pipe(Schema.mutable);
export type Reference = typeof ReferenceSchema.Type;
