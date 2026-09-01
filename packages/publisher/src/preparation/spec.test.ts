import { expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import { PreparedContentTransitionSchema } from "#publisher/preparation/spec";
import { record as baseTransition } from "#test/publication";

it("rejects predecessor Question fields in an authored transition", () => {
  const historicalQuestion = {
    artifactLocale: "en",
    bodyKind: "question",
    choices: [
      { label: "A", value: true },
      { label: "B", value: false },
    ],
    contentKey:
      "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
    kind: "question-body",
    metadata: {
      authors: [{ name: "Test Author" }],
      date: "2026-01-01",
      title: "Question 1",
    },
    peerContentKey:
      "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer",
    questionKey:
      "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1",
    questionNumber: 1,
    setKey: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
  };
  const candidate = {
    ...baseTransition,
    record: { ...baseTransition.record, projection: historicalQuestion },
  };

  expect(
    Exit.isFailure(
      Schema.decodeUnknownExit(PreparedContentTransitionSchema)(candidate, {
        onExcessProperty: "error",
      })
    )
  ).toBe(true);
});
