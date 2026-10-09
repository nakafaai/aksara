import { NodeServices } from "@effect/platform-node";
import { beforeEach, describe, expect, it } from "@effect/vitest";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Array as Arr, Effect } from "effect";
import { validateContentCatalog } from "#publisher/catalog/validation";
import {
  catalogHeads,
  catalogIdentities,
  catalogResult,
  catalogRoutes,
  catalogSnapshotEvidence,
  catalogTotal,
} from "#test/catalog";
import { testRendererDomains } from "#test/renderer";

const IDENTITY_FAILURE = { _tag: "ContentCatalogIdentityError" };
const control = vi.hoisted(() => ({
  actual: { article: 2, material: 3, page: 1, question: 4 },
  catalogFailure: false,
  countMismatch: "none",
  expectedRouteConflict: false,
  identityMismatch: "none",
  recordFailure: false,
  records: 10,
  registryFailure: false,
  resultCalls: 0,
  resultFailure: false,
  routeFailure: false,
  routeMode: "complete",
  snapshotFailure: false,
  source: { article: 2, material: 3, page: 1, question: 4 },
}));

vi.mock("#publisher/catalog/expectation", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies independently source-derived expectation controls. */
    readContentCatalogExpectation: () => {
      if (control.registryFailure) {
        return TestEffect.fail("registry");
      }
      const heads = Arr.map(catalogHeads(control.source), (head) => ({
        ...head,
      }));
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
              artifactLocale: ArtifactLocaleSchema.make(
                first.artifactLocale === "en" ? "id" : "en"
              ),
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
              appLocale: first.next.appLocale,
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
        pageCount:
          control.source.page + (control.countMismatch === "page" ? 1 : 0),
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
        ...catalogIdentities("page", control.actual.page),
      ];
      const routes = catalogRoutes(publicRows, control.routeMode === "replace");
      return TestEffect.succeed({
        records: control.recordFailure
          ? Stream.fail("records")
          : Stream.fromIterable(
              Array.from({ length: control.records }, () => undefined)
            ),
        result: Stream.suspend(() => {
          control.resultCalls += 1;
          return control.resultFailure
            ? Stream.fail("result")
            : Stream.fromIterable(catalogResult(control.actual));
        }),
        routes: control.routeFailure
          ? Stream.fail("routes")
          : Stream.fromIterable(
              control.routeMode === "drop" ? Arr.dropRight(routes, 1) : routes
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
        : TestEffect.succeed(catalogSnapshotEvidence),
  };
});

const rendererManifestProgram = createRendererManifest({
  base: ["InlineMath"],
  domains: testRendererDomains({}),
  publishedDomains: ["mathematics"],
});

beforeEach(() => {
  control.actual = { article: 2, material: 3, page: 1, question: 4 };
  control.catalogFailure = false;
  control.countMismatch = "none";
  control.expectedRouteConflict = false;
  control.identityMismatch = "none";
  control.recordFailure = false;
  control.records = 10;
  control.registryFailure = false;
  control.resultCalls = 0;
  control.resultFailure = false;
  control.routeFailure = false;
  control.routeMode = "complete";
  control.snapshotFailure = false;
  control.source = { article: 2, material: 3, page: 1, question: 4 };
});

/** Builds full-catalog validation through scoped platform requirements. */
function validationProgram() {
  return Effect.gen(function* () {
    const rendererManifest = yield* rendererManifestProgram;
    const evidence = yield* Effect.scoped(
      validateContentCatalog({
        checkoutRoot: "/code/aksara",
        rendererManifest,
      })
    );
    return { evidence, rendererManifest };
  }).pipe(Effect.provide(NodeServices.layer));
}

/** Returns one typed validation failure without a FiberFailure wrapper. */
function rejectValidation() {
  return validationProgram().pipe(Effect.flip);
}

describe("content catalog validation", () => {
  it.effect("returns source-derived body, route, and structured evidence", () =>
    Effect.gen(function* () {
      const { evidence, rendererManifest } = yield* validationProgram();
      expect(evidence).toMatchObject({
        articleCount: 2,
        materialCount: 3,
        pageCount: 1,
        questionCount: 4,
        recordCount: 10,
        rendererManifestHash: rendererManifest.hash,
        resultDigest:
          "sha256:72c630a3cc3fbd839fa9ffb426e143340a55f9d21b405840ff9ba30538626690",
        routeCount: 6,
        routeDigest:
          "sha256:a8524abdccbf6327948aaef6aacf3d3e7eee3ae63d20ba6ad99d09217d8449a6",
        snapshots: catalogSnapshotEvidence,
        totalCount: 10,
      });
      expect(control.resultCalls).toBe(1);
    })
  );
  it.effect.each(["article", "material", "page", "question"] as const)(
    "rejects an incomplete %s result family",
    (kind) => {
      control.countMismatch = kind;
      return rejectValidation().pipe(
        Effect.map((error) =>
          expect(error).toMatchObject({
            _tag: "ContentCatalogCountError",
            kind,
          })
        )
      );
    }
  );
  it.effect(
    "preserves a source identity mismatch as a public domain failure",
    () =>
      Effect.gen(function* () {
        control.identityMismatch = "content";
        expect(yield* rejectValidation()).toMatchObject(IDENTITY_FAILURE);
        control.identityMismatch = "none";
        control.source.question -= 1;
        expect(yield* rejectValidation()).toMatchObject(IDENTITY_FAILURE);
      })
  );
  it.effect("rejects a mismatched transition record count", () => {
    control.records = 9;
    return rejectValidation().pipe(
      Effect.map((error) =>
        expect(error).toMatchObject({
          _tag: "ContentCatalogCountError",
          actualCount: 9,
          kind: "records",
        })
      )
    );
  });
  it.effect.each(["drop", "replace"] as const)(
    "rejects a %s public route catalog",
    (routeMode) => {
      control.routeMode = routeMode;
      return rejectValidation().pipe(
        Effect.map((error) =>
          expect(error).toMatchObject({
            _tag:
              routeMode === "drop"
                ? "ContentCatalogCountError"
                : "ContentCatalogDigestError",
            kind: "routes",
            ...(routeMode === "replace" && {
              actualDigest:
                "sha256:65611e33e4c9303b1699ffef7616cd16f6c5678bdf6c433e01c3d1d67aecb893",
              expectedDigest:
                "sha256:a8524abdccbf6327948aaef6aacf3d3e7eee3ae63d20ba6ad99d09217d8449a6",
            }),
          })
        )
      );
    }
  );
  it.effect("owns invalid source route expectations", () => {
    control.expectedRouteConflict = true;
    return rejectValidation().pipe(
      Effect.map((error) =>
        expect(error).toMatchObject({
          _tag: "ContentCatalogValidationError",
          stage: "routes",
        })
      )
    );
  });
  it.effect.each([
    ["registryFailure", "catalog"],
    ["catalogFailure", "catalog"],
    ["resultFailure", "result"],
    ["recordFailure", "result"],
    ["routeFailure", "routes"],
    ["snapshotFailure", "snapshots"],
  ] as const)(
    "owns a %s behind the stable validation error",
    ([field, stage]) => {
      control[field] = true;
      return rejectValidation().pipe(
        Effect.map((error) =>
          expect(error).toMatchObject({
            _tag: "ContentCatalogValidationError",
            stage,
          })
        )
      );
    }
  );
});
