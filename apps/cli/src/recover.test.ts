import { HttpClient } from "@effect/platform";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, type Redacted } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { runRecoverCommand } from "#cli/recover";
import { captureClient } from "#test/http";

const calls = vi.hoisted(() => ({
  activationEndpoint: "",
  activationToken: "",
  fail: false,
  input: undefined as
    | { readonly recoveryId: string; readonly releaseId: string }
    | undefined,
  targetEndpoint: "",
  targetToken: "",
}));

vi.mock("#cli/env", async () => {
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  return {
    readRecoveryEnvironment: () =>
      TestEffect.succeed({
        publicationEndpoint: new URL("https://content.example.test/publish"),
        publicationToken: TestRedacted.make("publication-token"),
        rendererEndpoint: new URL("https://www.example.test/renderer"),
        rendererToken: TestRedacted.make("renderer-token"),
      }),
  };
});

vi.mock("@nakafa/aksara-publisher/target/http", async () => {
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  const { makeProductionTarget } = await import("#test/target");
  return {
    makeHttpPublicationTarget: (input: {
      readonly endpoint: URL;
      readonly token: Redacted.Redacted<string>;
    }) => {
      calls.targetEndpoint = input.endpoint.href;
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
        PublicationActivation.of({ verify: () => TestEffect.void })
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

/** Runs recovery at the isolated test boundary. */
function recoverProgram() {
  return Effect.runPromise(recoveryProgram());
}

beforeEach(() => {
  calls.activationEndpoint = "";
  calls.activationToken = "";
  calls.fail = false;
  calls.input = undefined;
  calls.targetEndpoint = "";
  calls.targetToken = "";
});

describe("recover command", () => {
  it("wires exact identities, trusted keys, target, and renderer preflight", async () => {
    await expect(recoverProgram()).resolves.toMatchObject({
      releaseId: recoveryId,
    });
    expect(calls).toMatchObject({
      activationEndpoint: "https://www.example.test/renderer",
      activationToken: "renderer-token",
      input: { recoveryId, releaseId },
      targetEndpoint: "https://content.example.test/publish",
      targetToken: "publication-token",
    });
  });

  it("sanitizes publisher recovery failures", async () => {
    calls.fail = true;
    await expect(
      Effect.runPromise(recoveryProgram().pipe(Effect.flip))
    ).resolves.toMatchObject({
      _tag: "ProductionError",
      failure: "PublicationActivationError",
      stage: "recover",
    });
  });
});
