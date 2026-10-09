import { headIdentity, routeIdentity } from "@nakafa/aksara-contracts/content";
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
import {
  Array as Arr,
  Effect,
  MutableHashSet,
  MutableList,
  Order,
  Schema,
} from "effect";
import {
  appLocaleCode,
  contentHeadOrder,
  requireSourceLocale,
} from "#corpus/locale/source";
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

/** One lesson source paired with the domain descriptor that owns its routes. */
const MaterialSourceBindingSchema = Schema.Struct({
  descriptor: MaterialDomainDescriptorSchema,
  source: LessonMaterialSourceSchema,
});
type MaterialSourceBinding = typeof MaterialSourceBindingSchema.Type;

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
  return Arr.flatten(sections);
});

/** Rejects repeated source identities before projecting lesson bodies. */
export const validateMaterialSources = Effect.fn(
  "AksaraCorpus.validateMaterialSources"
)(function* (
  sources: readonly LessonMaterialSource[],
  descriptors: readonly MaterialDomainDescriptor[]
) {
  const keys = MutableHashSet.empty<string>();
  const roots = MutableHashSet.empty<string>();
  const bindings = MutableList.make<MaterialSourceBinding>();

  for (const source of sources) {
    if (MutableHashSet.has(keys, source.key)) {
      return yield* new MaterialKeyError({ materialKey: source.key });
    }
    MutableHashSet.add(keys, source.key);

    if (MutableHashSet.has(roots, source.assetRoot)) {
      return yield* new MaterialRootError({ assetRoot: source.assetRoot });
    }
    MutableHashSet.add(roots, source.assetRoot);
    const descriptor = yield* requireMaterialDomain(
      descriptors,
      source.domain,
      source.key
    );
    MutableList.append(bindings, { descriptor, source });
  }

  return MutableList.toArray(bindings);
});

/** Rejects duplicate content heads and public routes after source expansion. */
export const validateMaterialEntries = Effect.fn(
  "AksaraCorpus.validateMaterialEntries"
)(function* (entries: readonly MaterialEntry[]) {
  const heads = MutableHashSet.empty<string>();
  const routes = MutableHashSet.empty<string>();

  for (const entry of entries) {
    const head = headIdentity(entry.route);
    if (MutableHashSet.has(heads, head)) {
      return yield* new MaterialIdentityError({
        artifactLocale: entry.route.artifactLocale,
        contentKey: entry.route.contentKey,
      });
    }
    MutableHashSet.add(heads, head);

    const route = routeIdentity(entry.route);
    if (MutableHashSet.has(routes, route)) {
      return yield* new MaterialRouteError({
        appLocale: entry.route.appLocale,
        publicPath: entry.route.publicPath,
      });
    }
    MutableHashSet.add(routes, route);
  }

  return Arr.sort(
    entries,
    Order.mapInput(contentHeadOrder, (entry: MaterialEntry) => entry.route)
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
  )(Arr.flatten(expanded), { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialRegistryError({
          cause,
        })
    )
  );

  return yield* validateMaterialEntries(entries);
});
