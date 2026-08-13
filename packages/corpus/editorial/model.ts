import {
  type EditorialReviewMode,
  type EditorialReviewRequirement,
  EditorialReviewRequirementSchema,
} from "@nakafa/aksara-contracts/editorial/review";
import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type ActiveAppLocaleList,
  type AppLocale,
  DeliveryLanguageSchema,
} from "@nakafa/aksara-contracts/locale";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { Schema } from "effect";

const CORPUS_ROOT = "packages/corpus";

/** One selected structured family has no exact reviewable source inventory. */
export class StructuredReviewSourceError extends Schema.TaggedError<StructuredReviewSourceError>()(
  "StructuredReviewSourceError",
  {
    cause: Schema.Unknown,
    family: ContentSnapshotKindSchema,
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Builds one validated corpus-relative source identity. */
export function corpusPath(path: string) {
  return CorpusSourcePathSchema.make(`${CORPUS_ROOT}/${path}`);
}

/** Deduplicates source identities into canonical code-unit order. */
export function canonicalPaths(paths: readonly CorpusSourcePath[]) {
  return [...new Set(paths)].sort(compareCodeUnits);
}

/** Builds one exact editorial requirement from source-owned policy. */
export function makeReviewRequirement(input: {
  readonly appLocale: AppLocale;
  readonly requiredSourcePaths?: readonly CorpusSourcePath[];
  readonly reviewMode: EditorialReviewMode;
  readonly targetPath: CorpusSourcePath;
}) {
  return EditorialReviewRequirementSchema.make({
    appLocale: input.appLocale,
    deliveryLanguage: DeliveryLanguageSchema.make(input.appLocale),
    expectedTargetHash: null,
    requiredSourcePaths: canonicalPaths(input.requiredSourcePaths ?? []),
    reviewMode: input.reviewMode,
    targetPath: input.targetPath,
  });
}

/** Expands authored source files over every active application locale. */
export function authoredRequirements(
  paths: readonly CorpusSourcePath[],
  activeAppLocales: ActiveAppLocaleList
) {
  return canonicalPaths(paths).flatMap((targetPath) =>
    activeAppLocales.map((appLocale) =>
      makeReviewRequirement({
        appLocale,
        reviewMode: "authored-humanizer-review",
        targetPath,
      })
    )
  );
}

/** Compares requirements through the manifest record identity they demand. */
export function compareReviewRequirements(
  left: EditorialReviewRequirement,
  right: EditorialReviewRequirement
) {
  return (
    compareCodeUnits(left.targetPath, right.targetPath) ||
    compareCodeUnits(left.appLocale, right.appLocale) ||
    compareCodeUnits(left.deliveryLanguage, right.deliveryLanguage)
  );
}
