import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { beforeEach, describe, expect, it } from "@effect/vitest";
import { ContractDecodeError } from "@nakafa/aksara-contracts/errors";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { prepareAcceptanceRelease } from "@nakafa/aksara-publisher/acceptance/preparation";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import { publishAcceptance } from "#cli/acceptance/publication";
import {
  AcceptanceEnvironmentError,
  readAcceptanceRenderer,
} from "#cli/acceptance/settings";
import { readCleanAksaraRevision } from "#cli/evidence";
import { ProductionError } from "#cli/failure";
import { PUBLICATION_TARGET_TIMEOUT } from "#cli/retry";
import { unusedExactProcess } from "#test/process";
import { RENDERER_MANIFEST } from "#test/real";

const state = vi.hoisted(() => ({
  allowInsecureLoopback: false,
  cacheDrained: 0,
  endpoint: "",
  keyMatches: false,
  published: 0,
  recoveryId: "",
  snapshotAttempts: 0,
  snapshotFailures: 0,
  snapshotInputs: [] as string[],
  sourceRoot: "",
  target: "empty" as "empty" | "active" | "candidate",
  targetReads: 0,
  timeout: "",
}));
vi.mock("#cli/acceptance/settings", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("#cli/acceptance/settings")>();
  const { generateKeyPairSync } = await import("node:crypto");
  const {
    GitCommitShaSchema: Sha,
    ReleaseIdSchema: Id,
    SigningKeyIdSchema: Key,
  } = await import("@nakafa/aksara-contracts/ids");
  const { Effect: Runtime, Redacted } = await import("effect");
  const { RENDERER_MANIFEST: renderer } = await import("#test/real");
  const pair = generateKeyPairSync("ed25519");
  return {
    ...original,
    readAcceptanceRenderer: vi.fn(() => Runtime.succeed(renderer)),
    readAcceptanceSettings: () =>
      Runtime.succeed({
        checkoutRoot: "/test/acceptance-source",
        endpoint: new URL("http://127.0.0.1:3210/internal/content/releases"),
        key: {
          keyId: Key.make("test-acceptance-key"),
          publicKeyPem: pair.publicKey
            .export({ format: "pem", type: "spki" })
            .toString(),
        },
        privateKeyPem: Redacted.make(
          pair.privateKey.export({ format: "pem", type: "pkcs8" }).toString()
        ),
        recoveryId: Id.make("test-acceptance-inverse"),
        releaseId: Id.make("test-acceptance-release"),
        rendererPath: "/test/renderer.json",
        revision: Sha.make("a".repeat(40)),
        token: Redacted.make("test-secret-publication-token"),
      }),
  };
});
vi.mock("#cli/evidence", async (importOriginal) => ({
  ...(await importOriginal<typeof import("#cli/evidence")>()),
  readCleanAksaraRevision: vi.fn(() =>
    Effect.succeed(GitCommitShaSchema.make("a".repeat(40)))
  ),
}));
vi.mock("@nakafa/aksara-publisher/target/http", async () =>
  (await import("#test/acceptance")).acceptanceTargetMock(state)
);
vi.mock("@nakafa/aksara-publisher/acceptance/preparation", async () => {
  const { Effect: Runtime } = await import("effect");
  const { gitBundle: bundle } = await import("#test/target");
  return {
    prepareAcceptanceRelease: vi.fn((input: { readonly releaseId: string }) =>
      Runtime.succeed({
        kind: "git",
        manifest: bundle(input.releaseId).release.manifest,
      })
    ),
  };
});
vi.mock("@nakafa/aksara-publisher/git/source", async () => {
  const { Effect: Runtime, Layer, Stream } = await import("effect");
  const { PublicationSource } = await import(
    "@nakafa/aksara-publisher/publication/spec"
  );
  return {
    makeGitPublicationSourceLive: (root: string) =>
      Layer.effect(
        PublicationSource,
        Runtime.sync(() => {
          state.sourceRoot = root;
          return PublicationSource.of({
            loadExactRevision: () => Stream.empty,
          });
        })
      ),
  };
});
vi.mock("@nakafa/aksara-publisher/publication", async () =>
  (await import("#test/acceptance")).acceptancePublicationMock(state)
);

/** Runs the complete outer boundary with network and process fallthrough disabled. */
const publish = Effect.fn("AcceptancePublicationTest.publish")(() =>
  publishAcceptance().pipe(
    Effect.provide([NodeServices.layer, NodeHttpClient.layerNodeHttp]),
    Effect.provideService(ExactProcess, unusedExactProcess)
  )
);

beforeEach(() => {
  Object.assign(state, {
    allowInsecureLoopback: false,
    cacheDrained: 0,
    endpoint: "",
    keyMatches: false,
    published: 0,
    recoveryId: "",
    snapshotAttempts: 0,
    snapshotFailures: 0,
    snapshotInputs: [],
    sourceRoot: "",
    target: "empty",
    targetReads: 0,
    timeout: "",
  });
  vi.mocked(readCleanAksaraRevision)
    .mockReset()
    .mockReturnValue(Effect.succeed(GitCommitShaSchema.make("a".repeat(40))));
  vi.mocked(readAcceptanceRenderer)
    .mockReset()
    .mockReturnValue(Effect.succeed(RENDERER_MANIFEST));
  vi.mocked(prepareAcceptanceRelease).mockClear();
});

describe("isolated acceptance publication", () => {
  it.effect(
    "pins source, target, signer, renderer, and inverse identity through activation",
    () =>
      Effect.gen(function* () {
        const receipt = yield* publish();
        expect(receipt.releaseId).toBe("test-acceptance-release");
        expect(state).toMatchObject({
          allowInsecureLoopback: true,
          cacheDrained: 1,
          endpoint: "http://127.0.0.1:3210/internal/content/releases",
          keyMatches: true,
          published: 1,
          recoveryId: "test-acceptance-inverse",
          sourceRoot: "/test/acceptance-source",
          targetReads: 1,
          timeout: PUBLICATION_TARGET_TIMEOUT,
        });
        expect(readCleanAksaraRevision).toHaveBeenCalledTimes(2);
        expect(readAcceptanceRenderer).toHaveBeenCalledTimes(2);
        expect(prepareAcceptanceRelease).toHaveBeenCalledWith({
          aksaraSha: "a".repeat(40),
          checkoutRoot: "/test/acceptance-source",
          releaseId: "test-acceptance-release",
          rendererManifest: RENDERER_MANIFEST,
        });
      })
  );

  it.live(
    "retries transient snapshot backpressure without repeating preparation",
    () =>
      Effect.gen(function* () {
        state.snapshotFailures = 2;
        const receipt = yield* publish();
        expect(receipt.releaseId).toBe("test-acceptance-release");
        expect(state.snapshotAttempts).toBe(3);
        expect(new Set(state.snapshotInputs).size).toBe(1);
        expect(state.published).toBe(1);
        expect(prepareAcceptanceRelease).toHaveBeenCalledTimes(1);
        expect(state.cacheDrained).toBe(1);
      })
  );

  it.effect(
    "rejects the wrong checkout revision before reading the target",
    () =>
      Effect.gen(function* () {
        vi.mocked(readCleanAksaraRevision).mockReturnValueOnce(
          Effect.succeed(GitCommitShaSchema.make("b".repeat(40)))
        );
        const error = yield* publish().pipe(Effect.flip);
        expect(error).toBeInstanceOf(ProductionError);
        expect(error).toMatchObject({
          failure: "AcceptanceEnvironmentError",
          stage: "publish",
        });
        expect(state.targetReads).toBe(0);
        expect(prepareAcceptanceRelease).not.toHaveBeenCalled();
      })
  );

  it.effect.each(["active", "candidate"] as const)(
    "rejects a target with an existing %s before preparing content",
    (target) =>
      Effect.gen(function* () {
        state.target = target;
        const error = yield* publish().pipe(Effect.flip);
        expect(error).toMatchObject({
          failure: "AcceptanceEnvironmentError",
          stage: "publish",
        });
        expect(prepareAcceptanceRelease).not.toHaveBeenCalled();
        expect(state.published).toBe(0);
      })
  );

  it.effect("rejects source movement observed after preparation", () =>
    Effect.gen(function* () {
      vi.mocked(readCleanAksaraRevision)
        .mockReturnValueOnce(
          Effect.succeed(GitCommitShaSchema.make("a".repeat(40)))
        )
        .mockReturnValueOnce(
          Effect.succeed(GitCommitShaSchema.make("b".repeat(40)))
        );
      const error = yield* publish().pipe(Effect.flip);
      expect(error).toMatchObject({
        failure: "ReleaseRevisionChangedError",
        stage: "publish",
      });
      expect(prepareAcceptanceRelease).toHaveBeenCalledTimes(1);
      expect(state.published).toBe(0);
    })
  );

  it.effect.each(["changed", "unreadable"])(
    "rejects a %s renderer before activation",
    (mode) =>
      Effect.gen(function* () {
        const changed = yield* createRendererManifest({
          base: RENDERER_MANIFEST.base,
          domains: RENDERER_MANIFEST.domains,
          publishedDomains: ["site"],
        });
        vi.mocked(readAcceptanceRenderer)
          .mockReturnValueOnce(Effect.succeed(RENDERER_MANIFEST))
          .mockReturnValueOnce(
            mode === "unreadable"
              ? Effect.fail(
                  new AcceptanceEnvironmentError({ reason: "renderer" })
                )
              : Effect.succeed(changed)
          );
        const error = yield* publish().pipe(Effect.flip);
        expect(error).toMatchObject({
          failure: "PublicationActivationError",
          phase: "preflight",
          stage: "publish",
        });
        expect(state.cacheDrained).toBe(0);
      })
  );

  it.effect(
    "sanitizes a preparation failure without exposing private diagnostics",
    () =>
      Effect.gen(function* () {
        vi.mocked(prepareAcceptanceRelease).mockReturnValueOnce(
          Effect.fail(
            new ContractDecodeError({
              cause: "test-secret-publication-token",
              contract: "TestAcceptance",
              message: "test-secret-publication-token",
            })
          )
        );
        const error = yield* publish().pipe(Effect.flip);
        expect(error).toMatchObject({
          failure: "ContractDecodeError",
          stage: "publish",
        });
        expect(JSON.stringify(error)).not.toContain(
          "test-secret-publication-token"
        );
        expect(state.published).toBe(0);
      })
  );
});
