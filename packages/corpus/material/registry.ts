import {
  ContentLocaleSchema,
  compareContentHeads,
  headIdentity,
  routeIdentity,
} from "@nakafa/aksara-contracts/content";
import { ContentDeliveryClassSchema } from "@nakafa/aksara-contracts/delivery";
import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import { MaterialLessonRouteSchema } from "@nakafa/aksara-contracts/projection/material";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

import type { LessonMaterialSource } from "#corpus/material/schema";
import {
  LessonMaterialSourceSchema,
  MaterialKeySchema,
} from "#corpus/material/schema";
import { decodeMaterialSources } from "#corpus/material/source";

const routeNamespaces = {
  en: "subjects",
  id: "materi",
};

const domainRouteSlugs = {
  "ai-ds": { en: "ai-ds", id: "ai-ds" },
  biology: { en: "biology", id: "biologi" },
  chemistry: { en: "chemistry", id: "kimia" },
  mathematics: { en: "mathematics", id: "matematika" },
  physics: { en: "physics", id: "fisika" },
};

const MaterialEntrySchema = Schema.Struct({
  delivery: ContentDeliveryClassSchema,
  rendererDomain: RendererDomainSchema,
  route: MaterialLessonRouteSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type MaterialEntry = typeof MaterialEntrySchema.Type;

/** A decoded material source catalog repeats one stable material key. */
export class MaterialKeyError extends Schema.TaggedError<MaterialKeyError>()(
  "MaterialKeyError",
  { materialKey: MaterialKeySchema }
) {}

/** A decoded material source catalog repeats one authored asset root. */
export class MaterialRootError extends Schema.TaggedError<MaterialRootError>()(
  "MaterialRootError",
  { assetRoot: LessonMaterialSourceSchema.fields.assetRoot }
) {}

/** A projected material registry failed strict entry decoding. */
export class MaterialRegistryError extends Schema.TaggedError<MaterialRegistryError>()(
  "MaterialRegistryError",
  { cause: Schema.Unknown }
) {}

/** Two lesson bodies claim the same stable locale-specific content head. */
export class MaterialIdentityError extends Schema.TaggedError<MaterialIdentityError>()(
  "MaterialIdentityError",
  {
    contentKey: ContentKeySchema,
    locale: MaterialLessonRouteSchema.fields.locale,
  }
) {}

/** Two lesson bodies claim the same locale-specific public route. */
export class MaterialRouteError extends Schema.TaggedError<MaterialRouteError>()(
  "MaterialRouteError",
  {
    locale: MaterialLessonRouteSchema.fields.locale,
    publicPath: PublicPathSchema,
  }
) {}

/** Expands one decoded material source into its locale-specific lesson bodies. */
const expandMaterial = Effect.fn("AksaraCorpus.expandMaterial")(function* (
  source: LessonMaterialSource
) {
  const sections = yield* Effect.forEach(
    source.sections,
    (section, sectionIndex) =>
      Effect.forEach(ContentLocaleSchema.literals, (locale) =>
        Effect.gen(function* () {
          const contentKey = `${source.assetRoot}/${section.slug}`;
          const publicPath = [
            routeNamespaces[locale],
            domainRouteSlugs[source.domain][locale],
            source.routeSlugs[locale],
            section.routeSlugs[locale],
          ].join("/");
          const graph = yield* makeLearningGraphIdentity({
            concept: ["material", "lesson", source.domain, source.slug],
            learningObject: [
              "material-section",
              source.domain,
              source.slug,
              section.slug,
            ],
            lens: ["material", "lesson", source.domain],
            locale,
          });

          return {
            delivery: "public",
            rendererDomain: source.domain,
            route: {
              contentKey,
              graph,
              locale,
              materialKey: source.key,
              order: sectionIndex + 1,
              publicPath,
              sectionKey: section.slug,
            },
            sourcePath: `packages/corpus/${contentKey}/${locale}.mdx`,
          };
        })
      )
  );
  return sections.flat();
});

/** Rejects repeated source identities before projecting lesson bodies. */
const validateSources = Effect.fn("AksaraCorpus.validateMaterialSources")(
  function* (sources: readonly LessonMaterialSource[]) {
    const keys = new Set<string>();
    const roots = new Set<string>();

    for (const source of sources) {
      if (keys.has(source.key)) {
        return yield* new MaterialKeyError({ materialKey: source.key });
      }
      keys.add(source.key);

      if (roots.has(source.assetRoot)) {
        return yield* new MaterialRootError({ assetRoot: source.assetRoot });
      }
      roots.add(source.assetRoot);
    }

    return sources;
  }
);

/** Rejects duplicate content heads and public routes after source expansion. */
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

/** Returns every canonical locale-specific body from the real source catalog. */
export const decodeMaterialRegistry = Effect.fn(
  "AksaraCorpus.decodeMaterialRegistry"
)(function* (input?: unknown) {
  const sources = yield* decodeMaterialSources(input);
  yield* validateSources(sources);
  const expanded = yield* Effect.forEach(sources, expandMaterial);

  const entries = yield* Schema.decodeUnknown(
    Schema.Array(MaterialEntrySchema)
  )(expanded.flat(), { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialRegistryError({
          cause,
        })
    )
  );

  return yield* validateEntries(entries);
});
