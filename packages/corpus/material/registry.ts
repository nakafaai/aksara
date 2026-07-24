import {
  ContentLocaleSchema,
  compareContentHeads,
  headIdentity,
  routeIdentity,
} from "@nakafa/aksara-contracts/content";
import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  MaterialKeySchema,
  MaterialLessonRouteSchema,
} from "@nakafa/aksara-contracts/projection/material";
import { Effect, Schema } from "effect";

import {
  decodeMaterialDomains,
  type MaterialDomainDescriptor,
  MaterialDomainDescriptorSchema,
  requireMaterialDomain,
} from "#corpus/material/domain";
import { materialLessonPath } from "#corpus/material/route";
import type { LessonMaterialSource } from "#corpus/material/schema";
import { LessonMaterialSourceSchema } from "#corpus/material/schema";
import { decodeMaterialSources } from "#corpus/material/source";

const MaterialEntrySchema = Schema.Struct({
  assetRoot: LessonMaterialSourceSchema.fields.assetRoot,
  delivery: Schema.Literal("public"),
  rendererDomain: MaterialDomainDescriptorSchema.fields.rendererDomain,
  route: MaterialLessonRouteSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type MaterialEntry = typeof MaterialEntrySchema.Type;

interface MaterialSourceBinding {
  readonly descriptor: MaterialDomainDescriptor;
  readonly source: LessonMaterialSource;
}

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
  binding: MaterialSourceBinding
) {
  const { descriptor, source } = binding;
  const sections = yield* Effect.forEach(
    source.sections,
    (section, sectionIndex) =>
      Effect.forEach(ContentLocaleSchema.literals, (locale) =>
        Effect.gen(function* () {
          const contentKey = `${source.assetRoot}/${section.slug}`;
          const publicPath = materialLessonPath(
            source,
            section,
            descriptor,
            locale
          );
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
            assetRoot: source.assetRoot,
            delivery: "public",
            rendererDomain: descriptor.rendererDomain,
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
  function* (
    sources: readonly LessonMaterialSource[],
    descriptors: readonly MaterialDomainDescriptor[]
  ) {
    const keys = new Set<string>();
    const roots = new Set<string>();
    const bindings: MaterialSourceBinding[] = [];

    for (const source of sources) {
      if (keys.has(source.key)) {
        return yield* new MaterialKeyError({ materialKey: source.key });
      }
      keys.add(source.key);

      if (roots.has(source.assetRoot)) {
        return yield* new MaterialRootError({ assetRoot: source.assetRoot });
      }
      roots.add(source.assetRoot);
      const descriptor = yield* requireMaterialDomain(
        descriptors,
        source.domain,
        source.key
      );
      bindings.push({ descriptor, source });
    }

    return bindings;
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
)(function* (
  input?: unknown,
  domainDescriptors?: readonly MaterialDomainDescriptor[]
) {
  const descriptors = domainDescriptors ?? (yield* decodeMaterialDomains());
  const sources = yield* decodeMaterialSources(input);
  const bindings = yield* validateSources(sources, descriptors);
  const expanded = yield* Effect.forEach(bindings, expandMaterial);

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
