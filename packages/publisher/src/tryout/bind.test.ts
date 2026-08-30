import { describe, expect, it } from "@effect/vitest";
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
import { TryoutPlacementSourceSchema } from "@nakafa/aksara-contracts/tryout/placement";
import { Effect, Schema } from "effect";
import {
  TryoutHeadDuplicateError,
  TryoutHeadMismatchError,
  TryoutHeadMissingError,
  TryoutHeadOrderError,
} from "#publisher/tryout/error";
import {
  collectTryoutHeadBindings,
  rejectTryoutHeadBindings,
} from "#test/tryout-heads";

const questionRoot =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const sourceRoot =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const hash = Sha256HashSchema.make(`sha256:${"1".repeat(64)}`);

/** Returns one strict test-owned active placement without authored body text. */
function placement(artifactLocale: typeof ArtifactLocaleSchema.Encoded) {
  return Schema.decodeSync(TryoutPlacementSourceSchema)({
    answerArtifactLocale: artifactLocale,
    answerContentKey: `${questionRoot}/answer`,
    appLocale: artifactLocale,
    countryKey: "indonesia",
    deliveryLanguage: artifactLocale,
    examKey: "snbt",
    languagePolicy: { kind: "app-locale" },
    questionArtifactLocale: artifactLocale,
    questionContentKey: `${questionRoot}/question`,
    questionOrder: 1,
    questionSourcePath: sourceRoot,
    rendererDomain: "snbt-general",
    response: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Test A" }],
          optionKey: "option-1",
          order: 1,
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Test B" }],
          optionKey: "option-2",
          order: 2,
        },
      ],
    },
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

/** Returns all six active heads in canonical content order. */
function activeHeads() {
  return (["en", "id", "de"] as const)
    .flatMap((artifactLocale) => [
      head({ artifactLocale, bodyKind: "answer" }),
      head({ artifactLocale, bodyKind: "question" }),
    ])
    .sort(compareContentHeads);
}

/** Returns the complete active placement closure for one question root. */
function activePlacements() {
  return [placement("en"), placement("id"), placement("de")];
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
  it.effect(
    "binds all locales while ignoring a head outside the active catalog",
    () =>
      Effect.gen(function* () {
        const unrelatedRoot =
          "question-bank/tryout/indonesia/snbt/general-reasoning/set-9/question-1";
        const heads = [
          ...activeHeads(),
          head({
            artifactLocale: "en",
            bodyKind: "answer",
            contentRoot: unrelatedRoot,
            sourcePath:
              "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-9/question-1/answer.en.mdx",
          }),
        ].sort(compareContentHeads);
        const result = yield* collectTryoutHeadBindings(
          activePlacements(),
          heads
        );

        expect(result.map(({ placement: row }) => row.appLocale)).toEqual([
          "de",
          "en",
          "id",
        ]);
        expect(
          result.every(
            ({ answerHead, questionHead }) =>
              answerHead.artifactHash === hash &&
              questionHead.artifactHash === hash
          )
        ).toBe(true);
      })
  );

  it.effect("rejects duplicate and descending complete head streams", () =>
    Effect.gen(function* () {
      const answer = head({ artifactLocale: "en", bodyKind: "answer" });
      const question = head({ artifactLocale: "en", bodyKind: "question" });
      const errors = yield* Effect.all(
        [
          [answer, answer],
          [question, answer],
        ].map((heads) => rejectTryoutHeadBindings(activePlacements(), heads)),
        { concurrency: "unbounded" }
      );

      expect(errors[0]).toBeInstanceOf(TryoutHeadDuplicateError);
      expect(errors[1]).toBeInstanceOf(TryoutHeadOrderError);
    })
  );

  it.effect("rejects missing and unexpected active head identities", () =>
    Effect.gen(function* () {
      const missing = yield* rejectTryoutHeadBindings(
        activePlacements(),
        activeHeads().filter(
          ({ artifactLocale, contentKey }) =>
            !(
              artifactLocale === "en" && contentKey === `${questionRoot}/answer`
            )
        )
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
      const trailingError = yield* rejectTryoutHeadBindings(
        activePlacements(),
        [...activeHeads(), trailing].sort(compareContentHeads)
      );
      const leadingError = yield* rejectTryoutHeadBindings(
        activePlacements(),
        [...activeHeads(), leading].sort(compareContentHeads)
      );

      expect(missing).toBeInstanceOf(TryoutHeadMissingError);
      expect(missing).toMatchObject({
        artifactLocale: "en",
        bodyKind: "answer",
      });
      expect(trailingError).toBeInstanceOf(TryoutHeadMismatchError);
      expect(trailingError).toMatchObject({ field: "contentKey" });
      expect(leadingError).toBeInstanceOf(TryoutHeadMismatchError);
      expect(leadingError).toMatchObject({ field: "contentKey" });
    })
  );

  it.effect("rejects a missing final active head identity", () =>
    Effect.gen(function* () {
      const error = yield* rejectTryoutHeadBindings(
        activePlacements(),
        activeHeads().slice(0, -1)
      );

      expect(error).toBeInstanceOf(TryoutHeadMissingError);
      expect(error).toMatchObject({
        artifactLocale: "id",
        bodyKind: "question",
      });
    })
  );

  it.effect.each(["delivery", "rendererDomain", "sourcePath"] as const)(
    "rejects a mismatched %s field",
    (field) =>
      Effect.gen(function* () {
        const error = yield* rejectTryoutHeadBindings(
          activePlacements(),
          [
            mismatchedHead(field),
            ...activeHeads().filter(
              ({ artifactLocale, contentKey }) =>
                !(
                  artifactLocale === "en" &&
                  contentKey === `${questionRoot}/answer`
                )
            ),
          ].sort(compareContentHeads)
        );

        expect(error).toBeInstanceOf(TryoutHeadMismatchError);
        expect(error).toMatchObject({ field });
      })
  );

  it.effect(
    "rejects incomplete and repeated artifactLocale placement pairs",
    () =>
      Effect.gen(function* () {
        const englishHeads = activeHeads().filter(
          ({ artifactLocale }) => artifactLocale === "en"
        );
        const [incomplete, repeated, substituted] = yield* Effect.all(
          [
            rejectTryoutHeadBindings([placement("en")], englishHeads),
            rejectTryoutHeadBindings(
              [placement("en"), placement("en")],
              englishHeads
            ),
            rejectTryoutHeadBindings(
              [placement("en"), placement("de")],
              englishHeads
            ),
          ],
          { concurrency: "unbounded" }
        );

        for (const error of [incomplete, repeated, substituted]) {
          expect(error).toBeInstanceOf(TryoutHeadMismatchError);
          expect(error).toMatchObject({ field: "bodyPair" });
        }
      })
  );
});
