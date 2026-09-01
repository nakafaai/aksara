// @vitest-environment node

import { NodeServices } from "@effect/platform-node";
import { assert, describe, it } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseCurrent } from "@nakafa/aksara-contracts/release/current/state";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { auditQuestionRelease } from "#publisher/audit/question";
import { PublicationTarget } from "#publisher/publication/spec";
import { makeQuestionAuditFixture } from "#test/question/audit";
import { makePublicationTarget } from "#test/target";

type Fixture = Effect.Success<ReturnType<typeof makeQuestionAuditFixture>>;

interface StateAuditOptions {
  readonly input?: Fixture["input"];
  readonly state?: ContentReleaseCurrent;
}

/** Runs one audit until its authoritative state boundary rejects it. */
const runStateAudit = Effect.fn("QuestionAuditTest.runState")(
  (fixture: Fixture, options: StateAuditOptions) =>
    auditQuestionRelease(options.input ?? fixture.input).pipe(
      Effect.provideService(
        PublicationTarget,
        makePublicationTarget({
          current: Effect.succeed(options.state ?? fixture.current),
        })
      ),
      Effect.provideService(ContentVerificationKeyResolver, fixture.resolver),
      Effect.provide(NodeServices.layer)
    )
);

describe("Question audit publication state", () => {
  it.effect("rejects every non-auditable identity and release shape", () =>
    Effect.gen(function* () {
      const fixture = yield* makeQuestionAuditFixture();
      const { active, recovery } = fixture.current;
      if (!(active && recovery)) {
        return yield* Effect.die(
          "Expected active and recovery audit fixtures."
        );
      }
      const { manifest } = active.release;
      /** Replaces only selected manifest facts before signature verification. */
      const stateWithManifest = (
        patch: Partial<typeof manifest>
      ): ContentReleaseCurrent => ({
        ...fixture.current,
        active: {
          ...active,
          release: {
            ...active.release,
            manifest: { ...manifest, ...patch },
          },
        },
      });
      const cases = [
        {
          options: {
            state: {
              ...fixture.current,
              candidate: { ...recovery, phase: "verified" as const },
            },
          },
          reason: "candidate-present",
        },
        {
          options: {
            input: {
              ...fixture.input,
              releaseId: ReleaseIdSchema.make("other-active-release"),
            },
          },
          reason: "active-identity",
        },
        {
          options: {
            input: {
              ...fixture.input,
              manifestHash: Sha256HashSchema.make(`sha256:${"1".repeat(64)}`),
            },
          },
          reason: "active-identity",
        },
        {
          options: { state: { ...fixture.current, recovery: null } },
          reason: "recovery-missing",
        },
        {
          options: {
            input: {
              ...fixture.input,
              recoveryId: ReleaseIdSchema.make("other-recovery-release"),
            },
          },
          reason: "recovery-identity",
        },
        {
          options: {
            input: {
              ...fixture.input,
              recoveryManifestHash: Sha256HashSchema.make(
                `sha256:${"2".repeat(64)}`
              ),
            },
          },
          reason: "recovery-identity",
        },
        {
          options: {
            state: {
              ...fixture.current,
              recovery: { ...recovery, phase: "staging" as const },
            },
          },
          reason: "recovery-phase",
        },
        {
          options: {
            state: stateWithManifest({
              scope: { families: [], snapshots: ["tryout"] },
            }),
          },
          reason: "scope",
        },
        {
          options: {
            state: stateWithManifest({
              scope: { families: ["material"], snapshots: ["tryout"] },
            }),
          },
          reason: "scope",
        },
        {
          options: {
            state: stateWithManifest({
              scope: { families: ["question"], snapshots: [] },
            }),
          },
          reason: "scope",
        },
        {
          options: {
            state: stateWithManifest({
              scope: { families: ["question"], snapshots: ["program"] },
            }),
          },
          reason: "scope",
        },
        {
          options: { state: stateWithManifest({ itemCount: 0 }) },
          reason: "release-shape",
        },
        {
          options: { state: stateWithManifest({ deleteCount: 1 }) },
          reason: "release-shape",
        },
        {
          options: { state: stateWithManifest({ upsertCount: 0 }) },
          reason: "release-shape",
        },
        {
          options: { state: stateWithManifest({ projectionCount: 0 }) },
          reason: "release-shape",
        },
        {
          options: { state: stateWithManifest({ rollbackCount: 0 }) },
          reason: "release-shape",
        },
      ] as const;

      for (const test of cases) {
        const error = yield* runStateAudit(fixture, test.options).pipe(
          Effect.flip
        );
        assert.deepStrictEqual(
          {
            reason: "reason" in error ? error.reason : undefined,
            tag: error._tag,
          },
          { reason: test.reason, tag: "QuestionAuditStateError" }
        );
      }
    })
  );
});
