import { MaterialDomainSchema } from "@nakafa/aksara-contracts/material/domain";
import { MaterialKeySchema } from "@nakafa/aksara-contracts/projection/material";
import {
  isHttpsUrl,
  isLowerKebab,
  isLowerKebabPath,
} from "@nakafa/aksara-contracts/text/syntax";
import { HashSet, Schema } from "effect";
import { localizedSourceMapSchema } from "#corpus/locale/source";
import { MaterialCardDescriptionSchema } from "#corpus/material/description";
import { PublicRouteSegmentSchema } from "#corpus/route/schema";

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

const LocaleDescriptionMapSchema = localizedSourceMapSchema(
  LocalizedDescriptionSchema
);

const LessonEvidenceUrlSchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isHttpsUrl, {
      description:
        "HTTPS claim-matched evidence URL reviewed for one lesson section.",
      identifier: "LessonEvidenceUrl",
      message: "Invalid lesson evidence URL.",
    })
  )
);

const LessonEvidenceUrlsSchema = Schema.NonEmptyArray(
  LessonEvidenceUrlSchema
).pipe(
  Schema.check(
    Schema.makeFilter(
      (urls) => HashSet.size(HashSet.fromIterable(urls)) === urls.length,
      {
        description: "Unique evidence URLs reviewed for one lesson section.",
        identifier: "LessonEvidenceUrls",
        message: "Duplicate lesson evidence URL.",
      }
    )
  )
);

/** What one section's `section.ts` authors: its evidence and its localized routes. */
export const LessonSectionModuleSchema = Schema.Struct({
  evidenceUrls: Schema.optionalKey(LessonEvidenceUrlsSchema),
  routeSlugs: localizedSourceMapSchema(PublicRouteSegmentSchema),
});
/** The authored form of one section, which each section's `section.ts` declares. */
export type LessonSection = typeof LessonSectionModuleSchema.Encoded;

/** One ordered localized lesson section in a material source: its module and its folder name. */
const LessonMaterialSectionSchema = Schema.Struct({
  ...LessonSectionModuleSchema.fields,
  slug: MaterialSlugSchema,
});
export type LessonMaterialSection = typeof LessonMaterialSectionSchema.Type;

/** Complete authoring contract for one imported lesson material. */
export const LessonMaterialSourceSchema = Schema.Struct({
  assetRoot: MaterialRouteSchema,
  domain: MaterialDomainSchema,
  key: MaterialKeySchema,
  kind: Schema.Literal("lesson"),
  routeSlugs: localizedSourceMapSchema(PublicRouteSegmentSchema),
  sections: Schema.Array(LessonMaterialSectionSchema),
  slug: MaterialSlugSchema,
  translations: LocaleDescriptionMapSchema,
});
export type LessonMaterialSource = typeof LessonMaterialSourceSchema.Type;

/**
 * What one lesson's `source.ts` authors: everything but the sections' own
 * routes and evidence, which sit in each section's `section.ts`, and the order
 * of its section folders.
 */
export const LessonModuleSchema = Schema.Struct({
  ...LessonMaterialSourceSchema.fields,
  sections: Schema.Array(MaterialSlugSchema),
});
/** The authored form of one lesson, which each lesson's `source.ts` declares. */
export type LessonModule = typeof LessonModuleSchema.Encoded;
