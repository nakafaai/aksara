import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeQuestionDocumentPath,
  decodeQuestionPath,
} from "#corpus/question-bank/path";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

const tryoutSources = await Effect.runPromise(decodeTryoutRegistry());

/** Returns one required test node without bypassing its inferred type. */
function requireNode<Value>(value: Value | undefined, label: string): Value {
  if (value === undefined) {
    throw new Error(`Expected ${label}.`);
  }
  return value;
}

/** Returns one typed path rejection at the Vitest boundary. */
function rejectPath(path: string) {
  return Effect.runPromise(
    decodeQuestionPath(tryoutSources, path).pipe(Effect.flip)
  );
}

describe("question path", () => {
  it("derives renderer ownership from the canonical try-out sections", async () => {
    const [plain, mathematics] = await Effect.runPromise(
      Effect.all([
        decodeQuestionPath(
          tryoutSources,
          "snbt/reading-and-writing-skills/set-1/question-1"
        ),
        decodeQuestionPath(tryoutSources, "tka/mathematics/set-3/question-40"),
      ])
    );

    expect(plain).toMatchObject({
      rendererDomain: "snbt-plain",
      setKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1",
    });
    expect(mathematics).toMatchObject({
      questionNumber: 40,
      rendererDomain: "tka-math",
    });
  });

  it("fails closed for unknown or conflicting renderer ownership", async () => {
    const snbt = requireNode(
      tryoutSources.find(({ examKey }) => examKey === "snbt"),
      "SNBT source"
    );
    const track = requireNode(snbt.tracks[0], "SNBT track");
    const firstSet = requireNode(track.sets[0], "first SNBT set");
    const firstSection = requireNode(
      firstSet.sections.find(({ key }) => key === "general-reasoning"),
      "general reasoning section"
    );
    const conflict = {
      ...snbt,
      tracks: [
        {
          ...track,
          sets: [
            {
              ...firstSet,
              sections: firstSet.sections.map((section) =>
                section === firstSection
                  ? {
                      ...section,
                      rendererDomain:
                        Schema.decodeUnknownSync(RendererDomainSchema)(
                          "snbt-plain"
                        ),
                    }
                  : section
              ),
            },
            ...track.sets.slice(1),
          ],
        },
      ],
    };
    const [unknown, conflicting] = await Promise.all([
      rejectPath("snbt/unsupported/set-1/question-1"),
      Effect.runPromise(
        decodeQuestionPath(
          [conflict, ...tryoutSources.filter((source) => source !== snbt)],
          "snbt/general-reasoning/set-1/question-1"
        ).pipe(Effect.flip)
      ),
    ]);

    expect([unknown, conflicting]).toEqual([
      expect.objectContaining({
        _tag: "QuestionPathError",
        reason: "renderer",
      }),
      expect.objectContaining({
        _tag: "QuestionPathError",
        reason: "renderer",
      }),
    ]);
  });

  it("rejects malformed physical and localized document paths", async () => {
    const malformed = await Promise.all(
      [
        "snbt/general-reasoning/set-1/question-x",
        "snbt/reading-and/writing-skills/set-1/question-1",
        `snbt/general-reasoning/set-${"9".repeat(600)}/question-1`,
      ].map(rejectPath)
    );
    const invalidDocument = await Effect.runPromise(
      decodeQuestionDocumentPath(
        tryoutSources,
        CorpusSourcePathSchema.make(
          "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/notes.mdx"
        )
      ).pipe(Effect.flip)
    );

    expect(
      [...malformed, invalidDocument].every(
        ({ reason }) => reason === "grammar"
      )
    ).toBe(true);
  });
});
