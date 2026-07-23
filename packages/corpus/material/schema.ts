import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { Effect, Schema } from "effect";

import { MaterialCardDescriptionSchema } from "#corpus/material/description";
import { MaterialDomainSchema } from "#corpus/material/domain";
import { PublicRouteSlugMapSchema } from "#corpus/route/schema";

const MATERIAL_KEY_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/u;
const MATERIAL_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const MATERIAL_ROUTE_PATTERN =
  /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/u;

/** Stable lesson material key shared by curriculum references. */
export const MaterialKeySchema = Schema.String.pipe(
  Schema.pattern(MATERIAL_KEY_PATTERN, {
    description: "Stable lowercase material key with dot or kebab separators.",
    identifier: "MaterialKey",
    message: () => "Invalid material key.",
  })
);
export type MaterialKey = typeof MaterialKeySchema.Type;

const MaterialSlugSchema = Schema.String.pipe(
  Schema.pattern(MATERIAL_SLUG_PATTERN, {
    description: "Lowercase kebab-case material segment.",
    identifier: "MaterialSlug",
    message: () => "Invalid material slug.",
  })
);

const MaterialRouteSchema = Schema.String.pipe(
  Schema.pattern(MATERIAL_ROUTE_PATTERN, {
    description: "Slash-separated material source path.",
    identifier: "MaterialRoute",
    message: () => "Invalid material source path.",
  })
);

const LocalizedTitleSchema = Schema.Struct({
  title: Schema.String,
});

const LocalizedDescriptionSchema = Schema.Struct({
  description: MaterialCardDescriptionSchema,
  title: Schema.String,
});

const LocaleTitleMapSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: LocalizedTitleSchema,
});

const LocaleDescriptionMapSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: LocalizedDescriptionSchema,
});

/** One ordered localized lesson section in a material source. */
export const LessonMaterialSectionSchema = Schema.Struct({
  routeSlugs: PublicRouteSlugMapSchema,
  slug: MaterialSlugSchema,
  translations: LocaleTitleMapSchema,
});

/** Complete authoring contract for one imported lesson material. */
export const LessonMaterialSourceSchema = Schema.Struct({
  assetRoot: MaterialRouteSchema,
  domain: MaterialDomainSchema,
  key: MaterialKeySchema,
  kind: Schema.Literal("lesson"),
  routeSlugs: PublicRouteSlugMapSchema,
  sections: Schema.Array(LessonMaterialSectionSchema),
  slug: MaterialSlugSchema,
  translations: LocaleDescriptionMapSchema,
});
export type LessonMaterialSource = typeof LessonMaterialSourceSchema.Type;
export type LessonMaterialSourceInput =
  typeof LessonMaterialSourceSchema.Encoded;

/** One authored lesson material failed strict source decoding. */
export class LessonMaterialError extends Schema.TaggedError<LessonMaterialError>()(
  "LessonMaterialError",
  {
    cause: Schema.Unknown,
    materialKey: Schema.String,
  }
) {}

/** Lazily decodes one authored lesson material at its source-module seam. */
export const defineLessonMaterial = Effect.fn(
  "AksaraCorpus.defineLessonMaterial"
)(function* (input: LessonMaterialSourceInput) {
  return yield* Schema.decodeUnknown(LessonMaterialSourceSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new LessonMaterialError({
          cause,
          materialKey: input.key,
        })
    )
  );
});
