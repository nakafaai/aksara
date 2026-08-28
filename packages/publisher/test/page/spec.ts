import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
import { Context, Effect, Layer, Path } from "effect";
import { testRendererDomains } from "#test/renderer";

export const pageFamilyScope = PublicationScopeSchema.make({
  families: ["page"],
  snapshots: [],
});
export const pageFixtureIdentities = [
  ["pages/developers", "de"],
  ["pages/developers", "en"],
  ["pages/developers", "id"],
  ["pages/imprint", "de"],
  ["pages/imprint", "en"],
  ["pages/imprint", "id"],
  ["pages/privacy-policy", "de"],
  ["pages/privacy-policy", "en"],
  ["pages/privacy-policy", "id"],
  ["pages/security-policy", "de"],
  ["pages/security-policy", "en"],
  ["pages/security-policy", "id"],
  ["pages/terms-of-service", "de"],
  ["pages/terms-of-service", "en"],
  ["pages/terms-of-service", "id"],
] as const;

/** Creates one exact test renderer while varying its compiler fingerprint. */
export const pageManifest = Effect.fn("PageTest.manifest")((baseVersion = 1) =>
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "InlineMath", version: baseVersion }],
      supportedComponents: [{ name: "InlineMath", version: baseVersion }],
    },
    domains: testRendererDomains({}),
    publishedDomains: ["site"],
  })
);

/** Loads the real page registry and its complete in-memory source map. */
const makePageTestFixtures = Effect.fn("PageTest.makeFixtures")(() =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const workingDirectory = yield* Effect.sync(() => process.cwd());
    const checkoutRoot = path.resolve(workingDirectory, "..", "..");
    const entries = yield* decodePageRegistry();
    const sourceRows = entries.map((entry) => {
      const absolutePath = path.resolve(checkoutRoot, entry.sourcePath);
      const source = `export const metadata = {
  title: "Test ${entry.route.pageKey}",
  description: "Reviewed public page fixture.",
  lastModified: "2026-08-20",
};

# Test ${entry.route.pageKey}
`;
      return [entry.sourcePath, absolutePath, source] as const;
    });
    const absolutePaths = new Map(
      sourceRows.map(([sourcePath, absolutePath]) => [sourcePath, absolutePath])
    );
    const sources = new Map(
      sourceRows.map(([, absolutePath, source]) => [absolutePath, source])
    );
    const rendererManifest = yield* pageManifest();

    return {
      absolutePaths,
      checkoutRoot,
      entries,
      rendererManifest,
      sources,
    };
  })
);

/** Shared scoped page fixture for direct Effect Vitest suites. */
export class PageTestFixtures extends Context.Service<
  PageTestFixtures,
  Effect.Success<ReturnType<typeof makePageTestFixtures>>
>()("AksaraPublisherTestPageFixtures") {}

export const pageTestLayer: Layer.Layer<PageTestFixtures> = Layer.effect(
  PageTestFixtures,
  makePageTestFixtures()
).pipe(Layer.provide(Path.layer), Layer.orDie);
