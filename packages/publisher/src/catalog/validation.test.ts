import { NodeContext } from "@effect/platform-node";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { validateContentCatalog } from "#publisher/catalog/validation";
import {
  catalogHeads,
  catalogIdentities,
  catalogResult,
  catalogRoutes,
  catalogTotal,
} from "#test/catalog";
import { testRendererDomains } from "#test/renderer";

const digest = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const IDENTITY_FAILURE = { _tag: "ContentCatalogIdentityError" };
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;
const snapshotEvidence = {
  program: {
    rowCount: 396,
    rowDigest: digest,
    sitemapCount: 52,
    snapshotId: digest,
  },
  quran: {
    projectionCount: 1428,
    projectionDigest: digest,
    provenanceDigest: digest,
    provenanceStatus: "blocked",
    runtimeCount: 1200,
    searchCount: 228,
    snapshotId: digest,
    sourceDigest: digest,
  },
  stagedRows: 2316,
  tryout: {
    catalogCount: 54,
    catalogDigest: digest,
    placementCount: 420,
    placementDigest: digest,
    routeCount: 48,
    snapshotId: digest,
  },
};
const control = vi.hoisted(() => ({
  actual: { article: 2, material: 3, question: 4 },
  catalogFailure: false,
  countMismatch: "none",
  expectedRouteConflict: false,
  identityMismatch: "none",
  recordFailure: false,
  records: 9,
  registryFailure: false,
  resultCalls: 0,
  resultFailure: false,
  routeFailure: false,
  routeMode: "complete",
  snapshotFailure: false,
  source: { article: 2, material: 3, question: 4 },
}));

vi.mock("#publisher/catalog/expectation", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies independently source-derived expectation controls. */
    readContentCatalogExpectation: () => {
      if (control.registryFailure) {
        return TestEffect.fail("registry");
      }
      const heads = catalogHeads(control.source).map((head) => ({ ...head }));
      if (control.identityMismatch !== "none") {
        const [first] = heads;
        if (first !== undefined) {
          if (control.identityMismatch === "content") {
            heads[0] = { ...first, contentKey: `${first.contentKey}-source` };
          } else if (control.identityMismatch === "family") {
            heads[0] = { ...first, family: "material" };
          } else {
            heads[0] = {
              ...first,
              locale: first.locale === "en" ? "id" : "en",
            };
          }
        }
      }
      const routes = catalogRoutes(heads, false);
      if (control.expectedRouteConflict) {
        const [first, second] = routes;
        if (first !== undefined && second !== undefined) {
          routes[1] = {
            ...second,
            next: {
              ...second.next,
              locale: first.next.locale,
              publicPath: first.next.publicPath,
            },
          };
        }
      }
      return TestEffect.succeed({
        articleCount:
          control.source.article +
          (control.countMismatch === "article" ? 1 : 0),
        heads,
        materialCount:
          control.source.material +
          (control.countMismatch === "material" ? 1 : 0),
        questionCount:
          control.source.question +
          (control.countMismatch === "question" ? 1 : 0),
        routes,
        totalCount: catalogTotal(control.source),
      });
    },
  };
});

vi.mock("#publisher/catalog/publication", async () => {
  const { Effect: TestEffect, Stream } = await import("effect");
  return {
    /** Supplies independently controlled publication output without compilation. */
    prepareContentCatalog: () => {
      if (control.catalogFailure) {
        return TestEffect.fail("catalog");
      }
      const publicRows = [
        ...catalogIdentities("article", control.actual.article),
        ...catalogIdentities("material", control.actual.material),
      ];
      const routes = catalogRoutes(publicRows, control.routeMode === "replace");
      return TestEffect.succeed({
        records: () =>
          control.recordFailure
            ? Stream.fail("records")
            : Stream.fromIterable(
                Array.from({ length: control.records }, () => undefined)
              ),
        result: () => {
          control.resultCalls += 1;
          return control.resultFailure
            ? Stream.fail("result")
            : Stream.fromIterable(catalogResult(control.actual));
        },
        routes: () =>
          control.routeFailure
            ? Stream.fail("routes")
            : Stream.fromIterable(
                control.routeMode === "drop" ? routes.slice(0, -1) : routes
              ),
      });
    },
  };
});

vi.mock("#publisher/catalog/snapshots", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("#publisher/catalog/snapshots")>();
  const { Effect: TestEffect } = await import("effect");
  return {
    ...original,
    /** Supplies controlled current-model structured validation evidence. */
    validateCatalogSnapshots: () =>
      control.snapshotFailure
        ? TestEffect.fail("snapshots")
        : TestEffect.succeed(snapshotEvidence),
  };
});

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "InlineMath", version: 1 }],
      supportedComponents: [{ name: "InlineMath", version: 1 }],
    },
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
  })
);

beforeEach(() => {
  control.actual = { article: 2, material: 3, question: 4 };
  control.catalogFailure = false;
  control.countMismatch = "none";
  control.expectedRouteConflict = false;
  control.identityMismatch = "none";
  control.recordFailure = false;
  control.records = 9;
  control.registryFailure = false;
  control.resultCalls = 0;
  control.resultFailure = false;
  control.routeFailure = false;
  control.routeMode = "complete";
  control.snapshotFailure = false;
  control.source = { article: 2, material: 3, question: 4 };
});

/** Builds full-catalog validation through scoped platform requirements. */
function validationProgram() {
  return Effect.scoped(
    validateContentCatalog({
      checkoutRoot: "/code/aksara",
      rendererManifest,
    })
  ).pipe(Effect.provide(NodeContext.layer));
}

/** Returns successful validation at the test runner boundary. */
function validate() {
  return Effect.runPromise(validationProgram());
}

/** Returns one typed validation failure without a FiberFailure wrapper. */
function rejectValidation() {
  return Effect.runPromise(validationProgram().pipe(Effect.flip));
}

describe("content catalog validation", () => {
  it("returns source-derived body, route, and structured evidence", async () => {
    await expect(validate()).resolves.toMatchObject({
      articleCount: 2,
      materialCount: 3,
      questionCount: 4,
      recordCount: 9,
      rendererManifestHash: rendererManifest.hash,
      resultDigest: expect.stringMatching(SHA256_PATTERN),
      routeCount: 5,
      snapshots: snapshotEvidence,
      totalCount: 9,
    });
    expect(control.resultCalls).toBe(1);
  });

  it.each(["article", "material", "question"])(
    "rejects an incomplete %s result family",
    async (kind) => {
      control.countMismatch = kind;

      await expect(rejectValidation()).resolves.toMatchObject({
        _tag: "ContentCatalogCountError",
        kind,
      });
    }
  );

  it("preserves a source identity mismatch as a public domain failure", async () => {
    control.identityMismatch = "content";
    await expect(rejectValidation()).resolves.toMatchObject(IDENTITY_FAILURE);
    control.identityMismatch = "none";
    control.source.question -= 1;
    await expect(rejectValidation()).resolves.toMatchObject(IDENTITY_FAILURE);
  });

  it("rejects a mismatched transition record count", async () => {
    control.records = 8;

    await expect(rejectValidation()).resolves.toMatchObject({
      _tag: "ContentCatalogCountError",
      actualCount: 8,
      kind: "records",
    });
  });

  it.each(["drop", "replace"])(
    "rejects a %s public route catalog",
    async (routeMode) => {
      control.routeMode = routeMode;
      await expect(rejectValidation()).resolves.toMatchObject({
        _tag:
          routeMode === "drop"
            ? "ContentCatalogCountError"
            : "ContentCatalogDigestError",
        kind: "routes",
      });
    }
  );

  it("owns invalid source route expectations", async () => {
    control.expectedRouteConflict = true;

    await expect(rejectValidation()).resolves.toMatchObject({
      _tag: "ContentCatalogValidationError",
      stage: "routes",
    });
  });

  it.each([
    ["registryFailure", "catalog"],
    ["catalogFailure", "catalog"],
    ["resultFailure", "result"],
    ["recordFailure", "result"],
    ["routeFailure", "routes"],
    ["snapshotFailure", "snapshots"],
  ] as const)(
    "owns a %s behind the stable validation error",
    async (field, stage) => {
      control[field] = true;

      await expect(rejectValidation()).resolves.toMatchObject({
        _tag: "ContentCatalogValidationError",
        stage,
      });
    }
  );
});
