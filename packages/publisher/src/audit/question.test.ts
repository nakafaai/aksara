// @vitest-environment node

import { NodeServices } from "@effect/platform-node";
import { assert, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseCurrent } from "@nakafa/aksara-contracts/release/current/state";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { auditQuestionRelease } from "#publisher/audit/question";
import { PublicationTarget } from "#publisher/publication/spec";
import { makeQuestionAuditFixture } from "#test/question/audit";
import { makePublicationTarget } from "#test/target";
import { historicalQuestion } from "#test/transport/rollback";

type Fixture = Effect.Success<ReturnType<typeof makeQuestionAuditFixture>>;

interface TargetOptions {
  readonly head?: Fixture["head"] | null;
  readonly stateAfterAudit?: ContentReleaseCurrent;
}

/** Creates an exact target for one complete Question transition audit. */
function auditTarget(fixture: Fixture, options: TargetOptions = {}) {
  let currentReads = 0;
  return makePublicationTarget({
    current: Effect.sync(() => {
      currentReads += 1;
      return currentReads > 1 && options.stateAfterAudit !== undefined
        ? options.stateAfterAudit
        : fixture.current;
    }),
    headPage: (request) => {
      if (request.family !== "question") {
        return Effect.die("Expected one Question head request.");
      }
      return Effect.succeed({
        ...request,
        done: true,
        family: "question" as const,
        heads: options.head === null ? [] : [options.head ?? fixture.head],
        nextCursor: null,
      });
    },
    rollbackPage: (request) =>
      Effect.succeed({
        done: true,
        nextIndex: 0,
        records: [fixture.record],
        rollbackOf: request.rollbackOf,
        rollbackOfManifestHash: request.rollbackOfManifestHash,
        total: 1,
      }),
  });
}

/** Runs the audit with its real filesystem and verification boundaries. */
const runAudit = Effect.fn("QuestionAuditTest.run")(
  (fixture: Fixture, options?: TargetOptions) =>
    auditQuestionRelease(fixture.input).pipe(
      Effect.provideService(PublicationTarget, auditTarget(fixture, options)),
      Effect.provideService(ContentVerificationKeyResolver, fixture.resolver),
      Effect.provide(NodeServices.layer)
    )
);

describe("Question release audit", () => {
  it.effect(
    "authenticates the complete current and prior Question rebuild",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeQuestionAuditFixture();
        const evidence = yield* runAudit(fixture);

        assert.deepStrictEqual(evidence, {
          currentChoicesCount: 0,
          currentDateCount: 0,
          manifestHash: fixture.input.manifestHash,
          priorChoicesCount: 0,
          priorDateCount: 0,
          questionCount: 1,
          recoveryId: fixture.input.recoveryId,
          recoveryManifestHash: fixture.input.recoveryManifestHash,
          releaseId: fixture.input.releaseId,
        });
      })
  );

  it.effect(
    "rejects predecessor Question fields on the retained prior side",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeQuestionAuditFixture({
          priorProjection: historicalQuestion,
        });
        const error = yield* runAudit(fixture).pipe(Effect.flip);

        assert.strictEqual(error._tag, "QuestionAuditRecordError");
        if (error._tag === "QuestionAuditRecordError") {
          assert.strictEqual(error.choicesCount, 1);
          assert.strictEqual(error.dateCount, 1);
          assert.strictEqual(error.side, "prior");
        }
      })
  );

  it.effect("rejects a retained inverse that does not match replay", () =>
    Effect.gen(function* () {
      const fixture = yield* makeQuestionAuditFixture({
        recoveryProjectionDigest: Sha256HashSchema.make(
          `sha256:${"e".repeat(64)}`
        ),
      });
      const error = yield* runAudit(fixture).pipe(Effect.flip);

      assert.strictEqual(error._tag, "ProjectionDigestError");
    })
  );

  it.effect("rejects an active Question head outside the signed rebuild", () =>
    Effect.gen(function* () {
      const fixture = yield* makeQuestionAuditFixture();
      const error = yield* runAudit(fixture, {
        head: {
          ...fixture.head,
          projectionHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        },
      }).pipe(Effect.flip);

      assert.strictEqual(error._tag, "RollbackCatalogStateMismatchError");
    })
  );

  it.effect("rejects an incomplete active Question head catalog", () =>
    Effect.gen(function* () {
      const fixture = yield* makeQuestionAuditFixture();
      const error = yield* runAudit(fixture, { head: null }).pipe(Effect.flip);

      assert.deepStrictEqual(
        {
          actual: "actual" in error ? error.actual : undefined,
          source: "source" in error ? error.source : undefined,
          tag: error._tag,
        },
        { actual: 0, source: "active-heads", tag: "QuestionAuditCountError" }
      );
    })
  );

  it.effect("rejects publication state that changes during the audit", () =>
    Effect.gen(function* () {
      const fixture = yield* makeQuestionAuditFixture();
      const error = yield* runAudit(fixture, {
        stateAfterAudit: {
          active: null,
          candidate: null,
          recovery: null,
          tryoutRuntimeBundle: null,
        },
      }).pipe(Effect.flip);

      assert.deepStrictEqual(
        {
          reason: "reason" in error ? error.reason : undefined,
          tag: error._tag,
        },
        { reason: "active-missing", tag: "QuestionAuditStateError" }
      );
    })
  );
});
