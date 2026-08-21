import {
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
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  type AppLocale,
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  MaterialKeySchema,
  MaterialLessonRouteSchema,
} from "@nakafa/aksara-contracts/projection/material";
import { Effect, Schema } from "effect";
import { appLocaleCode, requireSourceLocale } from "#corpus/locale/source";
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

export const MaterialEntrySchema = Schema.Struct({
  assetRoot: LessonMaterialSourceSchema.fields.assetRoot,
  delivery: Schema.Literal("public"),
  rendererDomain: MaterialDomainDescriptorSchema.fields.rendererDomain,
  route: MaterialLessonRouteSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type MaterialEntry = typeof MaterialEntrySchema.Type;

export interface MaterialSourceBinding {
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
    artifactLocale: ArtifactLocaleSchema,
    contentKey: ContentKeySchema,
  }
) {}

/** Two lesson bodies claim the same locale-specific public route. */
export class MaterialRouteError extends Schema.TaggedError<MaterialRouteError>()(
  "MaterialRouteError",
  {
    appLocale: AppLocaleSchema,
    publicPath: PublicPathSchema,
  }
) {}

/** Projects one decoded material section into one exact app locale. */
export const projectMaterial = Effect.fn("AksaraCorpus.projectMaterial")(
  function* (
    binding: MaterialSourceBinding,
    section: LessonMaterialSource["sections"][number],
    sectionIndex: number,
    appLocale: AppLocale
  ) {
    const { descriptor, source } = binding;
    const localeCode = appLocaleCode(appLocale);
    const owner = `${source.key}:${section.slug}:${localeCode}`;
    const [publicPath, translation] = yield* Effect.all(
      [
        materialLessonPath(source, section, descriptor, appLocale),
        requireSourceLocale(source.translations, appLocale, owner),
      ],
      { concurrency: 2 }
    );
    const contentKey = `${source.assetRoot}/${section.slug}`;
    const graph = yield* makeLearningGraphIdentity({
      appLocale,
      concept: ["material", "lesson", source.domain, source.slug],
      learningObject: [
        "material-section",
        source.domain,
        source.slug,
        section.slug,
      ],
      lens: ["material", "lesson", source.domain],
    });
    return {
      assetRoot: source.assetRoot,
      delivery: "public",
      rendererDomain: descriptor.rendererDomain,
      route: {
        appLocale,
        artifactLocale: appLocale,
        contentKey,
        graph,
        materialKey: source.key,
        order: sectionIndex + 1,
        publicPath,
        sectionKey: section.slug,
        topicTitle: translation.title,
      },
      sourcePath: `packages/corpus/${contentKey}/${localeCode}.mdx`,
    };
  }
);

/** Expands one decoded material source into active locale-specific bodies. */
const expandMaterial = Effect.fn("AksaraCorpus.expandMaterial")(function* (
  binding: MaterialSourceBinding,
  appLocales: ActiveAppLocaleList
) {
  const sections = yield* Effect.forEach(appLocales, (appLocale) =>
    Effect.forEach(binding.source.sections, (section, sectionIndex) =>
      projectMaterial(binding, section, sectionIndex, appLocale)
    )
  );
  return sections.flat();
});

/** Rejects repeated source identities before projecting lesson bodies. */
export const validateMaterialSources = Effect.fn(
  "AksaraCorpus.validateMaterialSources"
)(function* (
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
});

/** Rejects duplicate content heads and public routes after source expansion. */
export const validateMaterialEntries = Effect.fn(
  "AksaraCorpus.validateMaterialEntries"
)(function* (entries: readonly MaterialEntry[]) {
  const heads = new Set<string>();
  const routes = new Set<string>();

  for (const entry of entries) {
    const head = headIdentity(entry.route);
    if (heads.has(head)) {
      return yield* new MaterialIdentityError({
        artifactLocale: entry.route.artifactLocale,
        contentKey: entry.route.contentKey,
      });
    }
    heads.add(head);

    const route = routeIdentity(entry.route);
    if (routes.has(route)) {
      return yield* new MaterialRouteError({
        appLocale: entry.route.appLocale,
        publicPath: entry.route.publicPath,
      });
    }
    routes.add(route);
  }

  return [...entries].sort((left, right) =>
    compareContentHeads(left.route, right.route)
  );
});

/** Returns every canonical locale-specific body from the real source catalog. */
export const decodeMaterialRegistry = Effect.fn(
  "AksaraCorpus.decodeMaterialRegistry"
)(function* (
  input?: unknown,
  domainDescriptors?: readonly MaterialDomainDescriptor[],
  appLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  const descriptors = domainDescriptors ?? (yield* decodeMaterialDomains());
  const sources = yield* decodeMaterialSources(input);
  const bindings = yield* validateMaterialSources(sources, descriptors);
  const expanded = yield* Effect.forEach(bindings, (binding) =>
    expandMaterial(binding, appLocales)
  );

  const entries = yield* Schema.decodeUnknownEffect(
    Schema.Array(MaterialEntrySchema)
  )(expanded.flat(), { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialRegistryError({
          cause,
        })
    )
  );

  return yield* validateMaterialEntries(entries);
});
