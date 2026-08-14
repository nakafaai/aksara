import { NodeContext, NodeHttpClient } from "@effect/platform-node";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
        questionCount: 3360,
        recordCount: 4140,
        rendererManifestHash: hash,
        resultDigest: hash,
        routeCount: 780,
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
        totalCount: 4140,
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

/** Runs the command through its real platform boundary services. */
function check() {
  return Effect.runPromise(
    runCheckCommand("/code/aksara").pipe(
      Effect.provide(NodeHttpClient.layer),
      Effect.provideService(ExactProcess, unusedExactProcess),
      Effect.provide(NodeContext.layer)
    )
  );
}

/** Returns one typed check failure through the same platform boundary. */
function rejectCheck() {
  return Effect.runPromise(
    runCheckCommand("/code/aksara").pipe(
      Effect.flip,
      Effect.provide(NodeHttpClient.layer),
      Effect.provideService(ExactProcess, unusedExactProcess),
      Effect.provide(NodeContext.layer)
    )
  );
}

describe("catalog check command", () => {
  it("returns complete evidence only when every publication gate is approved", async () => {
    const result = await check();

    expect(control.validation).toEqual({
      checkoutRoot: "/code/aksara",
      rendererManifest: { hash },
    });
    expect(result).toMatchObject({
      snapshots: { quran: { provenanceStatus: "approved" } },
      totalCount: 4140,
    });
  });

  it("reports the exact Quran gate and fails closed while it is blocked", async () => {
    control.status = "blocked";

    await expect(rejectCheck()).resolves.toMatchObject({
      _tag: "CatalogCheckBlockedError",
      provenanceDigest: hash,
    });
  });

  it("rejects source drift during catalog validation", async () => {
    control.revisionChanged = true;

    await expect(rejectCheck()).resolves.toMatchObject({
      _tag: "ReleaseRevisionChangedError",
      actual: "b".repeat(40),
      expected: "a".repeat(40),
    });
  });
});
