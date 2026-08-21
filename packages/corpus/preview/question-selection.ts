import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import type {
  QuestionAnswerPreviewDocument,
  QuestionPromptPreviewDocument,
} from "@nakafa/aksara-contracts/preview/document";
import type { TryoutCatalogRow } from "@nakafa/aksara-contracts/tryout/catalog";
import { Effect } from "effect";
import { makeQuestionPreviewSource } from "#corpus/preview/question-source";
import type { PreviewSelection } from "#corpus/preview/source";
import {
  makeRestartDependencyLookup,
  type RestartDependencyLookup,
} from "#corpus/preview/topology";
import type {
  QuestionContentSelection,
  QuestionEntry,
} from "#corpus/question-bank/content";
import { projectPreviewTryoutCatalog } from "#corpus/tryout/catalog";
import type { TryoutExamSource } from "#corpus/tryout/schema";
import { selectTryoutTarget } from "#corpus/tryout/target";

/** Selects only the source hierarchy that owns one question set. */
function questionOwners(
  sources: readonly TryoutExamSource[],
  entry: QuestionEntry
) {
  return sources.filter((source) =>
    source.tracks.some((track) =>
      track.sets.some((set) =>
        set.sections.some(
          (section) => section.questionSourcePath === entry.setKey
        )
      )
    )
  );
}

/** Builds one question selection from already decoded content and catalog rows. */
const buildQuestionSelection = Effect.fn(
  "AksaraCorpus.buildQuestionPreviewSelection"
)(function* (
  content: QuestionContentSelection,
  appLocale: AppLocale,
  projectionSources: readonly TryoutExamSource[],
  catalog: readonly TryoutCatalogRow[],
  dependenciesFor: RestartDependencyLookup
) {
  const { selected } = content;
  const target = yield* selectTryoutTarget(
    catalog,
    questionOwners(projectionSources, selected),
    selected,
    content.source,
    appLocale
  );
  if (selected.bodyKind === "question") {
    const source = yield* makeQuestionPreviewSource(
      content.source,
      selected,
      appLocale,
      dependenciesFor
    );
    const document = {
      delivery: selected.delivery,
      family: "question",
      identity: {
        artifactLocale: selected.artifactLocale,
        bodyKind: selected.bodyKind,
        contentKey: selected.contentKey,
        peerContentKey: selected.peerContentKey,
        questionKey: selected.questionKey,
        questionNumber: selected.questionNumber,
        setKey: selected.setKey,
      },
      rendererDomain: selected.rendererDomain,
      sourcePath: selected.sourcePath,
      target,
    } satisfies QuestionPromptPreviewDocument;
    return {
      document,
      sources: [source],
    } satisfies PreviewSelection;
  }
  const [prompt] = content.entries;
  const [promptSource, answerSource] = yield* Effect.all(
    [
      makeQuestionPreviewSource(
        content.source,
        prompt,
        appLocale,
        dependenciesFor
      ),
      makeQuestionPreviewSource(
        content.source,
        selected,
        appLocale,
        dependenciesFor
      ),
    ],
    { concurrency: 2 }
  );
  const document = {
    delivery: selected.delivery,
    family: "question",
    identity: {
      artifactLocale: selected.artifactLocale,
      bodyKind: selected.bodyKind,
      contentKey: selected.contentKey,
      peerContentKey: selected.peerContentKey,
      questionKey: selected.questionKey,
      questionNumber: selected.questionNumber,
      setKey: selected.setKey,
    },
    rendererDomain: selected.rendererDomain,
    sourcePath: selected.sourcePath,
    target,
  } satisfies QuestionAnswerPreviewDocument;
  return {
    document,
    sources: [promptSource, answerSource],
  } satisfies PreviewSelection;
});

/** Selects one decoded question without rediscovering its source registry. */
export const selectQuestionContentPreview = Effect.fn(
  "AksaraCorpus.selectQuestionContentPreview"
)(function* (
  corpusRoot: string,
  content: QuestionContentSelection,
  appLocale: AppLocale,
  sources: readonly TryoutExamSource[]
) {
  const catalog = yield* projectPreviewTryoutCatalog(sources, appLocale);
  const dependenciesFor = yield* makeRestartDependencyLookup(corpusRoot);
  return yield* buildQuestionSelection(
    content,
    appLocale,
    sources,
    catalog,
    dependenciesFor
  );
});
