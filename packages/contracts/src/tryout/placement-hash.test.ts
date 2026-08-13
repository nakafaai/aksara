import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import type { AppLocaleCode } from "#contracts/locale";
import { compareTryoutPlacements } from "#contracts/tryout/identity";
import { TryoutPlacementSchema } from "#contracts/tryout/placement";
import {
  canonicalizeTryoutPlacement,
  digestTryoutPlacements,
  makeTryoutPlacementRecord,
} from "#contracts/tryout/placement-hash";
import { TryoutContentHashSchema } from "#contracts/tryout/spec";

const hashes = {
  answer: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  content: TryoutContentHashSchema.make("c".repeat(64)),
  question: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  tampered: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
  tamperedContent: TryoutContentHashSchema.make("f".repeat(64)),
};

/** Builds one current non-language placement for an application locale. */
function placement(appLocale: AppLocaleCode, order: number) {
  const root = `question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-${order}`;
  return Schema.decodeUnknownSync(TryoutPlacementSchema)({
    answerArtifactHash: hashes.answer,
    answerArtifactLocale: appLocale,
    answerContentKey: `${root}/answer`,
    appLocale,
    choices: [
      {
        isCorrect: true,
        label: "Test-only choice",
        optionKey: "option-1",
        order: 1,
      },
    ],
    contentHash: hashes.content,
    countryKey: "indonesia",
    deliveryLanguage: appLocale,
    examKey: "snbt",
    questionArtifactHash: hashes.question,
    questionArtifactLocale: appLocale,
    questionContentKey: `${root}/question`,
    questionOrder: order,
    questionSourcePath: `packages/corpus/${root}`,
    rendererDomain: "snbt-quant",
    scope: "server",
    sectionKey: "quantitative-knowledge",
    setKey: "set-1",
    sourceRevision: "2026-08-12",
    trackKey: "2027",
  });
}

describe("try-out placement hashing", () => {
  it("binds separate application and artifact language identities", () => {
    const english = placement("en", 1);
    const german = placement("de", 1);
    const changed = TryoutPlacementSchema.make({
      ...english,
      contentHash: hashes.tamperedContent,
    });

    expect(JSON.parse(canonicalizeTryoutPlacement(english))).toEqual(english);
    expect(JSON.parse(canonicalizeTryoutPlacement(german))).toEqual(german);
    expect(makeTryoutPlacementRecord(english).rowHash).not.toBe(
      makeTryoutPlacementRecord(changed).rowHash
    );
    expect(makeTryoutPlacementRecord(english).rowHash).not.toBe(
      makeTryoutPlacementRecord(german).rowHash
    );
  });

  it("digests placements in canonical identity order", async () => {
    const rows = [placement("en", 1), placement("id", 1), placement("en", 2)]
      .map(makeTryoutPlacementRecord)
      .sort((left, right) => compareTryoutPlacements(left.row, right.row));
    const summary = await Effect.runPromise(
      digestTryoutPlacements(Stream.fromIterable(rows))
    );

    expect(summary.count).toBe(3);
  });

  it("rejects tampered and repeated placement records", async () => {
    const record = makeTryoutPlacementRecord(placement("en", 1));
    const errors = await Effect.runPromise(
      Effect.all(
        [
          digestTryoutPlacements(
            Stream.make({ ...record, rowHash: hashes.tampered })
          ),
          digestTryoutPlacements(Stream.make(record, record)),
        ].map((failure) => failure.pipe(Effect.flip))
      )
    );

    expect(errors.map(({ code }) => code)).toEqual(["integrity", "order"]);
  });

  it("digests an empty placement stream", async () => {
    const summary = await Effect.runPromise(
      digestTryoutPlacements(Stream.empty)
    );
    expect(summary.count).toBe(0);
  });
});
