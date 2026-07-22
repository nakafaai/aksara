import {
  compareContentHeads,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import { ContentDeliveryClassSchema } from "@nakafa/aksara-contracts/delivery";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { MaterialLessonRouteSchema } from "@nakafa/aksara-contracts/projection/material";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

const MaterialEntrySchema = Schema.Struct({
  delivery: ContentDeliveryClassSchema,
  rendererDomain: RendererDomainSchema,
  route: MaterialLessonRouteSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type MaterialEntry = typeof MaterialEntrySchema.Type;

/** A source-controlled material registry row failed strict decoding. */
export class MaterialRegistryError extends Schema.TaggedError<MaterialRegistryError>()(
  "MaterialRegistryError",
  { cause: Schema.Unknown, message: Schema.NonEmptyTrimmedString }
) {}

/** Two registry rows claim the same stable locale-specific content head. */
export class MaterialIdentityError extends Schema.TaggedError<MaterialIdentityError>()(
  "MaterialIdentityError",
  {
    contentKey: ContentKeySchema,
    locale: MaterialLessonRouteSchema.fields.locale,
  }
) {}

/** A signed source path does not end in its declared locale-specific MDX file. */
export class MaterialPathError extends Schema.TaggedError<MaterialPathError>()(
  "MaterialPathError",
  {
    locale: MaterialLessonRouteSchema.fields.locale,
    sourcePath: CorpusSourcePathSchema,
  }
) {}

const functionConceptKey =
  "material/lesson/mathematics/function-composition-inverse-function/function-concept";

const materialEntries: readonly unknown[] = [
  {
    delivery: "public",
    rendererDomain: "material-mathematics",
    route: {
      contentKey: functionConceptKey,
      locale: "en",
      materialKey: "lesson.mathematics.function-composition-inverse-function",
      order: 5,
      publicPath:
        "subjects/mathematics/function-composition-inverse-function/function-concept",
      sectionKey: "function-concept",
    },
    sourcePath: "packages/corpus/material/mathematics/function/concept/en.mdx",
  },
  {
    delivery: "public",
    rendererDomain: "material-mathematics",
    route: {
      contentKey: functionConceptKey,
      locale: "id",
      materialKey: "lesson.mathematics.function-composition-inverse-function",
      order: 5,
      publicPath:
        "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
      sectionKey: "function-concept",
    },
    sourcePath: "packages/corpus/material/mathematics/function/concept/id.mdx",
  },
];

/** Enforces unique content heads and locale-matched source paths. */
const validateMaterialEntries = Effect.fn(
  "AksaraCorpus.validateMaterialEntries"
)(function* (entries: readonly MaterialEntry[]) {
  const identities = new Set<string>();
  for (const entry of entries) {
    if (!entry.sourcePath.endsWith(`/${entry.route.locale}.mdx`)) {
      return yield* new MaterialPathError({
        locale: entry.route.locale,
        sourcePath: entry.sourcePath,
      });
    }
    const identity = headIdentity(entry.route);
    if (identities.has(identity)) {
      return yield* new MaterialIdentityError({
        contentKey: entry.route.contentKey,
        locale: entry.route.locale,
      });
    }
    identities.add(identity);
  }
  return [...entries].sort((left, right) =>
    compareContentHeads(left.route, right.route)
  );
});

/** Decodes and canonically orders one material source registry. */
export const decodeMaterialRegistry = Effect.fn(
  "AksaraCorpus.decodeMaterialRegistry"
)((input: unknown = materialEntries) =>
  Schema.decodeUnknown(Schema.Array(MaterialEntrySchema))(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialRegistryError({
          cause,
          message: "Material registry decoding failed.",
        })
    ),
    Effect.flatMap(validateMaterialEntries)
  )
);
