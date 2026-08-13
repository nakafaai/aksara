import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import type { QuestionBodyKind } from "@nakafa/aksara-contracts/question/identity";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import {
  type TryoutPlacementSource,
  TryoutPlacementSourceSchema,
} from "@nakafa/aksara-contracts/tryout/placement";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { bindTryoutHeads } from "#publisher/tryout/bind";

const questionRoot =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const sourceRoot =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const hash = Sha256HashSchema.make(`sha256:${"1".repeat(64)}`);

/** Returns one strict test-owned active placement without authored body text. */
function placement(artifactLocale: typeof ArtifactLocaleSchema.Encoded) {
  return Schema.decodeUnknownSync(TryoutPlacementSourceSchema)({
    answerArtifactLocale: artifactLocale,
    answerContentKey: `${questionRoot}/answer`,
    appLocale: artifactLocale,
    choices: [
      { isCorrect: true, label: "Test A", optionKey: "option-1", order: 1 },
      { isCorrect: false, label: "Test B", optionKey: "option-2", order: 2 },
    ],
    countryKey: "indonesia",
    deliveryLanguage: artifactLocale,
    examKey: "snbt",
    questionArtifactLocale: artifactLocale,
    questionContentKey: `${questionRoot}/question`,
    questionOrder: 1,
    questionSourcePath: sourceRoot,
    rendererDomain: "snbt-general",
    scope: "server",
    sectionKey: "general-reasoning",
    setKey: "set-1",
    sourceRevision: "test",
    trackKey: "2027",
  });
}

interface HeadInput {
  readonly artifactLocale: typeof ArtifactLocaleSchema.Encoded;
  readonly bodyKind: QuestionBodyKind;
  readonly contentRoot?: string;
  readonly delivery?: QuestionHead["delivery"];
  readonly rendererDomain?: QuestionHead["rendererDomain"];
  readonly sourcePath?: string;
}

/** Returns one compact test head with independently overridable ownership. */
function head(input: HeadInput) {
  const root = input.contentRoot ?? questionRoot;
  return QuestionHeadSchema.make({
    artifactHash: hash,
    artifactLocale: ArtifactLocaleSchema.make(input.artifactLocale),
    compilerConfigHash: hash,
    contentKey: ContentKeySchema.make(`${root}/${input.bodyKind}`),
    delivery:
      input.delivery ??
      (input.bodyKind === "answer" ? "entitled" : "authenticated"),
    family: "question",
    projectionHash: hash,
    rendererDomain: input.rendererDomain ?? "snbt-general",
    sourceHash: hash,
    sourcePath: CorpusSourcePathSchema.make(
      input.sourcePath ??
        `${sourceRoot}/${input.bodyKind}.${input.artifactLocale}.mdx`
    ),
  });
}

/** Returns all four active heads in canonical content order. */
function activeHeads() {
  return [
    head({ artifactLocale: "en", bodyKind: "answer" }),
    head({ artifactLocale: "id", bodyKind: "answer" }),
    head({ artifactLocale: "en", bodyKind: "question" }),
    head({ artifactLocale: "id", bodyKind: "question" }),
  ];
}

/** Collects one binding stream as plain readonly values. */
function collect(
  placements: readonly TryoutPlacementSource[],
  heads: readonly QuestionHead[]
) {
  return Effect.runPromise(
    bindTryoutHeads(placements, Stream.fromIterable(heads)).pipe(
      Stream.runCollect,
      Effect.map((rows) => [...rows])
    )
  );
}

/** Returns one typed stream failure without a FiberFailure wrapper. */
function reject(
  placements: readonly TryoutPlacementSource[],
  heads: readonly QuestionHead[]
) {
  return Effect.runPromise(
    bindTryoutHeads(placements, Stream.fromIterable(heads)).pipe(
      Stream.runDrain,
      Effect.flip
    )
  );
}

/** Alters exactly one active-head ownership field for failure coverage. */
function mismatchedHead(field: "delivery" | "rendererDomain" | "sourcePath") {
  const current = head({ artifactLocale: "en", bodyKind: "answer" });
  if (field === "delivery") {
    return QuestionHeadSchema.make({ ...current, delivery: "public" });
  }
  if (field === "rendererDomain") {
    return QuestionHeadSchema.make({
      ...current,
      rendererDomain: "snbt-plain",
    });
  }
  return QuestionHeadSchema.make({
    ...current,
    sourcePath: CorpusSourcePathSchema.make(`${sourceRoot}/wrong.en.mdx`),
  });
}

describe("try-out head binding", () => {
  it("binds both locales while ignoring inactive canonical heads", async () => {
    const placements = [placement("id"), placement("en")];
    const inactiveRoot =
      "question-bank/tryout/indonesia/snbt/general-reasoning/set-9/question-1";
    const heads = [
      ...activeHeads(),
      head({
        artifactLocale: "en",
        bodyKind: "answer",
        contentRoot: inactiveRoot,
        sourcePath:
          "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-9/question-1/answer.en.mdx",
      }),
    ].sort(compareContentHeads);
    const result = await collect(placements, heads);

    expect(result.map(({ placement: row }) => row.appLocale)).toEqual([
      "en",
      "id",
    ]);
    expect(
      result.every(
        ({ answerHead, questionHead }) =>
          answerHead.artifactHash === hash && questionHead.artifactHash === hash
      )
    ).toBe(true);
  });

  it("rejects duplicate and descending complete head streams", async () => {
    const answer = head({ artifactLocale: "en", bodyKind: "answer" });
    const question = head({ artifactLocale: "en", bodyKind: "question" });
    const errors = await Promise.all(
      [
        [answer, answer],
        [question, answer],
      ].map((heads) => reject([placement("en"), placement("id")], heads))
    );

    expect(errors[0]).toMatchObject({ _tag: "TryoutHeadDuplicateError" });
    expect(errors[1]).toMatchObject({ _tag: "TryoutHeadOrderError" });
  });

  it("rejects missing and unexpected active head identities", async () => {
    const missing = await reject(
      [placement("en"), placement("id")],
      activeHeads().slice(1)
    );
    const trailing = QuestionHeadSchema.make({
      ...head({ artifactLocale: "en", bodyKind: "answer" }),
      contentKey: ContentKeySchema.make(`${questionRoot}/zzz`),
      sourcePath: CorpusSourcePathSchema.make(`${sourceRoot}/zzz.en.mdx`),
    });
    const leading = QuestionHeadSchema.make({
      ...trailing,
      contentKey: ContentKeySchema.make(`${questionRoot}/aaa`),
      sourcePath: CorpusSourcePathSchema.make(`${sourceRoot}/aaa.en.mdx`),
    });
    const trailingError = await reject(
      [placement("en"), placement("id")],
      [...activeHeads(), trailing].sort(compareContentHeads)
    );
    const leadingError = await reject(
      [placement("en"), placement("id")],
      [...activeHeads(), leading].sort(compareContentHeads)
    );

    expect(missing).toMatchObject({
      _tag: "TryoutHeadMissingError",
      artifactLocale: "en",
      bodyKind: "answer",
    });
    expect(trailingError).toMatchObject({
      _tag: "TryoutHeadMismatchError",
      field: "contentKey",
    });
    expect(leadingError).toMatchObject({
      _tag: "TryoutHeadMismatchError",
      field: "contentKey",
    });
  });

  it("rejects a missing final active head identity", async () => {
    const error = await reject(
      [placement("en"), placement("id")],
      activeHeads().slice(0, -1)
    );

    expect(error).toMatchObject({
      _tag: "TryoutHeadMissingError",
      artifactLocale: "id",
      bodyKind: "question",
    });
  });

  it.each(["delivery", "rendererDomain", "sourcePath"] as const)(
    "rejects a mismatched %s field",
    async (field) => {
      const error = await reject(
        [placement("en"), placement("id")],
        [mismatchedHead(field), ...activeHeads().slice(1)]
      );

      expect(error).toMatchObject({
        _tag: "TryoutHeadMismatchError",
        field,
      });
    }
  );

  it("rejects incomplete and repeated artifactLocale placement pairs", async () => {
    const [incomplete, repeated, substituted] = await Promise.all([
      reject(
        [placement("en")],
        activeHeads().filter(({ artifactLocale }) => artifactLocale === "en")
      ),
      reject(
        [placement("en"), placement("en")],
        activeHeads().filter(({ artifactLocale }) => artifactLocale === "en")
      ),
      reject(
        [placement("en"), placement("de")],
        activeHeads().filter(({ artifactLocale }) => artifactLocale === "en")
      ),
    ]);

    expect(incomplete).toMatchObject({
      _tag: "TryoutHeadMismatchError",
      field: "bodyPair",
    });
    expect(repeated).toMatchObject({
      _tag: "TryoutHeadMismatchError",
      field: "bodyPair",
    });
    expect(substituted).toMatchObject({
      _tag: "TryoutHeadMismatchError",
      field: "bodyPair",
    });
  });
});
