import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { AppLocaleCode } from "#contracts/locale";
import { makeTryoutTestRows } from "#contracts/test/tryout";
import {
  canonicalizeTryoutPlacement,
  digestTryoutPlacements,
  makeTryoutPlacementRecord,
} from "#contracts/tryout/hash/placement";
import {
  compareTryoutPlacements,
  tryoutPlacementIdentity,
} from "#contracts/tryout/identity";
import {
  type TryoutPlacement,
  TryoutPlacementSchema,
} from "#contracts/tryout/placement";
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
  return Schema.decodeSync(TryoutPlacementSchema)({
    answerArtifactHash: hashes.answer,
    answerArtifactLocale: appLocale,
    answerContentKey: `${root}/answer`,
    appLocale,
    contentHash: hashes.content,
    countryKey: "indonesia",
    deliveryLanguage: appLocale,
    examKey: "snbt",
    languagePolicy: { kind: "app-locale" },
    questionArtifactHash: hashes.question,
    questionArtifactLocale: appLocale,
    questionContentKey: `${root}/question`,
    questionOrder: order,
    questionSourcePath: `packages/corpus/${root}`,
    rendererDomain: "snbt-quant",
    response: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Test-only correct option",
          optionKey: "option-1",
          order: 1,
        },
        {
          isCorrect: false,
          label: "Test-only distractor",
          optionKey: "option-2",
          order: 2,
        },
      ],
    },
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

    expect(canonicalizeTryoutPlacement(english)).toBe(
      '{"answerArtifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","answerArtifactLocale":"en","answerContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/answer","appLocale":"en","contentHash":"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","countryKey":"indonesia","deliveryLanguage":"en","examKey":"snbt","languagePolicy":{"kind":"app-locale"},"questionArtifactHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","questionArtifactLocale":"en","questionContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question","questionOrder":1,"questionSourcePath":"packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1","rendererDomain":"snbt-quant","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Test-only correct option","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Test-only distractor","optionKey":"option-2","order":2}]},"scope":"server","sectionKey":"quantitative-knowledge","setKey":"set-1","sourceRevision":"2026-08-12","trackKey":"2027"}'
    );
    expect(JSON.parse(canonicalizeTryoutPlacement(english))).toEqual(english);
    expect(canonicalizeTryoutPlacement(german)).toBe(
      '{"answerArtifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","answerArtifactLocale":"de","answerContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/answer","appLocale":"de","contentHash":"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","countryKey":"indonesia","deliveryLanguage":"de","examKey":"snbt","languagePolicy":{"kind":"app-locale"},"questionArtifactHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","questionArtifactLocale":"de","questionContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question","questionOrder":1,"questionSourcePath":"packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1","rendererDomain":"snbt-quant","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Test-only correct option","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Test-only distractor","optionKey":"option-2","order":2}]},"scope":"server","sectionKey":"quantitative-knowledge","setKey":"set-1","sourceRevision":"2026-08-12","trackKey":"2027"}'
    );
    expect(JSON.parse(canonicalizeTryoutPlacement(german))).toEqual(german);
    expect(makeTryoutPlacementRecord(english).rowHash).not.toBe(
      makeTryoutPlacementRecord(changed).rowHash
    );
    expect(makeTryoutPlacementRecord(english).rowHash).not.toBe(
      makeTryoutPlacementRecord(german).rowHash
    );
  });

  it("pins the canonical bytes and row hash of a documented placement, round-trips the bytes, and separates its row hash from the base placement's", () => {
    const base = placement("en", 1);
    const documented = Schema.decodeSync(TryoutPlacementSchema)({
      ...base,
      blueprint: {
        cognitiveLevel: "reasoning",
        contentDomain: "algebra",
        topic: "functions",
      },
      points: 2,
      response: {
        kind: "single-choice",
        options: [
          {
            isCorrect: true,
            label: "Jawaban é",
            optionKey: "option-1",
            order: 1,
          },
          {
            isCorrect: false,
            label: "Pengecoh",
            optionKey: "option-2",
            order: 2,
          },
        ],
      },
      stimulusKey: "shared-table",
    });

    expect(canonicalizeTryoutPlacement(documented)).toBe(
      '{"answerArtifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","answerArtifactLocale":"en","answerContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/answer","appLocale":"en","blueprint":{"cognitiveLevel":"reasoning","contentDomain":"algebra","topic":"functions"},"contentHash":"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","countryKey":"indonesia","deliveryLanguage":"en","examKey":"snbt","languagePolicy":{"kind":"app-locale"},"points":2,"questionArtifactHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","questionArtifactLocale":"en","questionContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question","questionOrder":1,"questionSourcePath":"packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1","rendererDomain":"snbt-quant","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Jawaban é","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Pengecoh","optionKey":"option-2","order":2}]},"scope":"server","sectionKey":"quantitative-knowledge","setKey":"set-1","sourceRevision":"2026-08-12","stimulusKey":"shared-table","trackKey":"2027"}'
    );
    expect(JSON.parse(canonicalizeTryoutPlacement(documented))).toEqual(
      documented
    );
    expect(makeTryoutPlacementRecord(documented).rowHash).toBe(
      "sha256:bad7c8fb135a8486d443cd91ad04d28b98d9bd1ad32c11e48ab7ba23a58c7853"
    );
    expect(makeTryoutPlacementRecord(documented).rowHash).not.toBe(
      makeTryoutPlacementRecord(base).rowHash
    );
  });

  it.effect(
    "digests shuffled placements in identity order under two chunkings",
    () =>
      Effect.gen(function* () {
        const rows = [
          placement("en", 2),
          placement("id", 1),
          placement("en", 1),
        ]
          .map(makeTryoutPlacementRecord)
          .sort((left, right) => compareTryoutPlacements(left.row, right.row));
        const single = yield* digestTryoutPlacements(
          Stream.fromIterable(rows).pipe(Stream.rechunk(1))
        );
        const triple = yield* digestTryoutPlacements(
          Stream.fromIterable(rows).pipe(Stream.rechunk(3))
        );

        expect(rows.map(({ row }) => tryoutPlacementIdentity(row))).toEqual([
          "indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge\u00001\u0000question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question\u0000en",
          "indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge\u00001\u0000question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question\u0000id",
          "indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge\u00002\u0000question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-2/question\u0000en",
        ]);
        expect(single).toEqual({
          count: 3,
          digest:
            "sha256:52473fbeb9b4ff4e29626f8927ab3ba7b0ab781501a4ac0b4aa5953e5255db78",
        });
        expect(triple).toEqual(single);
      })
  );

  it.effect("rejects tampered and repeated placement records", () =>
    Effect.gen(function* () {
      const record = makeTryoutPlacementRecord(placement("en", 1));
      const errors = yield* Effect.forEach(
        [
          digestTryoutPlacements(
            Stream.make({ ...record, rowHash: hashes.tampered })
          ),
          digestTryoutPlacements(Stream.make(record, record)),
        ],
        (failure) => failure.pipe(Effect.flip)
      );

      expect(errors.map(({ code }) => code)).toEqual(["integrity", "order"]);
    })
  );

  it.effect("digests an empty placement stream", () =>
    Effect.gen(function* () {
      const summary = yield* digestTryoutPlacements(Stream.empty);
      expect(summary.count).toBe(0);
    })
  );

  it.effect(
    "keeps default-point bytes and binds authored points after the policy",
    () =>
      Effect.gen(function* () {
        const record = yield* Effect.fromNullishOr(
          makeTryoutTestRows().placements.find(
            ({ row }) => row.appLocale === "en"
          )
        );
        const weighted: TryoutPlacement = { ...record.row, points: 2 };

        expect(record.rowHash).toBe(
          "sha256:8e7edda82a3a066a064cd68dd6431367f0b5c946a555763b0d5cdf155c588066"
        );
        expect(canonicalizeTryoutPlacement(weighted)).toContain(
          '"languagePolicy":{"kind":"app-locale"},"points":2,"questionArtifactHash"'
        );
        expect(JSON.parse(canonicalizeTryoutPlacement(weighted))).toEqual(
          weighted
        );
        expect(makeTryoutPlacementRecord(weighted).rowHash).not.toBe(
          record.rowHash
        );
      })
  );
});
