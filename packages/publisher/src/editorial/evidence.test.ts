import {
  type EditorialReviewRecord,
  HUMANIZER_WORKFLOW_VERSION,
  makeEditorialReviewManifest,
} from "@nakafa/aksara-contracts/editorial/review";
import {
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type AppLocaleCode,
  AppLocaleSchema,
  DeliveryLanguageSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  EditorialReviewTargetOverlapError,
  projectEditorialReviewEvidence,
} from "#publisher/editorial/evidence";

/** Builds one exact authored review record for lifecycle projection tests. */
function reviewRecord(
  appLocale: AppLocaleCode,
  targetPath: string,
  hashCharacter: string
): EditorialReviewRecord {
  const sourcePath = CorpusSourcePathSchema.make(targetPath);
  const sourceHash = Sha256HashSchema.make(
    `sha256:${hashCharacter.repeat(64)}`
  );
  return {
    appLocale: AppLocaleSchema.make(appLocale),
    deliveryLanguage: DeliveryLanguageSchema.make(appLocale),
    reviewMode: "authored-humanizer-review",
    sources: [{ sourceHash, sourcePath }],
    targetHash: sourceHash,
    targetPath: sourcePath,
    workflowVersion: HUMANIZER_WORKFLOW_VERSION,
  };
}

describe("editorial review evidence", () => {
  it("keeps active records and digest unchanged when candidate evidence is added", async () => {
    const activeRecord = reviewRecord("en", "packages/corpus/test/en.ts", "a");
    const candidateRecord = reviewRecord(
      "de",
      "packages/corpus/test/de.ts",
      "b"
    );
    const activeManifest = await Effect.runPromise(
      makeEditorialReviewManifest([activeRecord])
    );
    const fullManifest = await Effect.runPromise(
      makeEditorialReviewManifest([activeRecord, candidateRecord])
    );

    const evidence = await Effect.runPromise(
      projectEditorialReviewEvidence(fullManifest)
    );

    expect(evidence.active).toEqual(activeManifest);
    expect(evidence.candidate?.records).toEqual([candidateRecord]);
  });

  it("rejects mutable authored targets shared by active and candidate copy", async () => {
    const targetPath = "packages/corpus/test/shared.ts";
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([
        reviewRecord("en", targetPath, "a"),
        reviewRecord("de", targetPath, "a"),
      ])
    );

    const error = await Effect.runPromise(
      projectEditorialReviewEvidence(manifest).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(EditorialReviewTargetOverlapError);
    expect(error).toMatchObject({ targetPath });
  });

  it("returns no candidate manifest when every record is active", async () => {
    const activeRecord = reviewRecord("en", "packages/corpus/test/en.ts", "a");
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([activeRecord])
    );

    const evidence = await Effect.runPromise(
      projectEditorialReviewEvidence(manifest)
    );

    expect(evidence.candidate).toBeNull();
  });
});
