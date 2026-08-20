import {
  APP_LOCALE_CODES,
  type AppLocale,
  type AppLocaleCode,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";

/** Runtime contract for one locale embedded in a multi-locale source module. */
export const EmbeddedAppLocaleCodeSchema = Schema.Literals(["en", "id"]);
export type EmbeddedAppLocaleCode = typeof EmbeddedAppLocaleCodeSchema.Type;

/** Base locales stored together in multi-locale source modules. */
export const EMBEDDED_APP_LOCALE_CODES = APP_LOCALE_CODES.filter(
  Schema.is(EmbeddedAppLocaleCodeSchema)
);

/** Locale stored in its own permanent overlay instead of an embedded map. */
export type LocaleOverlayAppLocaleCode = Exclude<
  AppLocaleCode,
  EmbeddedAppLocaleCode
>;

/** Canonical overlay locale order derived from the complete app-locale contract. */
export const LOCALE_OVERLAY_APP_LOCALE_CODES = APP_LOCALE_CODES.filter(
  (appLocale): appLocale is LocaleOverlayAppLocaleCode =>
    !Schema.is(EmbeddedAppLocaleCodeSchema)(appLocale)
);

/** Runtime contract for one locale stored in its own permanent overlay. */
export const LocaleOverlayAppLocaleCodeSchema = Schema.Literals(
  LOCALE_OVERLAY_APP_LOCALE_CODES
);

/** Branded application locale stored inside multi-locale source modules. */
export const EmbeddedAppLocaleSchema = AppLocaleSchema.pipe(
  Schema.check(
    Schema.makeFilter((appLocale) =>
      EMBEDDED_APP_LOCALE_CODES.some((candidate) => candidate === appLocale)
    )
  )
);

/** Branded application locale stored in one permanent overlay module. */
export const LocaleOverlayAppLocaleSchema = AppLocaleSchema.pipe(
  Schema.check(
    Schema.makeFilter((appLocale) =>
      LOCALE_OVERLAY_APP_LOCALE_CODES.some(
        (candidate) => candidate === appLocale
      )
    )
  )
);
export type LocaleOverlayAppLocale = typeof LocaleOverlayAppLocaleSchema.Type;

/** Canonical locale codes and branded values for permanent overlay modules. */
export const LOCALE_OVERLAY_APP_LOCALE_ENTRIES =
  LOCALE_OVERLAY_APP_LOCALE_CODES.map((code) => ({
    appLocale: AppLocaleSchema.make(code),
    code,
  }));

/** Source map owned entirely by one multi-locale source module. */
export type EmbeddedLocalizedSourceMap<Value> = Readonly<
  Record<EmbeddedAppLocaleCode, Value>
>;

/** Composed source map with embedded copy and present locale-owned overlays. */
export type LocalizedSourceMap<Value> = Readonly<
  EmbeddedLocalizedSourceMap<Value> &
    Partial<Record<LocaleOverlayAppLocaleCode, Value | undefined>>
>;

/** Builds one source map containing exactly the embedded source locales. */
export function embeddedLocalizedSourceMapSchema<
  Value extends Schema.Constraint,
>(value: Value) {
  return Schema.Record(EmbeddedAppLocaleCodeSchema, value);
}

/** Builds one composed map with required embedded copy and optional overlays. */
export function localizedSourceMapSchema<Value extends Schema.Constraint>(
  value: Value
) {
  return Schema.StructWithRest(embeddedLocalizedSourceMapSchema(value), [
    Schema.Record(LocaleOverlayAppLocaleCodeSchema, Schema.optional(value)),
  ]);
}

/** Returns the plain source-map key for one contract-supported app locale. */
export function appLocaleCode(appLocale: AppLocale): AppLocaleCode {
  return Schema.encodeSync(AppLocaleSchema)(appLocale);
}

/** Returns the permanent overlay key independently of activation state. */
export function localeOverlayAppLocaleCode(
  appLocale: AppLocale
): LocaleOverlayAppLocaleCode | undefined {
  const code = appLocaleCode(appLocale);
  return LOCALE_OVERLAY_APP_LOCALE_CODES.find(
    (candidate) => candidate === code
  );
}

/** Reads present source copy without applying a fallback language. */
export function sourceLocaleValue<Value>(
  source: LocalizedSourceMap<Value>,
  appLocale: AppLocale
) {
  return source[appLocaleCode(appLocale)];
}

/** Adds one reviewed locale overlay without mutating embedded source copy. */
export function addLocalizedSource<Value>(
  source: EmbeddedLocalizedSourceMap<Value> | LocalizedSourceMap<Value>,
  appLocale: typeof LocaleOverlayAppLocaleSchema.Type,
  value: Value
): LocalizedSourceMap<Value> {
  return { ...source, [appLocaleCode(appLocale)]: value };
}

/** Source copy required for an authoring or publication operation is absent. */
export class SourceLocaleUnavailableError extends Schema.TaggedError<SourceLocaleUnavailableError>()(
  "SourceLocaleUnavailableError",
  {
    appLocale: AppLocaleSchema,
    owner: Schema.Trimmed.check(Schema.isNonEmpty()),
  }
) {}

/** Resolves reviewed localized source copy without a fallback language. */
export const requireSourceLocale = Effect.fn(
  "AksaraCorpus.requireSourceLocale"
)(function* <Value>(
  source: LocalizedSourceMap<Value>,
  appLocale: AppLocale,
  owner: string
) {
  const value = sourceLocaleValue(source, appLocale);
  if (value === undefined) {
    return yield* new SourceLocaleUnavailableError({ appLocale, owner });
  }
  return value;
});

/** Maps every present localized value without manufacturing absent copy. */
export function mapLocalizedSource<Value, Result>(
  source: LocalizedSourceMap<Value>,
  transform: (value: Value, appLocale: AppLocaleCode) => Result
): LocalizedSourceMap<Result> {
  let mapped: LocalizedSourceMap<Result> = {
    en: transform(source.en, "en"),
    id: transform(source.id, "id"),
  };
  for (const { appLocale, code } of LOCALE_OVERLAY_APP_LOCALE_ENTRIES) {
    const value = source[code];
    if (value === undefined) {
      continue;
    }
    mapped = addLocalizedSource(mapped, appLocale, transform(value, code));
  }
  return mapped;
}

/** Traverses every present localized value through one named Effect. */
export const traverseLocalizedSources = Effect.fn(
  "AksaraCorpus.traverseLocalizedSources"
)(function* <Value, Result, Error, Requirements>(
  source: LocalizedSourceMap<Value>,
  transform: (
    value: Value,
    appLocale: AppLocaleCode
  ) => Effect.Effect<Result, Error, Requirements>
) {
  const [en, id] = yield* Effect.all(
    [transform(source.en, "en"), transform(source.id, "id")],
    { concurrency: 2 }
  );
  let traversed: LocalizedSourceMap<Result> = { en, id };
  for (const { appLocale, code } of LOCALE_OVERLAY_APP_LOCALE_ENTRIES) {
    const value = source[code];
    if (value === undefined) {
      continue;
    }
    const result = yield* transform(value, code);
    traversed = addLocalizedSource(traversed, appLocale, result);
  }
  return traversed;
});
