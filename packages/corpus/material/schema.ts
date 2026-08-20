import { MaterialDomainSchema } from "@nakafa/aksara-contracts/material/domain";
import { MaterialKeySchema } from "@nakafa/aksara-contracts/projection/material";
import {
  isLowerKebab,
  isLowerKebabPath,
} from "@nakafa/aksara-contracts/text/syntax";
import { Effect, Schema } from "effect";
import { EmbeddedAppLocaleCodeSchema } from "#corpus/locale/source";
import { MaterialCardDescriptionSchema } from "#corpus/material/description";
import { PublicRouteSlugMapSchema } from "#corpus/route/schema";

const MaterialSlugSchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isLowerKebab, {
      description: "Lowercase kebab-case material segment.",
      identifier: "MaterialSlug",
      message: "Invalid material slug.",
    })
  )
);

const MaterialRouteSchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isLowerKebabPath, {
      description: "Slash-separated material source path.",
      identifier: "MaterialRoute",
      message: "Invalid material source path.",
    })
  )
);

const LocalizedDescriptionSchema = Schema.Struct({
  description: MaterialCardDescriptionSchema,
  title: Schema.String,
});

const LocaleDescriptionMapSchema = Schema.Record(
  EmbeddedAppLocaleCodeSchema,
  LocalizedDescriptionSchema
);

/** One ordered localized lesson section in a material source. */
export const LessonMaterialSectionSchema = Schema.Struct({
  routeSlugs: PublicRouteSlugMapSchema,
  slug: MaterialSlugSchema,
});
export type LessonMaterialSection = typeof LessonMaterialSectionSchema.Type;

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
  return yield* Schema.decodeEffect(LessonMaterialSourceSchema)(input, {
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
