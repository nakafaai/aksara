import { Path } from "@effect/platform";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { QuestionHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  type BoundTryoutPlacement,
  bindTryoutHeads,
} from "#publisher/tryout/bind";
import { bindTryoutTitles } from "#publisher/tryout/title";
import { testFileLayer } from "#test/files";
import {
  checkoutRoot,
  questionEntries,
  rendererManifest,
  sourceByPath,
} from "#test/question";
import { tryoutHeads, tryoutPlacements } from "#test/tryout";

const bindings = [
  ...(await Effect.runPromise(
    bindTryoutHeads(tryoutPlacements, Stream.fromIterable(tryoutHeads)).pipe(
      Stream.runCollect
    )
  )),
];
/** Returns the first exact real binding or fails the test module setup. */
function firstBinding(): BoundTryoutPlacement {
  const [binding] = bindings;
  if (binding === undefined) {
    throw new Error("Expected the real try-out question bindings.");
  }
  return binding;
}
const binding = firstBinding();
const alteredHash = Sha256HashSchema.make(`sha256:${"2".repeat(64)}`);

/** Collects exact title records through the real question inspection seam. */
function collect(input: {
  readonly entries?: typeof questionEntries;
  readonly values?: readonly BoundTryoutPlacement[];
}) {
  return Effect.runPromise(
    bindTryoutTitles({
      bindings: Stream.fromIterable(input.values ?? bindings),
      checkoutRoot,
      entries: input.entries ?? questionEntries,
      rendererManifest,
    }).pipe(
      Stream.runCollect,
      Effect.map((records) => [...records]),
      Effect.provide(testFileLayer(sourceByPath)),
      Effect.provide(Path.layer)
    )
  );
}

/** Returns one inspected title-binding failure without a FiberFailure wrapper. */
function reject(input: {
  readonly entries?: typeof questionEntries;
  readonly values?: readonly BoundTryoutPlacement[];
}) {
  return Effect.runPromise(
    bindTryoutTitles({
      bindings: Stream.fromIterable(input.values ?? bindings),
      checkoutRoot,
      entries: input.entries ?? questionEntries,
      rendererManifest,
    }).pipe(
      Stream.runDrain,
      Effect.flip,
      Effect.provide(testFileLayer(sourceByPath)),
      Effect.provide(Path.layer)
    )
  );
}

/** Alters one retained body fingerprint without changing its source identity. */
function alterFingerprint(
  bodyKind: "answer" | "question",
  field: "compilerConfigHash" | "projectionHash" | "sourceHash"
) {
  const head =
    bodyKind === "answer" ? binding.answerHead : binding.questionHead;
  const altered = QuestionHeadSchema.make({ ...head, [field]: alteredHash });
  return bodyKind === "answer"
    ? { ...binding, answerHead: altered }
    : { ...binding, questionHead: altered };
}

/** Omits one exact body entry while preserving every other real source. */
function entriesWithout(bodyKind: "answer" | "question") {
  return questionEntries.filter(
    (entry) =>
      entry.locale !== binding.placement.locale ||
      entry.contentKey !==
        (bodyKind === "answer"
          ? binding.placement.answerContentKey
          : binding.placement.questionContentKey)
  );
}

describe("try-out title binding", () => {
  it("uses exact real titles and artifact hashes from both body heads", async () => {
    const records = await collect({});

    expect(records.map(({ row }) => row.title)).toEqual([
      "Problem 1",
      "Soal 1",
    ]);
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
  });

  it("rejects a missing answer or question registry entry", async () => {
    const [answer, question] = await Promise.all([
      reject({ entries: entriesWithout("answer"), values: [binding] }),
      reject({ entries: entriesWithout("question"), values: [binding] }),
    ]);

    expect(answer).toMatchObject({ _tag: "TryoutTitleMissingError" });
    expect(question).toMatchObject({ _tag: "TryoutTitleMissingError" });
  });

  it.each([
    ["answer", "compilerConfigHash"],
    ["question", "projectionHash"],
    ["answer", "sourceHash"],
  ] as const)("rejects a stale %s %s", async (bodyKind, field) => {
    const error = await reject({
      values: [alterFingerprint(bodyKind, field)],
    });

    expect(error).toMatchObject({
      _tag: "TryoutHeadMismatchError",
      field,
    });
  });
});
