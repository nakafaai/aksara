import { Schema } from "effect";

/** One named production option that a command accepts or rejects. */
export const ProductionOptionSchema = Schema.Literals([
  "--rebuild",
  "--recovery-id",
  "--release-id",
  "--scope",
]);
export type ProductionOption = typeof ProductionOptionSchema.Type;

/** Production arguments do not describe one unambiguous release operation. */
export class ProductionArgumentsError extends Schema.TaggedError<
  ProductionArgumentsError,
  { readonly brand: unique symbol }
>()("ProductionArgumentsError", {
  command: Schema.Literals([
    "abort",
    "accept",
    "cleanup",
    "parity",
    "recover",
    "release",
    "status",
  ]),
  option: Schema.Literals([...ProductionOptionSchema.literals, "command"]),
  reason: Schema.Literals([
    "conflict",
    "duplicate",
    "identity",
    "missing",
    "unknown",
    "value",
  ]),
}) {}

/** Creates one typed argument failure without retaining unknown input values. */
export function productionArgumentsError(
  command: ProductionArgumentsError["command"],
  option: ProductionArgumentsError["option"],
  reason: ProductionArgumentsError["reason"]
) {
  return new ProductionArgumentsError({ command, option, reason });
}
