import { beforeEach, describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, type Redacted } from "effect";
import { HttpClient } from "effect/http";
import { runRecoverCommand } from "#cli/recover";
import { captureClient } from "#test/http";

const doubles = vi.hoisted(() => ({
  activation:
    vi.fn<
      (input: { readonly endpoint: string; readonly token: string }) => void
    >(),
  failRecovery: vi.fn<() => boolean>(() => false),
  recovery:
    vi.fn<
      (input: {
        readonly recoveryId: string;
        readonly releaseId: string;
      }) => void
    >(),
  target:
    vi.fn<
      (input: {
        readonly endpoint: string;
        readonly timeout: unknown;
        readonly token: string;
      }) => void
    >(),
}));

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
      readonly timeout: unknown;
      readonly token: Redacted.Redacted<string>;
    }) => {
      doubles.target({
        endpoint: input.endpoint.href,
        timeout: input.timeout,
        token: TestRedacted.value(input.token),
      });
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
      doubles.activation({
        endpoint: input.endpoint.href,
        token: TestRedacted.value(input.token),
      });
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
        doubles.recovery(input);
        const resolver = yield* ContentVerificationKeyResolver;
        yield* resolver.resolve(ACTIVE_SIGNING_KEY_ID);
        yield* PublicationActivation;
        yield* PublicationTarget;
        if (doubles.failRecovery()) {
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
  vi.clearAllMocks();
  doubles.failRecovery.mockReturnValue(false);
});

describe("recover command", () => {
  it.effect(
    "wires exact identities, trusted keys, target, and renderer preflight",
    () =>
      Effect.gen(function* () {
        expect(yield* recoveryProgram()).toMatchObject({
          releaseId: recoveryId,
        });
        expect(doubles.activation).toHaveBeenLastCalledWith({
          endpoint: "https://www.example.test/api/internal/content/renderer",
          token: "renderer-token",
        });
        expect(doubles.recovery).toHaveBeenLastCalledWith(
          expect.objectContaining({ recoveryId, releaseId })
        );
        expect(doubles.target).toHaveBeenLastCalledWith({
          endpoint: "https://content.example.test/publish",
          timeout: "2 minutes",
          token: "publication-token",
        });
      })
  );

  it.effect("sanitizes publisher recovery failures", () =>
    Effect.gen(function* () {
      doubles.failRecovery.mockReturnValue(true);
      expect(yield* recoveryProgram().pipe(Effect.flip)).toMatchObject({
        _tag: "ProductionError",
        failure: "PublicationActivationError",
        stage: "recover",
      });
    })
  );
});
