import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import type { TryoutPlacementSource } from "@nakafa/aksara-contracts/tryout/placement";
import {
  Array as Arr,
  Effect,
  MutableHashMap,
  MutableHashSet,
  Option,
} from "effect";
import { TryoutHeadMismatchError } from "#publisher/tryout/error";

/** Returns the logical question root shared by all body head identities. */
export function questionRoot(contentKey: string) {
  return contentKey.slice(0, contentKey.lastIndexOf("/"));
}

/** Rejects incomplete or repeated app-locale placements for one question root. */
export function validatePlacementPairs(
  placements: readonly TryoutPlacementSource[]
) {
  const localesByRoot = MutableHashMap.empty<
    string,
    MutableHashSet.MutableHashSet<string>
  >();
  for (const placement of placements) {
    const root = questionRoot(placement.questionContentKey);
    const locales =
      Option.getOrUndefined(MutableHashMap.get(localesByRoot, root)) ??
      MutableHashSet.empty<string>();
    if (MutableHashSet.has(locales, placement.appLocale)) {
      return Effect.fail(
        new TryoutHeadMismatchError({
          artifactLocale: placement.answerArtifactLocale,
          contentKey: placement.questionContentKey,
          field: "bodyPair",
        })
      );
    }
    MutableHashSet.add(locales, placement.appLocale);
    MutableHashMap.set(localesByRoot, root, locales);
  }
  for (const placement of placements) {
    const locales = Option.getOrUndefined(
      MutableHashMap.get(
        localesByRoot,
        questionRoot(placement.questionContentKey)
      )
    );
    if (
      locales === undefined ||
      MutableHashSet.size(locales) !== ACTIVE_APP_LOCALES.length ||
      Arr.some(
        ACTIVE_APP_LOCALES,
        (appLocale) => !MutableHashSet.has(locales, appLocale)
      )
    ) {
      return Effect.fail(
        new TryoutHeadMismatchError({
          artifactLocale: placement.answerArtifactLocale,
          contentKey: placement.questionContentKey,
          field: "bodyPair",
        })
      );
    }
  }
  return Effect.void;
}
