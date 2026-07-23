import {
  ContentLocaleSchema,
  compareContentHeads,
  headIdentity,
  routeIdentity,
} from "@nakafa/aksara-contracts/content";
import { ContentDeliveryClassSchema } from "@nakafa/aksara-contracts/delivery";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  MaterialLessonRouteSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";
import { encodeCorpusPath, LogicalCorpusSegmentSchema } from "#corpus/path";

const CorpusSegmentSchema = Schema.String.pipe(
  Schema.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)?$/u)
);
const LocalePathsSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: MaterialLessonRouteSchema.fields.publicPath,
});
const MaterialFamilySchema = Schema.Struct({
  delivery: ContentDeliveryClassSchema,
  identity: Schema.Struct({
    materialSlug: LogicalCorpusSegmentSchema,
    sectionKey: MaterialSectionSchema,
    subject: CorpusSegmentSchema,
  }),
  order: MaterialLessonRouteSchema.fields.order,
  publicPaths: LocalePathsSchema,
  rendererDomain: RendererDomainSchema,
});
type MaterialFamily = typeof MaterialFamilySchema.Type;

const MaterialEntrySchema = Schema.Struct({
  delivery: ContentDeliveryClassSchema,
  rendererDomain: RendererDomainSchema,
  route: MaterialLessonRouteSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type MaterialEntry = typeof MaterialEntrySchema.Type;

/** A source-controlled material registry failed strict decoding. */
export class MaterialRegistryError extends Schema.TaggedError<MaterialRegistryError>()(
  "MaterialRegistryError",
  { cause: Schema.Unknown, message: Schema.NonEmptyTrimmedString }
) {}

/** Two material families claim the same stable locale-specific content head. */
export class MaterialIdentityError extends Schema.TaggedError<MaterialIdentityError>()(
  "MaterialIdentityError",
  {
    contentKey: ContentKeySchema,
    locale: MaterialLessonRouteSchema.fields.locale,
  }
) {}

/** Two material families claim the same locale-specific public route. */
export class MaterialRouteError extends Schema.TaggedError<MaterialRouteError>()(
  "MaterialRouteError",
  {
    locale: MaterialLessonRouteSchema.fields.locale,
    publicPath: PublicPathSchema,
  }
) {}

const materialFamilies: readonly unknown[] = [
  {
    delivery: "public",
    identity: {
      materialSlug: "structure-matter",
      sectionKey: "atom-shell",
      subject: "chemistry",
    },
    order: 2,
    publicPaths: {
      en: "subjects/chemistry/structure-matter/atom-shell",
      id: "materi/kimia/struktur-atom/kulit-atom",
    },
    rendererDomain: "chemistry",
  },
  {
    delivery: "public",
    identity: {
      materialSlug: "function-composition-inverse-function",
      sectionKey: "function-concept",
      subject: "mathematics",
    },
    order: 5,
    publicPaths: {
      en: "subjects/mathematics/function-composition-inverse-function/function-concept",
      id: "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
    },
    rendererDomain: "mathematics",
  },
];

/** Expands one shared family identity into canonical locale-owned entries. */
function expandFamily(family: MaterialFamily) {
  const { materialSlug, sectionKey, subject } = family.identity;
  const materialKey = `lesson.${subject}.${materialSlug}`;
  const contentKey = `material/lesson/${subject}/${materialSlug}/${sectionKey}`;
  const sourceRoot = [
    "packages/corpus/material/lesson",
    subject,
    ...encodeCorpusPath(materialSlug),
    sectionKey,
  ].join("/");

  return ContentLocaleSchema.literals.map((locale) => ({
    delivery: family.delivery,
    rendererDomain: family.rendererDomain,
    route: {
      contentKey,
      locale,
      materialKey,
      order: family.order,
      publicPath: family.publicPaths[locale],
      sectionKey,
    },
    sourcePath: `${sourceRoot}/${locale}.mdx`,
  }));
}

/** Enforces unique content heads and public routes after family expansion. */
const validateEntries = Effect.fn("AksaraCorpus.validateMaterialEntries")(
  function* (entries: readonly MaterialEntry[]) {
    const heads = new Set<string>();
    const routes = new Set<string>();
    for (const entry of entries) {
      const head = headIdentity(entry.route);
      if (heads.has(head)) {
        return yield* new MaterialIdentityError({
          contentKey: entry.route.contentKey,
          locale: entry.route.locale,
        });
      }
      heads.add(head);

      const route = routeIdentity(entry.route);
      if (routes.has(route)) {
        return yield* new MaterialRouteError({
          locale: entry.route.locale,
          publicPath: entry.route.publicPath,
        });
      }
      routes.add(route);
    }
    return [...entries].sort((left, right) =>
      compareContentHeads(left.route, right.route)
    );
  }
);

/** Decodes family-owned sources and returns canonical locale-specific entries. */
export const decodeMaterialRegistry = Effect.fn(
  "AksaraCorpus.decodeMaterialRegistry"
)(function* (input: unknown = materialFamilies) {
  const families = yield* Schema.decodeUnknown(
    Schema.Array(MaterialFamilySchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialRegistryError({
          cause,
          message: "Material family registry decoding failed.",
        })
    )
  );
  const entries = yield* Schema.decodeUnknown(
    Schema.Array(MaterialEntrySchema)
  )(families.flatMap(expandFamily), { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialRegistryError({
          cause,
          message: "Expanded material registry decoding failed.",
        })
    )
  );
  return yield* validateEntries(entries);
});
