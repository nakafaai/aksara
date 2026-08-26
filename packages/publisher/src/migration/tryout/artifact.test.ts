import { describe, expect, it } from "@effect/vitest";
import type { HistoricalSignedContentArtifact } from "@nakafa/aksara-contracts/history/decode";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Stream } from "effect";
import { vi } from "vitest";

import {
  artifactMapping,
  makeArtifactRequirements,
  makeConvertedArtifactStream,
} from "#publisher/migration/tryout/artifact";
import type { PublicationTarget } from "#publisher/publication/spec";
import {
  historicalArtifacts,
  questionArtifactHash,
  replaceAnswerSource,
} from "#test/migration/artifact";
import { historicalRows } from "#test/migration/rows";
import {
  migrationSigner,
  migrationVerificationResolver,
} from "#test/migration/signing";
import {
  historicalSource,
  migrationId,
  sourceSnapshotId,
} from "#test/migration/source";
import { makePublicationTarget } from "#test/target";

const controls = vi.hoisted(() => ({
  authentication: false,
  inspection: false,
  lossless: false,
}));

vi.mock("@nakafa/aksara-contracts/history/decode", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-contracts/history/decode")
    >();
  const { Effect: TestEffect } = await import("effect");
  return {
    ...original,
    authenticateHistoricalArtifact: (artifact: unknown) =>
      controls.authentication
        ? TestEffect.fail({ _tag: "TestArtifactAuthenticationError" as const })
        : TestEffect.succeed(artifact),
  };
});

vi.mock("@nakafa/aksara-compiler/inspect", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@nakafa/aksara-compiler/inspect")>();
  const { Sha256HashSchema: TestSha256HashSchema } = await import(
    "@nakafa/aksara-contracts/ids"
  );
  const { Effect: TestEffect } = await import("effect");
  const wrongHash = TestSha256HashSchema.make(`sha256:${"0".repeat(64)}`);
  return {
    ...original,
    inspectHistoricalContentSource: (
      ...args: Parameters<typeof original.inspectHistoricalContentSource>
    ) =>
      original
        .inspectHistoricalContentSource(...args)
        .pipe(
          TestEffect.map((inspection) =>
            controls.inspection
              ? { ...inspection, sourceHash: wrongHash }
              : inspection
          )
        ),
  };
});

vi.mock(
  "@nakafa/aksara-contracts/migration/tryout/history/lossless",
  async (importOriginal) => {
    const original =
      await importOriginal<
        typeof import("@nakafa/aksara-contracts/migration/tryout/history/lossless")
      >();
    return {
      ...original,
      hasLosslessHistoricalArtifactMapping: (
        ...args: Parameters<
          typeof original.hasLosslessHistoricalArtifactMapping
        >
      ) =>
        !controls.lossless &&
        original.hasLosslessHistoricalArtifactMapping(...args),
    };
  }
);

type Target = typeof PublicationTarget.Service;
type MigrationTarget = Target["migrateTryoutHistory"];

/** Builds one target exposing a focused retained-artifact exchange. */
function targetWith(migrateTryoutHistory: MigrationTarget) {
  return makePublicationTarget({ migrateTryoutHistory });
}

/** Returns the migration reason without hiding an unexpected failure tag. */
function failureReason(failure: { readonly _tag: string }) {
  return failure._tag === "TryoutHistoryMigrationError" && "reason" in failure
    ? failure.reason
    : failure._tag;
}

/** Converts the canonical retained artifact pair through one target. */
const convert = Effect.fn("AksaraPublisherTest.convertArtifacts")(function* (
  target: Target
) {
  const requirements = yield* makeArtifactRequirements(historicalRows, 2);
  return Array.from(
    yield* makeConvertedArtifactStream({
      migrationId,
      requirements,
      signer: migrationSigner,
      sourceSnapshotId,
      target,
    }).pipe(
      Stream.runCollect,
      Effect.provideService(
        ContentVerificationKeyResolver,
        migrationVerificationResolver
      )
    )
  );
});

/** Returns the requested retained artifacts in their exact hash order. */
function artifactTarget(
  artifacts: readonly HistoricalSignedContentArtifact[] = historicalArtifacts
) {
  return targetWith((request) =>
    request.command === "artifactBatch"
      ? Effect.succeed({
          artifacts,
          command: "artifactBatch",
          migrationId,
        })
      : Effect.die("Expected one artifact batch request.")
  );
}

describe("try-out history artifact conversion", () => {
  it.effect("authenticates and losslessly signs every retained artifact", () =>
    Effect.gen(function* () {
      const converted = yield* convert(artifactTarget());

      expect(converted).toHaveLength(2);
      expect(converted.map(({ role }) => role)).toEqual(["answer", "question"]);
      expect(converted.map(artifactMapping).map(({ index }) => index)).toEqual([
        0, 1,
      ]);
      expect(
        converted.every(
          ({ mapping }) =>
            mapping.artifact.artifactHash !== mapping.oldArtifactHash
        )
      ).toBe(true);
    })
  );

  it.effect("rejects incomplete and ambiguous artifact requirements", () =>
    Effect.gen(function* () {
      const count = yield* makeArtifactRequirements(historicalRows, 1).pipe(
        Effect.flip
      );
      const placement = historicalRows.placements.at(0);
      if (placement === undefined) {
        return yield* Effect.die("Expected one retained placement fixture.");
      }
      const source = placement.row.record.row;
      const conflicts: readonly (typeof source)[] = [
        { ...source, locale: "id" },
        {
          ...source,
          questionContentKey: ContentKeySchema.make(
            "question-bank/conflicting/question"
          ),
        },
        { ...source, rendererDomain: "mathematics" },
        {
          ...source,
          answerArtifactHash: questionArtifactHash,
          answerContentKey: source.questionContentKey,
        },
        {
          ...source,
          locale: "id",
          sectionKey: "english-language",
        },
      ];
      const requirements = yield* Effect.forEach(conflicts, (row) =>
        makeArtifactRequirements(
          {
            ...historicalRows,
            placements: [
              ...historicalRows.placements,
              {
                index: 2,
                row: {
                  ...placement.row,
                  record: { ...placement.row.record, row },
                },
              },
            ],
          },
          2
        ).pipe(Effect.flip)
      );

      expect(failureReason(count)).toBe("artifact-count");
      expect(requirements.map(failureReason)).toEqual(
        conflicts.map(() => "artifact-requirement")
      );
    })
  );

  it.effect("rejects command, count, contract, and provenance drift", () =>
    Effect.gen(function* () {
      const wrongOrder = [...historicalArtifacts].reverse();
      const failures = yield* Effect.forEach(
        [
          targetWith(() =>
            Effect.succeed({
              command: "source",
              migrationId,
              source: historicalSource,
            })
          ),
          artifactTarget(historicalArtifacts.slice(0, 1)),
          artifactTarget(wrongOrder),
        ],
        (target) => convert(target).pipe(Effect.flip)
      );
      controls.authentication = true;
      const provenance = yield* convert(artifactTarget()).pipe(Effect.flip);
      controls.authentication = false;

      expect(failures.map(failureReason)).toEqual([
        "command-evidence",
        "command-evidence",
        "artifact-contract",
      ]);
      expect(failureReason(provenance)).toBe("provenance");
    })
  );

  it.effect("rejects lossless-mapping and inspected-source drift", () =>
    Effect.gen(function* () {
      controls.lossless = true;
      const lossless = yield* convert(artifactTarget()).pipe(Effect.flip);
      controls.lossless = false;
      controls.inspection = true;
      const inspection = yield* convert(artifactTarget()).pipe(Effect.flip);
      controls.inspection = false;

      expect(failureReason(lossless)).toBe("artifact-contract");
      expect(failureReason(inspection)).toBe("artifact-contract");
    })
  );

  it.effect("rejects retained source bytes that cannot be reconstructed", () =>
    Effect.gen(function* () {
      const malformedMdx = "## Missing metadata";
      const missingDateMdx =
        'export const metadata = { title: "Missing date" }\n\n## Retained answer';
      const failures = yield* Effect.forEach(
        [malformedMdx, missingDateMdx],
        (rawMdx) =>
          convert(artifactTarget(replaceAnswerSource(rawMdx))).pipe(Effect.flip)
      );

      expect(failures.map(failureReason)).toEqual([
        "artifact-contract",
        "artifact-contract",
      ]);
    })
  );
});
