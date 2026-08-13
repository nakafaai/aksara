import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import type {
  QuestionAnswerPreviewDocument,
  QuestionPromptPreviewDocument,
} from "@nakafa/aksara-contracts/preview/document";
import { questionKeyParts } from "@nakafa/aksara-contracts/question/identity";
import { Effect } from "effect";
import type {
  PreviewSelection,
  QuestionPreviewSource,
} from "#corpus/preview/source";
import { restartDependencies } from "#corpus/preview/topology";
import { selectQuestionContent } from "#corpus/question-bank/content";
import { questionSourceFiles } from "#corpus/question-bank/path";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import { selectTryoutTarget } from "#corpus/tryout/target";

const QUESTION_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/tryout/registry.ts"
);

/** Selects one active prompt or ordered prompt-answer preview closure. */
export const selectQuestion = Effect.fn("AksaraCorpus.selectPreviewQuestion")(
  function* (corpusRoot: string, sourcePath: CorpusSourcePath) {
    const sources = yield* decodeTryoutRegistry();
    const content = yield* selectQuestionContent(
      corpusRoot,
      sources,
      sourcePath
    );
    const catalog = yield* projectTryoutCatalog(sources);
    const { selected } = content;
    const target = yield* selectTryoutTarget(
      catalog,
      sources,
      selected,
      content.source
    );
    const sourceModule = CorpusSourcePathSchema.make(
      `packages/corpus/tryout/${target.exam.countryKey}/${target.exam.examKey}/source.ts`
    );
    const dependencies = [
      {
        mode: "reload",
        sourcePath: CorpusSourcePathSchema.make(
          `${selected.sourceRoot}/choices.ts`
        ),
      },
      { mode: "restart", sourcePath: QUESTION_OWNER },
      ...(yield* restartDependencies(corpusRoot, sourceModule)),
    ] satisfies QuestionPreviewSource["dependencies"];
    const directories = [
      {
        files: questionSourceFiles(
          questionKeyParts(content.source.questionKey).sectionKey
        ),
        sourcePath: selected.sourceRoot,
      },
    ] satisfies QuestionPreviewSource["directories"];
    if (selected.bodyKind === "question") {
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
        sources: [
          {
            dependencies,
            directories,
            entry: selected,
            family: "question",
          },
        ],
      } satisfies PreviewSelection;
    }
    const [prompt] = content.entries;
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
      sources: [
        {
          dependencies,
          directories,
          entry: prompt,
          family: "question",
        },
        {
          dependencies,
          directories,
          entry: selected,
          family: "question",
        },
      ],
    } satisfies PreviewSelection;
  }
);
