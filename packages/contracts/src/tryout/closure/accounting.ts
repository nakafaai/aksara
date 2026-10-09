import {
  Array as Arr,
  Effect,
  MutableHashMap,
  MutableHashSet,
  Option,
  Schema,
} from "effect";

import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";
import { encodeJsonText } from "#contracts/text/json";

/** The app locales seen for each logical row identity. */
type LocalesByIdentity = MutableHashMap.MutableHashMap<
  string,
  MutableHashSet.MutableHashSet<AppLocale>
>;

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
  locales: MutableHashSet.MutableHashSet<AppLocale>,
  activeAppLocales: ActiveAppLocaleList
) {
  return encodeJsonText(
    Arr.filter(activeAppLocales, (locale) =>
      MutableHashSet.has(locales, locale)
    )
  );
}

/** Adds one active locale to a logical identity without duplicates. */
export function addLocale(
  localesByIdentity: LocalesByIdentity,
  activeAppLocales: ActiveAppLocaleList,
  identity: string,
  appLocale: AppLocale
) {
  if (!Arr.contains(activeAppLocales, appLocale)) {
    return Effect.fail(
      new TryoutClosureError({
        actual: appLocale,
        code: "inactive-locale",
        expected: encodeJsonText(activeAppLocales),
        identity,
      })
    );
  }
  const locales =
    Option.getOrUndefined(MutableHashMap.get(localesByIdentity, identity)) ??
    MutableHashSet.empty<AppLocale>();
  if (MutableHashSet.has(locales, appLocale)) {
    return Effect.fail(
      new TryoutClosureError({
        actual: appLocale,
        code: "duplicate-locale",
        expected: "one row per active app locale",
        identity,
      })
    );
  }
  MutableHashSet.add(locales, appLocale);
  MutableHashMap.set(localesByIdentity, identity, locales);
  return Effect.void;
}

/** Confirms every logical row closes over the exact active locale list. */
export function validateLocales(
  localesByIdentity: LocalesByIdentity,
  activeAppLocales: ActiveAppLocaleList
) {
  if (MutableHashMap.size(localesByIdentity) === 0) {
    return Effect.fail(
      new TryoutClosureError({
        actual: "[]",
        code: "missing-locale",
        expected: encodeJsonText(activeAppLocales),
        identity: "empty",
      })
    );
  }
  return Effect.forEach(
    localesByIdentity,
    ([identity, locales]) => {
      const actual = localeSetIdentity(locales, activeAppLocales);
      const expected = encodeJsonText(activeAppLocales);
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
