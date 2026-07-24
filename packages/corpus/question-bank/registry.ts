import {
  ContentLocaleSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import {
  type ContentDeliveryClass,
  ContentDeliveryClassSchema,
} from "@nakafa/aksara-contracts/delivery";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type QuestionBodyKind,
  QuestionBodyKindSchema,
  QuestionChoicesSchema,
  QuestionKeySchema,
  QuestionSetKeySchema,
} from "@nakafa/aksara-contracts/projection/question";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

import {
  discoverQuestionSources,
  type QuestionSource,
} from "#corpus/question-bank/source";

/** Strict locale-specific question-bank body prepared for publication. */
export const QuestionEntrySchema = Schema.Struct({
  bodyKind: QuestionBodyKindSchema,
  choices: QuestionChoicesSchema,
  contentKey: ContentKeySchema,
  delivery: ContentDeliveryClassSchema,
  locale: ContentLocaleSchema,
  peerContentKey: ContentKeySchema,
  questionKey: QuestionKeySchema,
  questionNumber: Schema.Number.pipe(Schema.int(), Schema.positive()),
  rendererDomain: RendererDomainSchema,
  setKey: QuestionSetKeySchema,
  sourcePath: CorpusSourcePathSchema,
});
export type QuestionEntry = typeof QuestionEntrySchema.Type;

/** A projected question-bank entry failed strict contract decoding. */
export class QuestionRegistryError extends Schema.TaggedError<QuestionRegistryError>()(
  "QuestionRegistryError",
  { cause: Schema.Unknown }
) {}

/** Maps a body role to its server-enforced delivery boundary. */
function deliveryFor(
  kind: QuestionBodyKind
): Exclude<ContentDeliveryClass, "public"> {
  if (kind === "question") {
    return "authenticated";
  }
  return "entitled";
}

/** Expands one complete question directory into four localized body entries. */
function expandQuestion(source: QuestionSource) {
  return QuestionBodyKindSchema.literals.flatMap((bodyKind) =>
    ContentLocaleSchema.literals.map((locale) => ({
      bodyKind,
      choices: source.choices,
      contentKey: `${source.questionKey}/${bodyKind}`,
      delivery: deliveryFor(bodyKind),
      locale,
      peerContentKey: `${source.questionKey}/${
        bodyKind === "question" ? "answer" : "question"
      }`,
      questionKey: source.questionKey,
      questionNumber: source.questionNumber,
      rendererDomain: source.rendererDomain,
      setKey: source.setKey,
      sourcePath: `${source.sourceRoot}/${bodyKind}.${locale}.mdx`,
    }))
  );
}

/** Discovers and projects every checked-in question and answer body. */
export const decodeQuestionRegistry = Effect.fn(
  "AksaraCorpus.decodeQuestionRegistry"
)(function* (corpusRoot: string) {
  const sources = yield* discoverQuestionSources(corpusRoot);
  const entries = yield* Schema.decodeUnknown(
    Schema.Array(QuestionEntrySchema)
  )(sources.flatMap(expandQuestion), { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      (cause) =>
        new QuestionRegistryError({
          cause,
        })
    )
  );

  return [...entries].sort(compareContentHeads);
});
