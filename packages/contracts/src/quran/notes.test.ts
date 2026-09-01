import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import {
  parseQuranTranslation,
  QuranTranslationNotesError,
  QuranTranslationSchema,
} from "#contracts/quran/notes";

describe("Quran translation notes", () => {
  it.effect("preserves exact source text as linked semantic segments", () =>
    Effect.gen(function* () {
      expect(
        yield* parseQuranTranslation({
          footnotes: "[3] First note. [4] Second note.",
          text: "those [pilgrims] who pray[3] and give what We[4] provided",
        })
      ).toMatchObject({
        notes: [
          { number: 3, referenceOffset: 25, text: "First note." },
          { number: 4, referenceOffset: 45, text: "Second note." },
        ],
        segments: [
          { kind: "text", value: "those [pilgrims] who pray" },
          { kind: "note", number: 3 },
          { kind: "text", value: " and give what We" },
          { kind: "note", number: 4 },
          { kind: "text", value: " provided" },
        ],
      });
    })
  );

  it.effect("supports no notes and repeated references to one note", () =>
    Effect.gen(function* () {
      const plain = yield* parseQuranTranslation({
        footnotes: "",
        text: "Im Namen Allahs.",
      });
      const repeated = yield* parseQuranTranslation({
        footnotes: "[1] Shared source note.",
        text: "[1]First reference and second[1]",
      });

      expect(plain).toEqual({
        notes: [],
        segments: [{ kind: "text", offset: 0, value: "Im Namen Allahs." }],
      });
      expect(repeated).toMatchObject({
        notes: [{ number: 1, text: "Shared source note." }],
        segments: [
          { kind: "note", number: 1 },
          { kind: "text", value: "First reference and second" },
          { kind: "note", number: 1 },
        ],
      });
    })
  );

  it.effect("fails with exact typed note-grammar reasons", () =>
    Effect.gen(function* () {
      const invalid = yield* Effect.result(
        parseQuranTranslation({
          footnotes: "[01] Source note.",
          text: "Translation[01].",
        })
      );
      const mismatched = yield* Effect.result(
        parseQuranTranslation({ footnotes: "", text: "Translation[1]." })
      );
      const empty = yield* Effect.result(
        parseQuranTranslation({ footnotes: "[1]", text: "Translation[1]." })
      );
      const invalidDefinition = yield* Effect.result(
        parseQuranTranslation({
          footnotes: "[01] Source note.",
          text: "Translation[1].",
        })
      );
      const orphaned = yield* Effect.result(
        parseQuranTranslation({
          footnotes: "[1] Source note.",
          text: "Translation.",
        })
      );
      const duplicate = yield* Effect.result(
        parseQuranTranslation({
          footnotes: "[1] First. [1] Duplicate.",
          text: "Translation[1].",
        })
      );
      const reordered = yield* Effect.result(
        parseQuranTranslation({
          footnotes: "[2] Second. [1] First.",
          text: "First[1], second[2].",
        })
      );
      const prefixed = yield* Effect.result(
        parseQuranTranslation({
          footnotes: "Unexpected [1] Source note.",
          text: "Translation[1].",
        })
      );
      const invalidSource = yield* Effect.result(
        parseQuranTranslation({ footnotes: "", text: "" })
      );

      expect(invalid).toEqual(
        expect.objectContaining({
          _tag: "Failure",
          failure: new QuranTranslationNotesError({
            reason: "invalid-marker",
          }),
        })
      );
      expect(mismatched).toEqual(
        expect.objectContaining({
          _tag: "Failure",
          failure: new QuranTranslationNotesError({
            reason: "mismatched-markers",
          }),
        })
      );
      expect(empty).toEqual(
        expect.objectContaining({
          _tag: "Failure",
          failure: new QuranTranslationNotesError({ reason: "empty-note" }),
        })
      );
      expect(invalidDefinition).toMatchObject({
        _tag: "Failure",
        failure: { reason: "invalid-marker" },
      });
      for (const result of [orphaned, duplicate, reordered, prefixed]) {
        expect(result).toMatchObject({
          _tag: "Failure",
          failure: { reason: "mismatched-markers" },
        });
      }
      expect(invalidSource).toMatchObject({
        _tag: "Failure",
        failure: { reason: "invalid-source" },
      });
    })
  );

  it("enforces the same grammar in the signed translation schema", () => {
    const accepted = Schema.decodeExit(QuranTranslationSchema)({
      footnotes: "[4] Source note.",
      text: "Alif Lam Mim.[4]",
    });
    const rejected = Schema.decodeExit(QuranTranslationSchema)({
      footnotes: "",
      text: "Alif Lam Mim.[4]",
    });

    expect(Exit.isSuccess(accepted)).toBe(true);
    expect(Exit.isFailure(rejected)).toBe(true);
  });
});
