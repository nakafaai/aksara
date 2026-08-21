import {
  APP_LOCALE_CODES,
  type AppLocale,
  type AppLocaleCode,
  AppLocaleCodeSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";

/** Reviewed source copy keyed only by contract-supported application locales. */
export type LocalizedSourceMap<Value> = Readonly<
  Partial<Record<AppLocaleCode, Value | undefined>>
>;

/** Builds one partial source map for every contract-supported app locale. */
export function localizedSourceMapSchema<Value extends Schema.Constraint>(
  value: Value
) {
  return Schema.Record(AppLocaleCodeSchema, Schema.optional(value));
}

/** Returns the plain source-map key for one contract-supported app locale. */
export function appLocaleCode(appLocale: AppLocale): AppLocaleCode {
  return Schema.encodeSync(AppLocaleSchema)(appLocale);
}

/** Reads present source copy without applying a fallback language. */
export function sourceLocaleValue<Value>(
  source: LocalizedSourceMap<Value>,
  appLocale: AppLocale
) {
  return source[appLocaleCode(appLocale)];
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
  let mapped: LocalizedSourceMap<Result> = {};
  for (const code of APP_LOCALE_CODES) {
    const value = source[code];
    if (value === undefined) {
      continue;
    }
    mapped = { ...mapped, [code]: transform(value, code) };
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
  const present: { readonly code: AppLocaleCode; readonly value: Value }[] = [];
  for (const code of APP_LOCALE_CODES) {
    const value = source[code];
    if (value === undefined) {
      continue;
    }
    present.push({ code, value });
  }
  const entries = yield* Effect.forEach(
    present,
    ({ code, value }) =>
      transform(value, code).pipe(Effect.map((result) => ({ code, result }))),
    { concurrency: APP_LOCALE_CODES.length }
  );
  let traversed: LocalizedSourceMap<Result> = {};
  for (const entry of entries) {
    traversed = { ...traversed, [entry.code]: entry.result };
  }
  return traversed;
});
