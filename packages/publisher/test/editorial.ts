import { resolve } from "node:path";
import { NodeContext } from "@effect/platform-node";
import {
  type EditorialReviewMode,
  EditorialReviewRecordSchema,
  type EditorialReviewRequirement,
  type EditorialReviewSource,
  HUMANIZER_WORKFLOW_VERSION,
  makeEditorialReviewManifest,
} from "@nakafa/aksara-contracts/editorial/review";
import {
  CorpusSourcePathSchema,
  type Sha256Hash,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  APP_LOCALE_CODES,
  type AppLocaleCode,
  AppLocaleSchema,
  artifactLocaleCode,
  DeliveryLanguageSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  type ContentHead,
  MaterialHeadSchema,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/spec";
import {
  loadArticleReviewRequirements,
  loadStructuredReviewRequirements,
} from "@nakafa/aksara-corpus/editorial/requirements";
import { Effect, Schema, Stream } from "effect";

import { verifyCompleteEditorialReviewCoverage } from "#publisher/editorial/coverage";

const QUESTION_BODY_FILENAME_PATTERN = new RegExp(
  `question\\.(?:${APP_LOCALE_CODES.join("|")})\\.mdx$`,
  "u"
);
const TEST_REVIEW_HASH = Sha256HashSchema.make(`sha256:${"e".repeat(64)}`);
const DEFAULT_CHECKOUT_ROOT = resolve(import.meta.dirname, "../../..");

/** Builds one strict content head for editorial policy coverage. */
export function makeEditorialHead(input: {
  readonly artifactLocale: AppLocaleCode;
  readonly family: "material" | "question";
  readonly sourcePath: string;
}) {
  const fields = {
    artifactHash: TEST_REVIEW_HASH,
    artifactLocale: input.artifactLocale,
    compilerConfigHash: TEST_REVIEW_HASH,
    contentKey: "test:editorial-coverage",
    delivery: input.family === "material" ? "public" : "authenticated",
    projectionHash: TEST_REVIEW_HASH,
    rendererDomain: "snbt-general",
    sourceHash: TEST_REVIEW_HASH,
    sourcePath: CorpusSourcePathSchema.make(input.sourcePath),
  } as const;
  if (input.family === "material") {
    return Schema.decodeUnknownSync(MaterialHeadSchema)({
      ...fields,
      family: "material",
      publicPath: "subjects/test/editorial-coverage",
    });
  }
  return Schema.decodeUnknownSync(QuestionHeadSchema)({
    ...fields,
    family: "question",
  });
}

/** Builds one strict editorial record around an exact content head. */
export function makeEditorialRecord(
  target: ContentHead,
  input: {
    readonly appLocale?: AppLocaleCode;
    readonly deliveryLanguage?: AppLocaleCode;
    readonly reviewMode?: EditorialReviewMode;
    readonly sourcePaths?: readonly string[];
    readonly targetHash?: Sha256Hash;
  } = {}
) {
  const appLocale = input.appLocale ?? target.artifactLocale;
  return Schema.decodeUnknownSync(EditorialReviewRecordSchema)({
    appLocale,
    deliveryLanguage: input.deliveryLanguage ?? appLocale,
    reviewMode: input.reviewMode ?? "authored-humanizer-review",
    sources: (input.sourcePaths ?? [target.sourcePath]).map((sourcePath) => ({
      sourceHash: TEST_REVIEW_HASH,
      sourcePath: CorpusSourcePathSchema.make(sourcePath),
    })),
    targetHash: input.targetHash ?? TEST_REVIEW_HASH,
    targetPath: target.sourcePath,
    workflowVersion: HUMANIZER_WORKFLOW_VERSION,
  });
}

/** Returns the sibling choice-source identity required by one prompt. */
export function editorialChoicesPath(target: ContentHead) {
  return target.sourcePath.replace(
    QUESTION_BODY_FILENAME_PATTERN,
    "choices.ts"
  );
}

const QUESTION_ROOT = "packages/corpus/question-bank/tryout/indonesia/snbt";

/** Canonical content heads reused by editorial coverage behavior tests. */
export const editorialCoverageHeads = {
  answer: makeEditorialHead({
    artifactLocale: "id",
    family: "question",
    sourcePath: `${QUESTION_ROOT}/general-reasoning/set-1/question-1/answer.id.mdx`,
  }),
  englishPrompt: makeEditorialHead({
    artifactLocale: "en",
    family: "question",
    sourcePath: `${QUESTION_ROOT}/english-language/set-1/question-1/question.en.mdx`,
  }),
  indonesianPrompt: makeEditorialHead({
    artifactLocale: "id",
    family: "question",
    sourcePath: `${QUESTION_ROOT}/indonesian-language/set-1/question-1/question.id.mdx`,
  }),
  material: makeEditorialHead({
    artifactLocale: "en",
    family: "material",
    sourcePath: "packages/corpus/material/test/editorial/en.mdx",
  }),
  ordinaryPrompt: makeEditorialHead({
    artifactLocale: "en",
    family: "question",
    sourcePath: `${QUESTION_ROOT}/general-reasoning/set-1/question-1/question.en.mdx`,
  }),
  questionRoot: QUESTION_ROOT,
};

/** Composes exact content heads with canonical test review evidence. */
function editorialCoverageProgram(input: {
  readonly activeAppLocales?: ActiveAppLocaleList;
  readonly heads: readonly ContentHead[];
  readonly records: readonly ReturnType<typeof makeEditorialRecord>[];
}) {
  return Effect.gen(function* () {
    const manifest = yield* makeEditorialReviewManifest(input.records);
    yield* verifyCompleteEditorialReviewCoverage({
      activeAppLocales: input.activeAppLocales ?? ACTIVE_APP_LOCALES,
      heads: Stream.fromIterable(input.heads),
      manifest,
      requirements: Stream.empty,
    });
  });
}

/** Verifies exact content heads against canonical test review evidence. */
export function verifyEditorialCoverage(
  input: Parameters<typeof editorialCoverageProgram>[0]
) {
  return Effect.runPromise(editorialCoverageProgram(input));
}

/** Returns one typed editorial coverage failure without a FiberFailure wrapper. */
export function rejectEditorialCoverage(input: {
  readonly activeAppLocales?: ActiveAppLocaleList;
  readonly records: readonly ReturnType<typeof makeEditorialRecord>[];
  readonly target: ContentHead;
}) {
  return Effect.runPromise(
    editorialCoverageProgram({
      heads: [input.target],
      records: input.records,
      ...(input.activeAppLocales === undefined
        ? {}
        : { activeAppLocales: input.activeAppLocales }),
    }).pipe(Effect.flip)
  );
}

/** Resolves exact review sources for one compiled content head. */
function editorialSources(
  head: ContentHead
): readonly [EditorialReviewSource, ...EditorialReviewSource[]] {
  const source = { sourceHash: head.sourceHash, sourcePath: head.sourcePath };
  if (head.family !== "question") {
    return [source];
  }
  return [
    {
      sourceHash: head.sourceHash,
      sourcePath: CorpusSourcePathSchema.make(
        head.sourcePath.replace(QUESTION_BODY_FILENAME_PATTERN, "choices.ts")
      ),
    },
    source,
  ];
}

/** Builds exact authored review records for publisher protocol fixtures. */
function editorialReviewRecords(heads: readonly ContentHead[]) {
  return heads.map((head) =>
    EditorialReviewRecordSchema.make({
      appLocale: AppLocaleSchema.make(artifactLocaleCode(head.artifactLocale)),
      deliveryLanguage: DeliveryLanguageSchema.make(
        artifactLocaleCode(head.artifactLocale)
      ),
      reviewMode: "authored-humanizer-review",
      sources: editorialSources(head),
      targetHash: head.sourceHash,
      targetPath: head.sourcePath,
      workflowVersion: HUMANIZER_WORKFLOW_VERSION,
    })
  );
}

/** Builds exact authored review evidence for publisher protocol fixtures. */
export function makeEditorialReviewForHeads(
  heads: readonly ContentHead[],
  structuredRequirements?: readonly EditorialReviewRequirement[]
) {
  return makeEditorialReviewForRelease({
    checkoutRoot: DEFAULT_CHECKOUT_ROOT,
    heads,
    ...(structuredRequirements === undefined ? {} : { structuredRequirements }),
  });
}

/** Builds one schema-valid fixture record for a structured review requirement. */
function structuredReviewRecord(requirement: EditorialReviewRequirement) {
  const sourcePaths =
    requirement.requiredSourcePaths.length === 0
      ? [requirement.targetPath]
      : requirement.requiredSourcePaths;
  const firstSourcePath = sourcePaths[0] ?? requirement.targetPath;
  return EditorialReviewRecordSchema.make({
    appLocale: requirement.appLocale,
    deliveryLanguage: requirement.deliveryLanguage,
    reviewMode: requirement.reviewMode,
    sources: [
      { sourceHash: TEST_REVIEW_HASH, sourcePath: firstSourcePath },
      ...sourcePaths.slice(1).map((sourcePath) => ({
        sourceHash: TEST_REVIEW_HASH,
        sourcePath,
      })),
    ],
    targetHash: requirement.expectedTargetHash ?? TEST_REVIEW_HASH,
    targetPath: requirement.targetPath,
    workflowVersion: HUMANIZER_WORKFLOW_VERSION,
  });
}

/** Builds complete test review evidence for MDX and structured snapshot sources. */
export async function makeEditorialReviewForRelease(input: {
  readonly checkoutRoot: string;
  readonly heads: readonly ContentHead[];
  readonly structuredRequirements?: readonly EditorialReviewRequirement[];
}) {
  const requirements = await Effect.runPromise(
    Effect.all(
      [
        loadArticleReviewRequirements(ACTIVE_APP_LOCALES),
        input.structuredRequirements === undefined
          ? loadStructuredReviewRequirements({
              activeAppLocales: ACTIVE_APP_LOCALES,
              checkoutRoot: input.checkoutRoot,
              families: ContentSnapshotKindSchema.literals,
            })
          : Effect.succeed(input.structuredRequirements),
      ],
      { concurrency: 2 }
    ).pipe(
      Effect.map(([article, structured]) => [...article, ...structured]),
      Effect.provide(NodeContext.layer)
    )
  );
  return Effect.runPromise(
    makeEditorialReviewManifest([
      ...editorialReviewRecords(input.heads),
      ...requirements.map(structuredReviewRecord),
    ])
  );
}
