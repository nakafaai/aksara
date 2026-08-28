import { expect, layer } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionBodyKind } from "@nakafa/aksara-contracts/question/identity";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Context, Effect, Layer, Path, Stream } from "effect";
import {
  type BoundTryoutPlacement,
  bindTryoutHeads,
} from "#publisher/tryout/bind";
import { bindTryoutContent } from "#publisher/tryout/content";
import {
  TryoutContentMissingError,
  TryoutHeadMismatchError,
} from "#publisher/tryout/error";
import { testFileLayer } from "#test/files";
import {
  checkoutRoot,
  questionEntries,
  questionSources,
  rendererManifest,
  sourceByPath,
} from "#test/question/spec";
import { tryoutFixtures } from "#test/tryout";

const alteredHash = Sha256HashSchema.make(`sha256:${"2".repeat(64)}`);
const EXPECTED_CONTENT_HASHES = [
  "8c342a22cbd7c9db27a292fa606453dcfa12f8429599d46ebaef799b9444076f",
  "42b77c15eeed2fbfe0bc437e076529204ecd2ae72b30fa34e61ef8ffa26ecbaa",
  "e37a3fcf4e0a903b6aeb46ef67a8eb818c2bff44273911404ec067b209aeff01",
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

/** Collects exact artifact records through the real question inspection seam. */
const collect = Effect.fn("TryoutContentTest.collect")(
  (
    bindings: readonly BoundTryoutPlacement[],
    input: {
      readonly entries?: typeof questionEntries;
      readonly sources?: typeof questionSources;
      readonly values?: readonly BoundTryoutPlacement[];
    }
  ) =>
    bindTryoutContent({
      bindings: Stream.fromIterable(input.values ?? bindings),
      checkoutRoot,
      entries: input.entries ?? questionEntries,
      rendererManifest,
      sources: input.sources ?? questionSources,
    }).pipe(
      Stream.runCollect,
      Effect.map((records) => [...records]),
      Effect.provide([testFileLayer(sourceByPath), Path.layer])
    )
);

/** Returns one inspected content-binding failure without a FiberFailure wrapper. */
const reject = Effect.fn("TryoutContentTest.reject")(
  (
    bindings: readonly BoundTryoutPlacement[],
    input: {
      readonly entries?: typeof questionEntries;
      readonly sources?: typeof questionSources;
      readonly values?: readonly BoundTryoutPlacement[];
    }
  ) =>
    bindTryoutContent({
      bindings: Stream.fromIterable(input.values ?? bindings),
      checkoutRoot,
      entries: input.entries ?? questionEntries,
      rendererManifest,
      sources: input.sources ?? questionSources,
    }).pipe(
      Stream.runDrain,
      Effect.flip,
      Effect.provide([testFileLayer(sourceByPath), Path.layer])
    )
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

const contentTests = layer(contentTestLayer, { timeout: "30 seconds" });

contentTests("try-out content binding", (it) => {
  it.effect(
    "uses exact content hashes and both body heads in every locale",
    () =>
      Effect.gen(function* () {
        const { bindings } = yield* TryoutContentTestFixtures;
        const records = yield* collect(bindings, {});

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

  it.effect("rejects a missing body entry or canonical choice source", () =>
    Effect.gen(function* () {
      const { binding, bindings } = yield* TryoutContentTestFixtures;
      const [answer, question, choices] = yield* Effect.all(
        [
          reject(bindings, {
            entries: entriesWithout(binding, "answer"),
            values: [binding],
          }),
          reject(bindings, {
            entries: entriesWithout(binding, "question"),
            values: [binding],
          }),
          reject(bindings, { sources: [], values: [binding] }),
        ],
        { concurrency: "unbounded" }
      );

      for (const error of [answer, question, choices]) {
        expect(error).toBeInstanceOf(TryoutContentMissingError);
      }
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
        [reject(bindings, questionInput), reject(bindings, answerInput)],
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
      const error = yield* reject(bindings, {
        values: [alterFingerprint(binding, bodyKind, field)],
      });

      expect(error).toBeInstanceOf(TryoutHeadMismatchError);
      expect(error).toMatchObject({ field });
    })
  );
});
