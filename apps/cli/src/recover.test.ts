import { beforeEach, describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, type Redacted } from "effect";
import { HttpClient } from "effect/unstable/http";
import { runRecoverCommand } from "#cli/recover";
import { captureClient } from "#test/http";

interface RecoverCalls {
  activationEndpoint: string;
  activationToken: string;
  fail: boolean;
  input:
    | { readonly recoveryId: string; readonly releaseId: string }
    | undefined;
  targetEndpoint: string;
  targetTimeout: unknown;
  targetToken: string;
}

const calls = vi.hoisted(
  (): RecoverCalls => ({
    activationEndpoint: "",
    activationToken: "",
    fail: false,
    input: undefined,
    targetEndpoint: "",
    targetTimeout: undefined,
    targetToken: "",
  })
);

vi.mock("#cli/environment/read", async () => {
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  return {
    readRecoveryEnvironment: () =>
      TestEffect.succeed({
        publicationEndpoint: new URL("https://content.example.test/publish"),
        publicationToken: TestRedacted.make("publication-token"),
        rendererEndpoint: new URL(
          "https://www.example.test/api/internal/content/renderer"
        ),
      }),
  };
});

vi.mock("@nakafa/aksara-publisher/target/http", async () => {
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  const { makeProductionTarget } = await import("#test/target");
  return {
    makeHttpPublicationTarget: (input: {
      readonly endpoint: URL;
      readonly timeout: unknown;
      readonly token: Redacted.Redacted<string>;
    }) => {
      calls.targetEndpoint = input.endpoint.href;
      calls.targetTimeout = input.timeout;
      calls.targetToken = TestRedacted.value(input.token);
      return TestEffect.succeed(
        makeProductionTarget(() => ({
          active: null,
          candidate: null,
          recovery: null,
        }))
      );
    },
  };
});

vi.mock("#cli/activation", async () => {
  const { PublicationActivation } = await import(
    "@nakafa/aksara-publisher/publication/spec"
  );
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  return {
    makeProductionActivation: (input: {
      readonly endpoint: URL;
      readonly token: Redacted.Redacted<string>;
    }) => {
      calls.activationEndpoint = input.endpoint.href;
      calls.activationToken = TestRedacted.value(input.token);
      return TestEffect.succeed(
        PublicationActivation.of({
          invalidate: () => TestEffect.void,
          verify: () => TestEffect.void,
        })
      );
    },
  };
});

vi.mock("@nakafa/aksara-publisher/recover", async () => {
  const { PublicationActivation, PublicationTarget } = await import(
    "@nakafa/aksara-publisher/publication/spec"
  );
  const { PublicationActivationError } = await import(
    "@nakafa/aksara-publisher/publication/spec"
  );
  const { ContentVerificationKeyResolver } = await import(
    "@nakafa/aksara-contracts/signature/spec"
  );
  const { ACTIVE_SIGNING_KEY_ID } = await import(
    "@nakafa/aksara-contracts/signature/trusted"
  );
  const { Effect: TestEffect } = await import("effect");
  const { gitBundle, receiptFor } = await import("#test/target");
  return {
    recoverContentRelease: (input: {
      readonly recoveryId: string;
      readonly releaseId: string;
    }) =>
      TestEffect.gen(function* () {
        calls.input = input;
        const resolver = yield* ContentVerificationKeyResolver;
        yield* resolver.resolve(ACTIVE_SIGNING_KEY_ID);
        yield* PublicationActivation;
        yield* PublicationTarget;
        if (calls.fail) {
          return yield* new PublicationActivationError({
            phase: "preflight",
            releaseId: ReleaseIdSchema.make(input.recoveryId),
          });
        }
        return receiptFor(gitBundle(input.recoveryId).release.manifest);
      }),
  };
});

const releaseId = ReleaseIdSchema.make("release-active");
const recoveryId = ReleaseIdSchema.make("recovery-active");

/** Builds recovery with one inert explicit HTTP service boundary. */
function recoveryProgram() {
  const client = captureClient(() => Effect.die("Unexpected HTTP request."));
  return runRecoverCommand({ command: "recover", recoveryId, releaseId }).pipe(
    Effect.provideService(HttpClient.HttpClient, client.client)
  );
}

beforeEach(() => {
  calls.activationEndpoint = "";
  calls.activationToken = "";
  calls.fail = false;
  calls.input = undefined;
  calls.targetEndpoint = "";
  calls.targetTimeout = undefined;
  calls.targetToken = "";
});

describe("recover command", () => {
  it.effect(
    "wires exact identities, trusted keys, target, and renderer preflight",
    () =>
      Effect.gen(function* () {
        expect(yield* recoveryProgram()).toMatchObject({
          releaseId: recoveryId,
        });
        expect(calls).toMatchObject({
          activationEndpoint:
            "https://www.example.test/api/internal/content/renderer",
          activationToken: "publication-token",
          input: { recoveryId, releaseId },
          targetEndpoint: "https://content.example.test/publish",
          targetTimeout: "2 minutes",
          targetToken: "publication-token",
        });
      })
  );

  it.effect("sanitizes publisher recovery failures", () =>
    Effect.gen(function* () {
      calls.fail = true;
      expect(yield* recoveryProgram().pipe(Effect.flip)).toMatchObject({
        _tag: "ProductionError",
        failure: "PublicationActivationError",
        stage: "recover",
      });
    })
  );
});
