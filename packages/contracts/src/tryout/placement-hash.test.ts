import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";

import type { ContentLocale } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
import {
  compareTryoutPlacements,
  compareTryoutPlacementsV2,
} from "#contracts/tryout/identity";
import { TryoutPlacementV2Schema } from "#contracts/tryout/placement";
import {
  canonicalizeTryoutPlacement,
  canonicalizeTryoutPlacementV2,
  digestTryoutPlacements,
  digestTryoutPlacementsV2,
  makeTryoutPlacementRecord,
  makeTryoutPlacementV2Record,
} from "#contracts/tryout/placement-hash";
import {
  TryoutContentHashSchema,
  TryoutPlacementSchema,
} from "#contracts/tryout/spec";

const hashes = {
  answer: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  content: TryoutContentHashSchema.make("c".repeat(64)),
  question: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  tampered: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
  tamperedContent: TryoutContentHashSchema.make("f".repeat(64)),
};

/** Builds one historical placement for digest compatibility tests. */
function placement(locale: ContentLocale, order: number) {
  return Schema.decodeUnknownSync(TryoutPlacementSchema)({
    ...placementFields(order),
    answerArtifactHash: hashes.answer,
    contentHash: hashes.content,
    locale,
    questionArtifactHash: hashes.question,
    title: "Test-only question",
  });
}

/** Builds one current placement with separate language identity. */
function placementV2(appLocale: "de" | "en" | "id", order: number) {
  return Schema.decodeUnknownSync(TryoutPlacementV2Schema)({
    ...placementFields(order),
    answerArtifactHash: hashes.answer,
    answerArtifactLocale: appLocale,
    appLocale,
    contentHash: hashes.content,
    deliveryLanguage: appLocale,
    questionArtifactHash: hashes.question,
    questionArtifactLocale: appLocale,
    title: "Test-only question",
  });
}

/** Returns stable placement fields shared by historical and current rows. */
function placementFields(order: number) {
  const root = `question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-${order}`;
  return {
    answerContentKey: `${root}/answer`,
    choices: [
      {
        isCorrect: true,
        label: "Test-only choice",
        optionKey: "option-1",
        order: 1,
      },
    ],
    countryKey: "indonesia",
    examKey: "snbt",
    questionContentKey: `${root}/question`,
    questionOrder: order,
    questionSourcePath: `packages/corpus/${root}`,
    rendererDomain: "snbt-quant",
    scope: "server",
    sectionKey: "quantitative-knowledge",
    setKey: "set-1",
    sourceRevision: "2026-07-05",
    trackKey: "2027",
  } as const;
}

describe("try-out placement hashing", () => {
  it("binds v1 and v2 placement language identities", () => {
    const v1 = placement("en", 1);
    const v2 = placementV2("de", 1);
    const changed = TryoutPlacementSchema.make({
      ...v1,
      contentHash: hashes.tamperedContent,
    });

    expect(JSON.parse(canonicalizeTryoutPlacement(v1))).toEqual(v1);
    expect(JSON.parse(canonicalizeTryoutPlacementV2(v2))).toEqual(v2);
    expect(makeTryoutPlacementRecord(v1).rowHash).not.toBe(
      makeTryoutPlacementRecord(changed).rowHash
    );
    expect(makeTryoutPlacementRecord(v1).rowHash).not.toBe(
      makeTryoutPlacementV2Record(v2).rowHash
    );
  });

  it("digests canonically ordered v1 and v2 placements", async () => {
    const v1 = [placement("en", 1), placement("id", 1), placement("en", 2)]
      .map(makeTryoutPlacementRecord)
      .sort((left, right) => compareTryoutPlacements(left.row, right.row));
    const v2 = [placementV2("en", 1), placementV2("id", 1)]
      .map(makeTryoutPlacementV2Record)
      .sort((left, right) => compareTryoutPlacementsV2(left.row, right.row));
    const [v1Summary, v2Summary] = await Effect.runPromise(
      Effect.all([
        digestTryoutPlacements(Stream.fromIterable(v1)),
        digestTryoutPlacementsV2(Stream.fromIterable(v2)),
      ])
    );

    expect(v1Summary.count).toBe(3);
    expect(v2Summary.count).toBe(2);
    expect(v1Summary.digest).not.toBe(v2Summary.digest);
  });

  it("rejects tampered and repeated placement records", async () => {
    const v1 = makeTryoutPlacementRecord(placement("en", 1));
    const v2 = makeTryoutPlacementV2Record(placementV2("de", 1));
    const failures = [
      digestTryoutPlacements(Stream.make({ ...v1, rowHash: hashes.tampered })),
      digestTryoutPlacements(Stream.make(v1, v1)),
      digestTryoutPlacementsV2(
        Stream.make({ ...v2, rowHash: hashes.tampered })
      ),
      digestTryoutPlacementsV2(Stream.make(v2, v2)),
    ];
    const errors = await Effect.runPromise(
      Effect.all(failures.map((failure) => failure.pipe(Effect.flip)))
    );

    expect(errors.map(({ code }) => code)).toEqual([
      "integrity",
      "order",
      "integrity",
      "order",
    ]);
  });

  it("digests empty placement streams", async () => {
    const [v1, v2] = await Effect.runPromise(
      Effect.all([
        digestTryoutPlacements(Stream.empty),
        digestTryoutPlacementsV2(Stream.empty),
      ])
    );

    expect(v1.count).toBe(0);
    expect(v2.count).toBe(0);
  });
});
