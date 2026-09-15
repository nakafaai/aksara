import { Schema } from "effect";

const ProductionVariableSchema = Schema.Literals([
  "AKSARA_PUBLICATION_ENDPOINT",
  "AKSARA_PUBLICATION_TOKEN",
  "AKSARA_RENDERER_ENDPOINT",
  "AKSARA_RENDERER_TOKEN",
  "AKSARA_SIGNING_KEY_ID",
  "AKSARA_SIGNING_PRIVATE_KEY",
]);
export type ProductionVariable = typeof ProductionVariableSchema.Type;

/** One required production variable is absent, malformed, or unsafe. */
export class ProductionEnvironmentError extends Schema.TaggedError<ProductionEnvironmentError>()(
  "ProductionEnvironmentError",
  { variable: ProductionVariableSchema }
) {}
