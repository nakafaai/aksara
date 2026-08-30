import { expect, layer } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionBodyKind } from "@nakafa/aksara-contracts/question/identity";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Context, Effect, Layer, Stream } from "effect";
import {
  type BoundTryoutPlacement,
  bindTryoutHeads,
} from "#publisher/tryout/bind";
import {
  TryoutContentMissingError,
  TryoutHeadMismatchError,
} from "#publisher/tryout/error";
import { questionEntries } from "#test/question/spec";
import { tryoutFixtures } from "#test/tryout";
import {
  collectEnrichedTryoutContent,
  collectTryoutContent,
  rejectTryoutContent,
} from "#test/tryout-content";

const alteredHash = Sha256HashSchema.make(`sha256:${"2".repeat(64)}`);
const EXPECTED_CONTENT_HASHES = [
  "e06972b164034889f9f7fd12aa7e6a439ac91ab98920511d8ff330d9c72f173a",
  "7f0f8eddc95a80c096386511016a2a47c96b5e88714c0f2f12d67abf82254a01",
  "f171a62ffa862d09e6f8738df07636603e6cc3dbbba2bef4df502c00aaef18d1",
];

/** Loads exact real bindings once for every content-binding test. */
const makeContentTestFixtures = Effect.fn("TryoutContentTest.makeFixtures")(
  () =>
    Effect.gen(function* () {
      const { tryoutHeads, tryoutPlacements } = yield* tryoutFixtures;
      const bindings = [
        ...(yield* bindTryoutHeads(
          tryoutPlacements,
          Stream.fromIterable(tryoutHeads)
        ).pipe(Stream.runCollect)),
      ];
      const binding = yield* Effect.fromNullishOr(bindings[0]);
      return { binding, bindings };
    })
);

class TryoutContentTestFixtures extends Context.Service<
  TryoutContentTestFixtures,
  Effect.Success<ReturnType<typeof makeContentTestFixtures>>
>()("AksaraPublisherTryoutContentTestFixtures") {}

const contentTestLayer = Layer.effect(
  TryoutContentTestFixtures,
  makeContentTestFixtures()
);

/** Alters one retained body fingerprint without changing its source identity. */
function alterFingerprint(
  binding: BoundTryoutPlacement,
  bodyKind: QuestionBodyKind,
  field: keyof Pick<
    QuestionHead,
    "compilerConfigHash" | "projectionHash" | "sourceHash"
  >
) {
  const head =
    bodyKind === "answer" ? binding.answerHead : binding.questionHead;
  const altered = QuestionHeadSchema.make({ ...head, [field]: alteredHash });
  return bodyKind === "answer"
    ? { ...binding, answerHead: altered }
    : { ...binding, questionHead: altered };
}

/** Returns the exact placement identity owned by one body kind. */
function placementBodyIdentity(
  binding: BoundTryoutPlacement,
  bodyKind: QuestionBodyKind
) {
  return {
    artifactLocale:
      bodyKind === "answer"
        ? binding.placement.answerArtifactLocale
        : binding.placement.questionArtifactLocale,
    contentKey:
      bodyKind === "answer"
        ? binding.placement.answerContentKey
        : binding.placement.questionContentKey,
  };
}

/** Finds one real entry through the same physical placement identity. */
function placementEntry(
  binding: BoundTryoutPlacement,
  bodyKind: QuestionBodyKind
) {
  const identity = placementBodyIdentity(binding, bodyKind);
  return questionEntries.find(
    (entry) =>
      entry.artifactLocale === identity.artifactLocale &&
      entry.contentKey === identity.contentKey
  );
}

/** Omits one exact body entry while preserving every other real source. */
function entriesWithout(
  binding: BoundTryoutPlacement,
  bodyKind: QuestionBodyKind
) {
  const identity = placementBodyIdentity(binding, bodyKind);
  return questionEntries.filter(
    (entry) =>
      entry.artifactLocale !== identity.artifactLocale ||
      entry.contentKey !== identity.contentKey
  );
}

/** Rebinds one identity to the opposite body entry for boundary testing. */
const oppositeEntryAt = Effect.fn("TryoutContentTest.oppositeEntryAt")(
  (binding: BoundTryoutPlacement, bodyKind: QuestionBodyKind) =>
    Effect.gen(function* () {
      const target = yield* Effect.fromNullishOr(
        placementEntry(binding, bodyKind)
      );
      const replacement = yield* Effect.fromNullishOr(
        placementEntry(binding, bodyKind === "answer" ? "question" : "answer")
      );
      const entries = questionEntries.map((entry) =>
        entry === target
          ? {
              ...replacement,
              artifactLocale: target.artifactLocale,
              contentKey: target.contentKey,
            }
          : entry
      );
      return { entries, values: [binding] };
    })
);

/** Runs content-binding tests with bounded shared fixture acquisition. */
const contentTests = layer(contentTestLayer, { timeout: "30 seconds" });

contentTests("try-out content binding", (it) => {
  it.effect(
    "uses exact content hashes and both body heads in every locale",
    () =>
      Effect.gen(function* () {
        const { bindings } = yield* TryoutContentTestFixtures;
        const records = yield* collectTryoutContent(bindings, {});

        expect(records.map(({ row }) => row.contentHash)).toEqual(
          EXPECTED_CONTENT_HASHES
        );
        expect(
          records.every(({ row }, index) => {
            const current = bindings[index];
            return (
              current !== undefined &&
              row.answerArtifactHash === current.answerHead.artifactHash &&
              row.questionArtifactHash === current.questionHead.artifactHash
            );
          })
        ).toBe(true);
      })
  );

  it.effect("rejects a missing body entry or canonical item source", () =>
    Effect.gen(function* () {
      const { binding, bindings } = yield* TryoutContentTestFixtures;
      const [answer, question, item] = yield* Effect.all(
        [
          rejectTryoutContent(bindings, {
            entries: entriesWithout(binding, "answer"),
            values: [binding],
          }),
          rejectTryoutContent(bindings, {
            entries: entriesWithout(binding, "question"),
            values: [binding],
          }),
          rejectTryoutContent(bindings, {
            sources: [],
            values: [binding],
          }),
        ],
        { concurrency: "unbounded" }
      );

      for (const error of [answer, question, item]) {
        expect(error).toBeInstanceOf(TryoutContentMissingError);
      }
    })
  );

  it.effect(
    "binds blueprint, modification date, and shared stimulus into the hash",
    () =>
      Effect.gen(function* () {
        const { binding } = yield* TryoutContentTestFixtures;
        const {
          blueprint,
          modifiedQuestionSource,
          questionSource,
          record,
          stimulusKey,
        } = yield* collectEnrichedTryoutContent(binding);

        expect(modifiedQuestionSource).not.toBe(questionSource);
        expect(record?.row).toMatchObject({ blueprint, stimulusKey });
        expect(EXPECTED_CONTENT_HASHES).not.toContain(record?.row.contentHash);
      })
  );

  it.effect("rejects entries bound to the opposite body identity", () =>
    Effect.gen(function* () {
      const { binding, bindings } = yield* TryoutContentTestFixtures;
      const [questionInput, answerInput] = yield* Effect.all([
        oppositeEntryAt(binding, "question"),
        oppositeEntryAt(binding, "answer"),
      ]);
      const [answerAtQuestion, questionAtAnswer] = yield* Effect.all(
        [
          rejectTryoutContent(bindings, questionInput),
          rejectTryoutContent(bindings, answerInput),
        ],
        { concurrency: "unbounded" }
      );

      expect(answerAtQuestion).toBeInstanceOf(TryoutContentMissingError);
      expect(answerAtQuestion).toMatchObject({
        artifactLocale: binding.placement.questionArtifactLocale,
        contentKey: binding.placement.questionContentKey,
      });
      expect(questionAtAnswer).toBeInstanceOf(TryoutContentMissingError);
      expect(questionAtAnswer).toMatchObject({
        artifactLocale: binding.placement.answerArtifactLocale,
        contentKey: binding.placement.answerContentKey,
      });
    })
  );

  it.effect.each([
    ["answer", "compilerConfigHash"],
    ["question", "projectionHash"],
    ["answer", "sourceHash"],
  ] as const)("rejects a stale %s %s", ([bodyKind, field]) =>
    Effect.gen(function* () {
      const { binding, bindings } = yield* TryoutContentTestFixtures;
      const error = yield* rejectTryoutContent(bindings, {
        values: [alterFingerprint(binding, bodyKind, field)],
      });

      expect(error).toBeInstanceOf(TryoutHeadMismatchError);
      expect(error).toMatchObject({ field });
    })
  );
});
