import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";
import { readConstantModule } from "#corpus/module/constant";
import { ItemSourceSchema } from "#corpus/question-bank/item";
import { validateItemLabels } from "#corpus/question-bank/label";

/** An item module contains executable or structurally invalid TypeScript. */
export class ItemSourceError extends Schema.TaggedError<
  ItemSourceError,
  { readonly brand: unique symbol }
>()("ItemSourceError", {
  cause: Schema.optional(Schema.Unknown),
  sourcePath: CorpusSourcePathSchema,
}) {}

/** The shape of every item module: `const item: ItemSource = { ... }`, default-exported. */
const ITEM_MODULE = {
  binding: "item",
  typeModule: "#corpus/question-bank/item",
  typeName: "ItemSource",
} as const;

/** Parses one item module through the native AST without evaluating code. */
export const decodeItemSource = Effect.fn("AksaraCorpus.decodeItemSource")(
  function* (source: string, sourcePath: typeof CorpusSourcePathSchema.Type) {
    const input = yield* readConstantModule(ITEM_MODULE, {
      fileName: sourcePath,
      source,
    });
    if (input === undefined) {
      return yield* new ItemSourceError({ sourcePath });
    }

    const item = yield* Schema.decodeUnknownEffect(ItemSourceSchema)(input, {
      onExcessProperty: "error",
    }).pipe(
      Effect.mapError((cause) => new ItemSourceError({ cause, sourcePath }))
    );
    yield* validateItemLabels(item, sourcePath);
    return item;
  }
);
