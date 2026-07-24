import { NodeContext } from "@effect/platform-node";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { Effect } from "effect";
import {
  checkoutRoot,
  publishedQuestionHeads,
  questionEntries,
} from "#test/question";

export const tryoutHeads = await publishedQuestionHeads();
export const tryoutPrompts = questionEntries.filter(
  ({ bodyKind }) => bodyKind === "question"
);
const tryoutContent = await Effect.runPromise(
  loadTryoutContent(checkoutRoot).pipe(Effect.provide(NodeContext.layer))
);
const promptKeys = new Set(
  tryoutPrompts.map(({ contentKey, locale }) => `${contentKey}\0${locale}`)
);
export const tryoutPlacements = tryoutContent.projection.placements.filter(
  ({ locale, questionContentKey }) =>
    promptKeys.has(`${questionContentKey}\0${locale}`)
);
export const tryoutCatalog = tryoutContent.projection.catalog.filter(
  ({ row }) => row.kind === "country"
);
