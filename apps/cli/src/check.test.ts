import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { beforeEach, describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import { runCheckCommand } from "#cli/check";
import { unusedExactProcess } from "#test/process";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const control = vi.hoisted(() => ({
  revisionCalls: 0,
  revisionChanged: false,
  status: "approved" as "approved" | "blocked",
  validation: undefined as
    | {
        readonly checkoutRoot: string;
        readonly rendererManifest: { readonly hash: string };
      }
    | undefined,
}));

vi.mock("#cli/environment/read", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies one explicit sibling checkout for the command test. */
    readPreviewEnvironment: () =>
      TestEffect.succeed({ nakafaAppDir: "/code/nakafa.com" }),
  };
});

vi.mock("#cli/evidence", async () => {
  const { GitCommitShaSchema } = await import("@nakafa/aksara-contracts/ids");
  const { Effect: TestEffect } = await import("effect");
  return {
    readCleanAksaraRevision: () => {
      control.revisionCalls += 1;
      const changed = control.revisionChanged && control.revisionCalls === 2;
      return TestEffect.succeed(
        GitCommitShaSchema.make((changed ? "b" : "a").repeat(40))
      );
    },
    validateStableAksaraRevision: (expected: string, actual: string) =>
      expected === actual
        ? TestEffect.void
        : TestEffect.fail({
            _tag: "ReleaseRevisionChangedError",
            actual,
            expected,
          }),
  };
});

vi.mock("#cli/nakafa", async () => {
  const { Layer } = await import("effect");
  return { NakafaAppLive: Layer.empty };
});

vi.mock("#cli/renderer/session", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies one authenticated actual-renderer session identity. */
    openRendererSession: () =>
      TestEffect.succeed({
        aksaraRoot: "/code/aksara",
        manifest: { hash },
      }),
  };
});

vi.mock("@nakafa/aksara-publisher/catalog/validation", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records validation input and returns complete current-model evidence. */
    validateContentCatalog: (input: NonNullable<typeof control.validation>) => {
      control.validation = input;
      return TestEffect.succeed({
        articleCount: 14,
        materialCount: 766,
        pageCount: 8,
        questionCount: 3360,
        recordCount: 4146,
        rendererManifestHash: hash,
        resultDigest: hash,
        routeCount: 786,
        routeDigest: hash,
        snapshots: {
          program: {
            rowCount: 396,
            rowDigest: hash,
            sitemapCount: 52,
            snapshotId: hash,
          },
          quran: {
            projectionCount: 1428,
            projectionDigest: hash,
            provenanceDigest: hash,
            provenanceStatus: control.status,
            runtimeCount: 1200,
            searchCount: 228,
            snapshotId: hash,
            sourceDigest: hash,
          },
          stagedRows: 2316,
          tryout: {
            catalogCount: 54,
            catalogDigest: hash,
            placementCount: 420,
            placementDigest: hash,
            routeCount: 48,
            snapshotId: hash,
          },
        },
        totalCount: 4146,
      });
    },
  };
});

beforeEach(() => {
  control.revisionCalls = 0;
  control.revisionChanged = false;
  control.status = "approved";
  control.validation = undefined;
});

/** Builds the command with its real platform boundary services. */
function checkProgram() {
  return runCheckCommand("/code/aksara").pipe(
    Effect.provide(NodeHttpClient.layerNodeHttp),
    Effect.provideService(ExactProcess, unusedExactProcess),
    Effect.provide(NodeServices.layer)
  );
}

describe("catalog check command", () => {
  it.effect(
    "returns complete evidence only when every publication gate is approved",
    () =>
      Effect.gen(function* () {
        const result = yield* checkProgram();

        expect(control.validation).toEqual({
          checkoutRoot: "/code/aksara",
          rendererManifest: { hash },
        });
        expect(result).toMatchObject({
          snapshots: { quran: { provenanceStatus: "approved" } },
          totalCount: 4146,
        });
      })
  );

  it.effect(
    "reports the exact Quran gate and fails closed while it is blocked",
    () =>
      Effect.gen(function* () {
        control.status = "blocked";

        expect(yield* checkProgram().pipe(Effect.flip)).toMatchObject({
          _tag: "CatalogCheckBlockedError",
          provenanceDigest: hash,
        });
      })
  );

  it.effect("rejects source drift during catalog validation", () =>
    Effect.gen(function* () {
      control.revisionChanged = true;

      expect(yield* checkProgram().pipe(Effect.flip)).toMatchObject({
        _tag: "ReleaseRevisionChangedError",
        actual: "b".repeat(40),
        expected: "a".repeat(40),
      });
    })
  );
});
