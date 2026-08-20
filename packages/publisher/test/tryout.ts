import { NodeServices } from "@effect/platform-node";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { Effect } from "effect";
import {
  checkoutRoot,
  publishedQuestionHeads,
  questionEntries,
} from "#test/question/spec";
import { selectTryoutSlice } from "#test/tryout-slice";

export const tryoutHeads = await publishedQuestionHeads();
export const tryoutPrompts = questionEntries.filter(
  ({ bodyKind }) => bodyKind === "question"
);
const tryoutContent = await Effect.runPromise(
  loadTryoutContent(checkoutRoot).pipe(Effect.provide(NodeServices.layer))
);
export const { catalog: tryoutCatalog, placements: tryoutPlacements } =
  selectTryoutSlice(tryoutContent.projection, tryoutPrompts);
