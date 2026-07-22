import { Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content";
import { ContentKeySchema, PublicPathSchema } from "#contracts/ids";

const MATERIAL_KEY_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
const SECTION_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const MaterialPublicPathSchema = PublicPathSchema.pipe(
  Schema.filter((value) => value.includes("/"), {
    message: () => "Expected a material lesson path with a parent route.",
  })
);

/** Checks a source-authored date against the real ISO calendar. */
function isDateOnly(value: string) {
  if (!DATE_ONLY_PATTERN.test(value)) {
    return false;
  }
  const year = Number.parseInt(value.slice(0, 4), 10);
  const month = Number.parseInt(value.slice(5, 7), 10);
  const day = Number.parseInt(value.slice(8, 10), 10);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/** Stable reusable material identity preserved from Nakafa's source registry. */
export const MaterialKeySchema = Schema.String.pipe(
  Schema.pattern(MATERIAL_KEY_PATTERN),
  Schema.brand("@NakafaAI/AksaraMaterialKey")
);
export type MaterialKey = typeof MaterialKeySchema.Type;

/** Stable lesson-section identity preserved across localized public routes. */
export const MaterialSectionSchema = Schema.String.pipe(
  Schema.pattern(SECTION_KEY_PATTERN),
  Schema.brand("@NakafaAI/AksaraMaterialSection")
);
export type MaterialSection = typeof MaterialSectionSchema.Type;

/** Exact metadata contract consumed by Nakafa material lesson pages. */
export const MaterialMetadataSchema = Schema.Struct({
  authors: Schema.Array(Schema.Struct({ name: Schema.String })),
  date: Schema.String.pipe(Schema.filter(isDateOnly)),
  description: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  title: Schema.String,
});
export type MaterialMetadata = typeof MaterialMetadataSchema.Type;

/** Non-authored material route fields preserved from Nakafa's registry. */
export const MaterialLessonRouteSchema = Schema.Struct({
  contentKey: ContentKeySchema,
  locale: ContentLocaleSchema,
  materialKey: MaterialKeySchema,
  order: Schema.Number.pipe(Schema.int(), Schema.positive()),
  publicPath: MaterialPublicPathSchema,
  sectionKey: MaterialSectionSchema,
});
export type MaterialLessonRoute = typeof MaterialLessonRouteSchema.Type;

/** Fields shared by the filtered material projection wire contract. */
const MaterialLessonProjectionFields = {
  ...MaterialLessonRouteSchema.fields,
  kind: Schema.Literal("subject-lesson"),
  metadata: MaterialMetadataSchema,
  parentPath: PublicPathSchema,
  sitemap: Schema.Literal(true),
};

/** Returns the canonical parent route owned by one lesson public path. */
function materialParentPath(publicPath: string) {
  return publicPath.slice(0, publicPath.lastIndexOf("/"));
}

/** Checks that a projection cannot claim an unrelated material parent. */
function hasCoherentParentPath(input: {
  readonly parentPath: string;
  readonly publicPath: string;
}) {
  return input.parentPath === materialParentPath(input.publicPath);
}

/** Canonical route read model for one published material lesson body. */
export const MaterialLessonProjectionSchema = Schema.Struct(
  MaterialLessonProjectionFields
).pipe(
  Schema.filter(hasCoherentParentPath, {
    message: () =>
      "Expected the material parent path to match the lesson public path.",
  })
);
export type MaterialLessonProjection =
  typeof MaterialLessonProjectionSchema.Type;

/** Combines registry-owned routing with metadata decoded from authored MDX. */
export function makeMaterialLessonProjection(
  route: MaterialLessonRoute,
  metadata: MaterialMetadata
) {
  const parentPath = materialParentPath(route.publicPath);
  return MaterialLessonProjectionSchema.make({
    ...route,
    kind: "subject-lesson",
    metadata,
    parentPath: PublicPathSchema.make(parentPath),
    sitemap: true,
  });
}

/** Serializes one material projection with stable signed field order. */
export function canonicalizeMaterialProjection(
  projection: MaterialLessonProjection
) {
  return JSON.stringify({
    contentKey: projection.contentKey,
    kind: projection.kind,
    locale: projection.locale,
    materialKey: projection.materialKey,
    metadata: {
      authors: projection.metadata.authors.map(({ name }) => ({ name })),
      date: projection.metadata.date,
      ...(projection.metadata.description === undefined
        ? {}
        : { description: projection.metadata.description }),
      ...(projection.metadata.subject === undefined
        ? {}
        : { subject: projection.metadata.subject }),
      title: projection.metadata.title,
    },
    order: projection.order,
    parentPath: projection.parentPath,
    publicPath: projection.publicPath,
    sectionKey: projection.sectionKey,
    sitemap: projection.sitemap,
  });
}
