import { makeTryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/row-hash";
import {
  type TryoutPlacementSource,
  TryoutPlacementSourceSchema,
} from "@nakafa/aksara-contracts/tryout/spec";
import { projectTryoutCatalog } from "@nakafa/aksara-corpus/tryout/catalog";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import { Effect, Schema } from "effect";
import { publishedQuestionHeads, questionEntries } from "#test/question";

export const tryoutHeads = await publishedQuestionHeads();
export const tryoutPrompts = questionEntries.filter(
  ({ bodyKind }) => bodyKind === "question"
);

/** Returns one real-source placement without copying authored title or body. */
export function testTryoutPlacement(
  entry: (typeof tryoutPrompts)[number]
): TryoutPlacementSource {
  return Schema.decodeUnknownSync(TryoutPlacementSourceSchema)({
    answerContentKey: entry.peerContentKey,
    choices: entry.choices[entry.locale].map(({ label, value }, index) => ({
      isCorrect: value,
      label,
      optionKey: `option-${index + 1}`,
      order: index + 1,
    })),
    countryKey: "indonesia",
    examKey: "snbt",
    locale: entry.locale,
    questionContentKey: entry.contentKey,
    questionOrder: entry.questionNumber,
    questionSourcePath: entry.sourcePath.slice(
      0,
      entry.sourcePath.lastIndexOf("/")
    ),
    rendererDomain: entry.rendererDomain,
    scope: "server",
    sectionKey: "general-reasoning",
    setKey: "set-1",
    sourceRevision: "2026-07-05",
    trackKey: "2027",
  });
}

export const tryoutPlacements = tryoutPrompts.map(testTryoutPlacement);

const tryoutSources = await Effect.runPromise(decodeTryoutRegistry());
const catalogRows = await Effect.runPromise(
  projectTryoutCatalog(tryoutSources)
);
export const tryoutCatalog = catalogRows
  .filter(({ kind }) => kind === "country")
  .map(makeTryoutCatalogRecord);
