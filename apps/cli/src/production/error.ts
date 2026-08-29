import { Schema } from "effect";

/** Production arguments do not describe one unambiguous release operation. */
export class ProductionArgumentsError extends Schema.TaggedError<ProductionArgumentsError>()(
  "ProductionArgumentsError",
  {
    command: Schema.Literals([
      "abort",
      "accept",
      "cleanup",
      "recover",
      "release",
      "status",
    ]),
    option: Schema.Literals([
      "--recovery-id",
      "--release-id",
      "--scope",
      "command",
    ]),
    reason: Schema.Literals([
      "duplicate",
      "identity",
      "missing",
      "unknown",
      "value",
    ]),
  }
) {}

/** Creates one typed argument failure without retaining unknown input values. */
export function productionArgumentsError(
  command: ProductionArgumentsError["command"],
  option: ProductionArgumentsError["option"],
  reason: ProductionArgumentsError["reason"]
) {
  return new ProductionArgumentsError({ command, option, reason });
}
