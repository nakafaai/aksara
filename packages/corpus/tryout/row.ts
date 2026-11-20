import type { LearningGraphSegments } from "@nakafa/aksara-contracts/graph/identity";
import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import type {
  ActiveAppLocale,
  AppLocale,
} from "@nakafa/aksara-contracts/locale";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Array as Arr } from "effect";

/**
 * The locales a catalog node is served in: every active locale that one of
 * the nodes beneath it is served in, in canonical order.
 */
export function servedLocales(
  beneath: readonly (readonly ActiveAppLocale[])[]
): readonly ActiveAppLocale[] {
  return Arr.filter(ACTIVE_APP_LOCALES, (appLocale) =>
    Arr.some(beneath, (locales) => Arr.contains(locales, appLocale))
  );
}

/** Includes a localized description only when the source authored it. */
export function localizedFields(input: {
  readonly description: string | undefined;
  readonly appLocale: AppLocale;
  readonly appLocales: readonly ActiveAppLocale[];
  readonly sourceRevision: string;
  readonly title: string;
}) {
  return {
    ...(input.description === undefined
      ? {}
      : { description: input.description }),
    appLocale: input.appLocale,
    appLocales: input.appLocales,
    sourceRevision: input.sourceRevision,
    title: input.title,
  };
}

/** Joins canonical route segments without locale or leading slash. */
export function publicPath(...segments: readonly string[]) {
  return Arr.join(segments, "/");
}

/** Derives a signed graph identity from stable source keys, never route slugs. */
export function graphIdentity(
  appLocale: AppLocale,
  concept: LearningGraphSegments["concept"],
  learningObject: LearningGraphSegments["learningObject"],
  lens: LearningGraphSegments["lens"]
) {
  return makeLearningGraphIdentity({
    appLocale,
    concept,
    learningObject,
    lens,
  });
}
