import {
  type PublicationScope,
  PublicationScopeSchema,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Option, Schema } from "effect";

/** One CLI selector does not form a canonical exact publication scope. */
export class ProductionScopeDecodeError extends Schema.TaggedError<ProductionScopeDecodeError>()(
  "ProductionScopeDecodeError",
  {}
) {}

interface DecodedSelector {
  readonly kind: "content" | "family" | "snapshot";
  readonly value: unknown;
}

/** Converts one selector into an untrusted structured scope member. */
function decodeSelector(value: string): Option.Option<DecodedSelector> {
  const segments = value.split(":");
  const kind = segments.at(0);
  const first = segments.at(1);
  const second = segments.at(2);
  const remaining = segments.slice(3);
  if (kind === "snapshot" && first !== undefined && second === undefined) {
    return Option.some({ kind, value: first });
  }
  if (kind === "family" && first !== undefined && second === undefined) {
    return Option.some({ kind, value: first });
  }
  if (
    kind === "content" &&
    first !== undefined &&
    second !== undefined &&
    remaining.length > 0
  ) {
    return Option.some({
      kind,
      value: {
        contentKey: remaining.join(":"),
        family: first,
        locale: second,
      },
    });
  }
  return Option.none();
}

/** Strictly decodes repeated CLI selectors into one schema-derived scope. */
export const decodePublicationScopeSelectors = Effect.fn(
  "AksaraCli.decodePublicationScopeSelectors"
)((selectors: readonly string[]) => {
  const content: unknown[] = [];
  const families: unknown[] = [];
  const snapshots: unknown[] = [];
  for (const value of selectors) {
    const selected = decodeSelector(value);
    if (Option.isNone(selected)) {
      return Effect.fail(new ProductionScopeDecodeError());
    }
    const selection = selected.value;
    if (selection.kind === "content") {
      content.push(selection.value);
      continue;
    }
    if (selection.kind === "family") {
      families.push(selection.value);
      continue;
    }
    snapshots.push(selection.value);
  }
  return Schema.decodeUnknown(PublicationScopeSchema)({
    content,
    families,
    snapshots,
  }).pipe(
    Effect.mapError(() => new ProductionScopeDecodeError()),
    Effect.map((scope): PublicationScope => scope)
  );
});
