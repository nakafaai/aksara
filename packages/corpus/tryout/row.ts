import {
  type LearningGraphSegments,
  makeLearningGraphIdentity,
} from "@nakafa/aksara-contracts/graph/identity";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { Array as Arr } from "effect";

/** Includes a localized description only when the source authored it. */
export function localizedFields(input: {
  readonly description: string | undefined;
  readonly appLocale: AppLocale;
  readonly sourceRevision: string;
  readonly title: string;
}) {
  return {
    ...(input.description === undefined
      ? {}
      : { description: input.description }),
    appLocale: input.appLocale,
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
