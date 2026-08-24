import { Schema } from "effect";
import { ContentAuthorSchema } from "#contracts/content";
import { withPublicationDates } from "#contracts/date";
import {
  canonicalizeLearningGraphIdentity,
  type LearningGraphIdentity,
  LearningGraphIdentitySchema,
} from "#contracts/graph/spec";
import { ContentKeySchema, PublicPathSchema } from "#contracts/ids";
import {
  type AppLocale,
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "#contracts/locale";
import { withProjectionDates } from "#contracts/projection/date";

const MATERIAL_KEY_PATTERN =
  /^lesson\.[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const SECTION_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const MaterialPublicPathSchema = PublicPathSchema.pipe(
  Schema.check(
    Schema.makeFilter((value) => value.includes("/"), {
      message: "Expected a material lesson path with a parent route.",
    })
  )
);

/** Locale-owned root namespace for public material routes. */
export const MaterialPublicNamespaceSchema = Schema.Literals([
  "subjects",
  "materi",
  "faecher",
]);
export type MaterialPublicNamespace = typeof MaterialPublicNamespaceSchema.Type;

/** Resolves the only public material namespace owned by one app locale. */
export function materialPublicNamespace(
  appLocale: AppLocale
): MaterialPublicNamespace {
  if (appLocale === AppLocaleSchema.make("en")) {
    return "subjects";
  }
  if (appLocale === AppLocaleSchema.make("id")) {
    return "materi";
  }
  return "faecher";
}

/** Stable reusable material identity preserved from Nakafa's source registry. */
export const MaterialKeySchema = Schema.String.pipe(
  Schema.check(
    Schema.isPattern(MATERIAL_KEY_PATTERN, {
      description: "Stable lesson key with domain and material segments.",
      identifier: "MaterialKey",
      message: "Invalid material key.",
    })
  ),
  Schema.brand("@NakafaAI/AksaraMaterialKey")
);
export type MaterialKey = typeof MaterialKeySchema.Type;

/** Stable lesson-section identity preserved across localized public routes. */
export const MaterialSectionSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(SECTION_KEY_PATTERN)),
  Schema.brand("@NakafaAI/AksaraMaterialSection")
);
export type MaterialSection = typeof MaterialSectionSchema.Type;

const MaterialMetadataFields = {
  authors: Schema.Array(ContentAuthorSchema),
  description: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  title: Schema.String,
};

/** Exact metadata contract required from newly authored material sources. */
export const MaterialMetadataSchema = withPublicationDates(
  MaterialMetadataFields
);
export type MaterialMetadata = typeof MaterialMetadataSchema.Type;

const MaterialProjectionMetadataSchema = withProjectionDates(
  MaterialMetadataFields
);

/** Stable route fields shared by material routes and published projections. */
const MaterialLessonRouteFields = {
  appLocale: AppLocaleSchema,
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
  graph: LearningGraphIdentitySchema,
  materialKey: MaterialKeySchema,
  order: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  publicPath: MaterialPublicPathSchema,
  sectionKey: MaterialSectionSchema,
};

/** Fields shared by the filtered material projection contract. */
const MaterialLessonProjectionFields = {
  ...MaterialLessonRouteFields,
  kind: Schema.Literal("subject-lesson"),
  metadata: MaterialProjectionMetadataSchema,
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

/** Checks signed graph identities against stable material source keys. */
function hasCoherentMaterialGraph(input: {
  readonly graph: LearningGraphIdentity;
  readonly appLocale: typeof AppLocaleSchema.Type;
  readonly materialKey: string;
  readonly sectionKey: string;
}) {
  const identity = input.materialKey.slice("lesson.".length);
  const separator = identity.indexOf(".");
  const domain = identity.slice(0, separator);
  const topic = identity.slice(separator + 1);
  const lens = `material:lesson:${domain}`;
  const object = `material-section:${domain}:${topic}:${input.sectionKey}`;
  return (
    input.graph.alignmentId === `alignment:${lens}:${object}` &&
    input.graph.assetId === `asset:${input.appLocale}:${lens}:${object}` &&
    input.graph.conceptId === `concept:${lens}:${topic}` &&
    input.graph.learningObjectId === `lo:${object}` &&
    input.graph.lensId === `lens:${lens}`
  );
}

/** Public material bodies use the same locale for routes and artifacts. */
function hasCoherentMaterialLocales(input: {
  readonly appLocale: string;
  readonly artifactLocale: string;
}) {
  return input.appLocale === input.artifactLocale;
}

/** Checks one signed material route against its locale-owned namespace. */
function hasCoherentMaterialNamespace(input: {
  readonly appLocale: AppLocale;
  readonly publicPath: string;
}) {
  return input.publicPath.startsWith(
    `${materialPublicNamespace(input.appLocale)}/`
  );
}

/** Non-authored material route fields preserved from Nakafa's registry. */
export const MaterialLessonRouteSchema = Schema.Struct({
  ...MaterialLessonRouteFields,
  topicTitle: Schema.String,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentMaterialLocales, {
      message: "Expected public material route and artifact locales to match.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentMaterialNamespace, {
      message:
        "Expected the material public path to use its locale-owned namespace.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentMaterialGraph, {
      message:
        "Expected material graph identities to match its stable source keys.",
    })
  )
);
export type MaterialLessonRoute = typeof MaterialLessonRouteSchema.Type;

/** Canonical route read model for one published material lesson body. */
export const MaterialLessonProjectionSchema = Schema.Struct({
  ...MaterialLessonProjectionFields,
  topicTitle: Schema.String,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentMaterialLocales, {
      message: "Expected public material route and artifact locales to match.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentParentPath, {
      message:
        "Expected the material parent path to match the lesson public path.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentMaterialNamespace, {
      message:
        "Expected the material public path to use its locale-owned namespace.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentMaterialGraph, {
      message:
        "Expected material graph identities to match its stable source keys.",
    })
  )
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
  const dates =
    "date" in projection.metadata
      ? { date: projection.metadata.date }
      : {
          ...(projection.metadata.dateModified === undefined
            ? {}
            : { dateModified: projection.metadata.dateModified }),
          datePublished: projection.metadata.datePublished,
        };
  const metadata = {
    authors: projection.metadata.authors.map(({ name }) => ({ name })),
    ...dates,
    ...(projection.metadata.description === undefined
      ? {}
      : { description: projection.metadata.description }),
    ...(projection.metadata.subject === undefined
      ? {}
      : { subject: projection.metadata.subject }),
    title: projection.metadata.title,
  };
  return JSON.stringify({
    appLocale: projection.appLocale,
    artifactLocale: projection.artifactLocale,
    contentKey: projection.contentKey,
    graph: canonicalizeLearningGraphIdentity(projection.graph),
    kind: projection.kind,
    materialKey: projection.materialKey,
    metadata,
    order: projection.order,
    parentPath: projection.parentPath,
    publicPath: projection.publicPath,
    sectionKey: projection.sectionKey,
    sitemap: projection.sitemap,
    topicTitle: projection.topicTitle,
  });
}
