import { Path } from "@effect/platform";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionBodyKind } from "@nakafa/aksara-contracts/question/identity";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  type BoundTryoutPlacement,
  bindTryoutHeads,
} from "#publisher/tryout/bind";
import { bindTryoutContent } from "#publisher/tryout/content";
import { testFileLayer } from "#test/files";
import {
  checkoutRoot,
  questionEntries,
  questionSources,
  rendererManifest,
  sourceByPath,
} from "#test/question/spec";
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
const EXPECTED_CONTENT_HASHES = [
  "e1eb770b612627fdba611a347c6ebc58274ae0ba9d6dafdf81339502948d657c",
  "cac1a04c72eb13dd8dfca5df4d3fd0a11a3886e2f939b28ca2e514965d532160",
];

/** Collects exact artifact records through the real question inspection seam. */
function collect(input: {
  readonly entries?: typeof questionEntries;
  readonly sources?: typeof questionSources;
  readonly values?: readonly BoundTryoutPlacement[];
}) {
  return Effect.runPromise(
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
}

/** Returns one inspected content-binding failure without a FiberFailure wrapper. */
function reject(input: {
  readonly entries?: typeof questionEntries;
  readonly sources?: typeof questionSources;
  readonly values?: readonly BoundTryoutPlacement[];
}) {
  return Effect.runPromise(
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
}

/** Alters one retained body fingerprint without changing its source identity. */
function alterFingerprint(
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
function placementBodyIdentity(bodyKind: QuestionBodyKind) {
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
function placementEntry(bodyKind: QuestionBodyKind) {
  const identity = placementBodyIdentity(bodyKind);
  return questionEntries.find(
    (entry) =>
      entry.artifactLocale === identity.artifactLocale &&
      entry.contentKey === identity.contentKey
  );
}

/** Omits one exact body entry while preserving every other real source. */
function entriesWithout(bodyKind: QuestionBodyKind) {
  const identity = placementBodyIdentity(bodyKind);
  return questionEntries.filter(
    (entry) =>
      entry.artifactLocale !== identity.artifactLocale ||
      entry.contentKey !== identity.contentKey
  );
}

/** Rebinds one identity to the opposite body entry for boundary testing. */
function oppositeEntryAt(bodyKind: QuestionBodyKind) {
  const target = placementEntry(bodyKind);
  const replacement = placementEntry(
    bodyKind === "answer" ? "question" : "answer"
  );
  if (!(target && replacement)) {
    throw new Error("Expected both real try-out body entries.");
  }
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
}

describe("try-out content binding", () => {
  it("uses exact content hashes and both body heads", async () => {
    const records = await collect({});

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
  });

  it("rejects a missing body entry or canonical choice source", async () => {
    const [answer, question, choices] = await Promise.all([
      reject({ entries: entriesWithout("answer"), values: [binding] }),
      reject({ entries: entriesWithout("question"), values: [binding] }),
      reject({ sources: [], values: [binding] }),
    ]);

    expect(answer).toMatchObject({ _tag: "TryoutContentMissingError" });
    expect(question).toMatchObject({ _tag: "TryoutContentMissingError" });
    expect(choices).toMatchObject({ _tag: "TryoutContentMissingError" });
  });

  it("rejects entries bound to the opposite body identity", async () => {
    const [answerAtQuestion, questionAtAnswer] = await Promise.all([
      reject(oppositeEntryAt("question")),
      reject(oppositeEntryAt("answer")),
    ]);

    expect(answerAtQuestion).toMatchObject({
      _tag: "TryoutContentMissingError",
      artifactLocale: binding.placement.questionArtifactLocale,
      contentKey: binding.placement.questionContentKey,
    });
    expect(questionAtAnswer).toMatchObject({
      _tag: "TryoutContentMissingError",
      artifactLocale: binding.placement.answerArtifactLocale,
      contentKey: binding.placement.answerContentKey,
    });
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
