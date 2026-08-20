import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  APP_LOCALE_CODES,
  type AppLocale,
  AppLocaleCodeSchema,
  AppLocaleSchema,
  type ArtifactLocale,
  ArtifactLocaleSchema,
  artifactLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";
import type { TryoutKey } from "@nakafa/aksara-contracts/tryout/key";
import { questionArtifactLocaleForSection } from "@nakafa/aksara-contracts/tryout/language";
import { Effect, Schema } from "effect";

import {
  EMBEDDED_APP_LOCALE_CODES,
  LOCALE_OVERLAY_APP_LOCALE_CODES,
  type LocaleOverlayAppLocaleCode,
} from "#corpus/locale/source";

/** Authored choices do not exactly match their locale-owned source file. */
export class QuestionChoiceLocaleError extends Schema.TaggedError<QuestionChoiceLocaleError>()(
  "QuestionChoiceLocaleError",
  {
    actualLocales: Schema.Array(AppLocaleCodeSchema),
    expectedLocales: Schema.Array(ArtifactLocaleSchema),
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Returns unique choice locales produced by one application-locale set. */
function choiceLocales(
  sectionKey: TryoutKey,
  appLocales: readonly AppLocale[]
) {
  return [
    ...new Set(
      appLocales.map((appLocale) =>
        questionArtifactLocaleForSection(sectionKey, appLocale)
      )
    ),
  ];
}

/** Choice locales stored together in the base `choices.ts` source. */
export function embeddedQuestionChoiceLocales(sectionKey: TryoutKey) {
  return choiceLocales(
    sectionKey,
    EMBEDDED_APP_LOCALE_CODES.map((code) => AppLocaleSchema.make(code))
  );
}

/** Choice overlays required by one authoring or publication locale set. */
export function questionChoiceOverlayLocales(
  sectionKey: TryoutKey,
  appLocales: readonly AppLocale[]
) {
  return choiceLocales(sectionKey, appLocales).flatMap((artifactLocale) => {
    const code = artifactLocaleCode(artifactLocale);
    const overlay = LOCALE_OVERLAY_APP_LOCALE_CODES.find(
      (candidate) => candidate === code
    );
    return overlay === undefined ? [] : [overlay];
  });
}

/** Exact base and overlay choice files for one locale policy. */
export function questionChoiceSourceFiles(
  sectionKey: TryoutKey,
  appLocales: readonly AppLocale[]
): readonly [string, ...string[]] {
  return [
    "choices.ts",
    ...questionChoiceOverlayLocales(sectionKey, appLocales).map(
      (artifactLocale) => `choices.${artifactLocale}.ts`
    ),
  ];
}

/** Parses one known permanent choice-overlay filename. */
export function questionChoiceOverlayLocale(file: string) {
  return LOCALE_OVERLAY_APP_LOCALE_CODES.find(
    (appLocale) => file === `choices.${appLocale}.ts`
  );
}

/** Returns canonical locale keys present in one decoded choice map. */
function actualChoiceLocales(choices: QuestionChoices) {
  return APP_LOCALE_CODES.filter(
    (appLocale) => choices[appLocale] !== undefined
  );
}

/** Requires exact locale closure for one base or overlay choices source. */
export const validateQuestionChoiceLocales = Effect.fn(
  "AksaraCorpus.validateQuestionChoiceLocales"
)(function* (
  choices: QuestionChoices,
  expectedLocales: readonly ArtifactLocale[],
  sourcePath: typeof CorpusSourcePathSchema.Type
) {
  const actualLocales = actualChoiceLocales(choices);
  const matches =
    actualLocales.length === expectedLocales.length &&
    expectedLocales.every(
      (expected, index) => actualLocales[index] === artifactLocaleCode(expected)
    );
  if (!matches) {
    return yield* new QuestionChoiceLocaleError({
      actualLocales,
      expectedLocales: [...expectedLocales],
      sourcePath,
    });
  }
  return choices;
});

/** Adds one exact overlay choice list without changing embedded choices. */
export function addQuestionChoiceOverlay(
  base: QuestionChoices,
  overlay: QuestionChoices,
  artifactLocale: LocaleOverlayAppLocaleCode
) {
  return {
    ...base,
    [artifactLocale]: overlay[artifactLocale],
  } satisfies QuestionChoices;
}
