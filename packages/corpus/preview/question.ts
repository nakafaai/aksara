import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type AppLocale,
  artifactLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import { questionKeyParts } from "@nakafa/aksara-contracts/question/identity";
import { questionArtifactLocaleForSection } from "@nakafa/aksara-contracts/tryout/language";
import { Effect } from "effect";
import { appLocaleCode } from "#corpus/locale/source";
import { selectQuestionContentPreview } from "#corpus/preview/question-selection";
import { PreviewSelectionError } from "#corpus/preview/source";
import type { QuestionEntry } from "#corpus/question-bank/content";
import { selectQuestionContent } from "#corpus/question-bank/content";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

/** Resolves one honest shell locale without conflating it with prompt bytes. */
const resolvePreviewAppLocale = Effect.fn(
  "AksaraCorpus.resolveQuestionPreviewAppLocale"
)(function* (entry: QuestionEntry, requested?: AppLocale) {
  const { sectionKey } = questionKeyParts(entry.questionKey);
  const compatible = ACTIVE_APP_LOCALES.filter((appLocale) => {
    if (entry.bodyKind === "answer") {
      return (
        artifactLocaleCode(entry.artifactLocale) === appLocaleCode(appLocale)
      );
    }
    return (
      artifactLocaleCode(entry.artifactLocale) ===
      artifactLocaleCode(
        questionArtifactLocaleForSection(sectionKey, appLocale)
      )
    );
  });
  if (requested !== undefined && compatible.includes(requested)) {
    return requested;
  }
  const [only] = compatible;
  if (
    requested === undefined &&
    compatible.length === 1 &&
    only !== undefined
  ) {
    return only;
  }
  return yield* new PreviewSelectionError({
    reason: "locale",
    sourcePath: entry.sourcePath,
  });
});

/** Selects one active prompt or ordered prompt-answer preview closure. */
export const selectQuestion = Effect.fn("AksaraCorpus.selectPreviewQuestion")(
  function* (
    corpusRoot: string,
    sourcePath: CorpusSourcePath,
    requestedAppLocale?: AppLocale
  ) {
    const sources = yield* decodeTryoutRegistry();
    const content = yield* selectQuestionContent(
      corpusRoot,
      sources,
      sourcePath
    );
    const { selected } = content;
    const previewAppLocale = yield* resolvePreviewAppLocale(
      selected,
      requestedAppLocale
    );
    return yield* selectQuestionContentPreview(
      corpusRoot,
      content,
      previewAppLocale,
      sources
    );
  }
);
