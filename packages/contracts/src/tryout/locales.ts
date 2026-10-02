import { Effect, Schema } from "effect";

import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";

/** A try-out snapshot is incomplete or inconsistent across app locales. */
export class TryoutClosureError extends Schema.TaggedError<TryoutClosureError>()(
  "TryoutClosureError",
  {
    actual: Schema.String,
    code: Schema.Literals([
      "assessed-language",
      "duplicate-locale",
      "fact-mismatch",
      "inactive-locale",
      "missing-locale",
      "missing-section",
      "question-count",
    ]),
    expected: Schema.String,
    identity: Schema.String,
  }
) {}

/** Serializes locale sets through the active list's signed canonical order. */
function localeSetIdentity(
  locales: ReadonlySet<AppLocale>,
  activeAppLocales: ActiveAppLocaleList
) {
  return JSON.stringify(
    activeAppLocales.filter((locale) => locales.has(locale))
  );
}

/** Adds one active locale to a logical identity without duplicates. */
export function addLocale(
  localesByIdentity: Map<string, Set<AppLocale>>,
  activeAppLocales: ActiveAppLocaleList,
  identity: string,
  appLocale: AppLocale
) {
  if (!activeAppLocales.includes(appLocale)) {
    return Effect.fail(
      new TryoutClosureError({
        actual: appLocale,
        code: "inactive-locale",
        expected: JSON.stringify(activeAppLocales),
        identity,
      })
    );
  }
  const locales = localesByIdentity.get(identity) ?? new Set<AppLocale>();
  if (locales.has(appLocale)) {
    return Effect.fail(
      new TryoutClosureError({
        actual: appLocale,
        code: "duplicate-locale",
        expected: "one row per active app locale",
        identity,
      })
    );
  }
  locales.add(appLocale);
  localesByIdentity.set(identity, locales);
  return Effect.void;
}

/** Confirms every logical row closes over the exact active locale list. */
export function validateLocales(
  localesByIdentity: Map<string, Set<AppLocale>>,
  activeAppLocales: ActiveAppLocaleList
) {
  if (localesByIdentity.size === 0) {
    return Effect.fail(
      new TryoutClosureError({
        actual: "[]",
        code: "missing-locale",
        expected: JSON.stringify(activeAppLocales),
        identity: "empty",
      })
    );
  }
  return Effect.forEach(
    localesByIdentity,
    ([identity, locales]) => {
      const actual = localeSetIdentity(locales, activeAppLocales);
      const expected = JSON.stringify(activeAppLocales);
      if (actual === expected) {
        return Effect.void;
      }
      return Effect.fail(
        new TryoutClosureError({
          actual,
          code: "missing-locale",
          expected,
          identity,
        })
      );
    },
    { discard: true }
  );
}
