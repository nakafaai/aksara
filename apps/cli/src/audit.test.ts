import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { assert, beforeEach, describe, it } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Layer, type Redacted } from "effect";
import { runAuditCommand } from "#cli/audit";

type AuditFailure = "audit" | "environment" | "none" | "target";

interface AuditCalls {
  allowInsecureLoopback: boolean | undefined;
  endpoint: string;
  failure: AuditFailure;
  input:
    | {
        readonly manifestHash: string;
        readonly recoveryId: string;
        readonly recoveryManifestHash: string;
        readonly releaseId: string;
      }
    | undefined;
  timeout: unknown;
  token: string;
}

const calls = vi.hoisted(
  (): AuditCalls => ({
    allowInsecureLoopback: undefined,
    endpoint: "",
    failure: "none",
    input: undefined,
    timeout: undefined,
    token: "",
  })
);

vi.mock("#cli/environment/read", async () => {
  const { ProductionEnvironmentError } = await import("#cli/environment/error");
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  return {
    readPublicationEnvironment: () =>
      calls.failure === "environment"
        ? TestEffect.fail(
            new ProductionEnvironmentError({
              variable: "AKSARA_PUBLICATION_ENDPOINT",
            })
          )
        : TestEffect.succeed({
            publicationEndpoint: new URL(
              "https://content.example.test/api/publish"
            ),
            publicationToken: TestRedacted.make("publication-token"),
          }),
  };
});

vi.mock("@nakafa/aksara-publisher/target/http", async () => {
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  const { makeProductionTarget } = await import("#test/target");
  return {
    makeHttpPublicationTarget: (targetInput: {
      readonly allowInsecureLoopback: boolean;
      readonly endpoint: URL;
      readonly timeout: unknown;
      readonly token: Redacted.Redacted<string>;
    }) => {
      calls.allowInsecureLoopback = targetInput.allowInsecureLoopback;
      calls.endpoint = targetInput.endpoint.href;
      calls.timeout = targetInput.timeout;
      calls.token = TestRedacted.value(targetInput.token);
      return calls.failure === "target"
        ? TestEffect.fail({ _tag: "QuestionAuditTargetTestError" })
        : TestEffect.succeed(
            makeProductionTarget(() => ({
              active: null,
              candidate: null,
              recovery: null,
              tryoutRuntimeBundle: null,
            }))
          );
    },
  };
});

vi.mock("@nakafa/aksara-publisher/audit/question", async () => {
  const { ACTIVE_SIGNING_KEY_ID } = await import(
    "@nakafa/aksara-contracts/signature/trusted"
  );
  const { ContentVerificationKeyResolver } = await import(
    "@nakafa/aksara-contracts/signature/spec"
  );
  const { PublicationTarget } = await import(
    "@nakafa/aksara-publisher/publication/spec"
  );
  const { Effect: TestEffect } = await import("effect");
  return {
    auditQuestionRelease: (publisherInput: NonNullable<AuditCalls["input"]>) =>
      TestEffect.gen(function* () {
        calls.input = publisherInput;
        yield* PublicationTarget;
        const resolver = yield* ContentVerificationKeyResolver;
        yield* resolver.resolve(ACTIVE_SIGNING_KEY_ID);
        if (calls.failure === "audit") {
          return yield* TestEffect.fail({
            _tag: "QuestionAuditPublisherTestError",
          });
        }
        return {
          currentChoicesCount: 0,
          currentDateCount: 0,
          manifestHash: publisherInput.manifestHash,
          priorChoicesCount: 0,
          priorDateCount: 0,
          questionCount: 2,
          recoveryId: publisherInput.recoveryId,
          recoveryManifestHash: publisherInput.recoveryManifestHash,
          releaseId: publisherInput.releaseId,
        };
      }),
  };
});

const releaseId = ReleaseIdSchema.make("release-audit-active");
const recoveryId = ReleaseIdSchema.make("release-audit-recovery");
const manifestHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const recoveryManifestHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const auditInput = {
  command: "audit" as const,
  manifestHash,
  recoveryId,
  recoveryManifestHash,
  releaseId,
};

/** Runs the audit command with its real Node boundary services. */
function auditProgram() {
  return runAuditCommand(auditInput).pipe(
    Effect.provide(
      Layer.merge(NodeHttpClient.layerNodeHttp, NodeServices.layer)
    )
  );
}

beforeEach(() => {
  calls.allowInsecureLoopback = undefined;
  calls.endpoint = "";
  calls.failure = "none";
  calls.input = undefined;
  calls.timeout = undefined;
  calls.token = "";
});

describe("Question audit command", () => {
  it.effect("wires exact active and recovery identities into the audit", () =>
    Effect.gen(function* () {
      assert.deepStrictEqual(yield* auditProgram(), {
        currentChoicesCount: 0,
        currentDateCount: 0,
        manifestHash,
        priorChoicesCount: 0,
        priorDateCount: 0,
        questionCount: 2,
        recoveryId,
        recoveryManifestHash,
        releaseId,
      });
      assert.deepStrictEqual(calls.input, auditInput);
      assert.strictEqual(calls.allowInsecureLoopback, false);
      assert.strictEqual(
        calls.endpoint,
        "https://content.example.test/api/publish"
      );
      assert.strictEqual(calls.timeout, "2 minutes");
      assert.strictEqual(calls.token, "publication-token");
    })
  );

  it.effect.each([
    {
      failure: "environment",
      name: "ProductionEnvironmentError",
      stage: "environment",
    },
    {
      failure: "target",
      name: "QuestionAuditTargetTestError",
      stage: "target",
    },
    {
      failure: "audit",
      name: "QuestionAuditPublisherTestError",
      stage: "audit",
    },
  ] as const)("sanitizes the $stage boundary failure", (expected) =>
    Effect.gen(function* () {
      calls.failure = expected.failure;
      const error = yield* auditProgram().pipe(Effect.flip);
      assert.strictEqual(error.failure, expected.name);
      assert.strictEqual(error.stage, expected.stage);
    })
  );
});
