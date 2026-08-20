import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { AppLocaleSchema } from "#contracts/locale";
import {
  CurriculumNodeKeySchema,
  CurriculumRouteDraftSchema,
  CurriculumRouteSchema,
  canonicalizeCurriculumRoute,
  curriculumNamespace,
} from "#contracts/program/curriculum";

const merdekaRoute = {
  appLocale: "en",
  iconKey: "mathematics",
  kind: "curriculum-context",
  level: "subject",
  nodeKey: "class-10-mathematics",
  order: 10,
  parentPath: "curriculum/merdeka/class-10",
  programKey: "merdeka",
  publicPath: "curriculum/merdeka/class-10/mathematics",
  sitemap: true,
  sourcePath: "packages/corpus/curriculum/merdeka",
  title: "Mathematics",
} as const;

/** Formats one expected strict schema failure for message assertions. */
function formatFailure(result: Exit.Exit<unknown, Schema.SchemaError>) {
  if (Exit.isSuccess(result)) {
    throw new Error("Expected curriculum schema decoding to fail.");
  }
  return String(result.cause);
}

describe("curriculum route contract", () => {
  it("decodes and canonicalizes a real localized route", () => {
    const route = Schema.decodeSync(CurriculumRouteSchema)(merdekaRoute);

    expect(JSON.parse(canonicalizeCurriculumRoute(route))).toEqual(
      merdekaRoute
    );
  });

  it("accepts complete material ownership and optional card metadata", () => {
    const route = Schema.decodeSync(CurriculumRouteSchema)({
      ...merdekaRoute,
      canonicalPath: "subjects/mathematics/linear-equation-inequality",
      displayGroupIconKey: "mathematics",
      displayGroupTitle: "Algebra",
      materialCardDescription: "Explore equations and inequalities.",
      materialCardTitle: "Linear relationships",
      materialContextNodeKey: "class-10-mathematics-algebra",
      materialContextParentPath: merdekaRoute.publicPath,
      materialContextPublicPath:
        "curriculum/merdeka/class-10/mathematics/algebra",
      materialDomain: "mathematics",
      materialKey: "lesson.mathematics.linear-equation-inequality",
      nodeKey: "class-10-mathematics-linear-equation-inequality",
      parentPath: "curriculum/merdeka/class-10/mathematics/algebra",
      publicPath:
        "curriculum/merdeka/class-10/mathematics/algebra/linear-equation-inequality",
      sitemap: false,
      title: "Linear Equations and Inequalities",
    });

    expect(JSON.parse(canonicalizeCurriculumRoute(route))).toMatchObject({
      canonicalPath: "subjects/mathematics/linear-equation-inequality",
      materialContextNodeKey: "class-10-mathematics-algebra",
      materialKey: "lesson.mathematics.linear-equation-inequality",
    });
  });

  it.each([
    [
      "wrong locale namespace",
      { appLocale: "id", publicPath: merdekaRoute.publicPath },
    ],
    [
      "wrong source ownership",
      { sourcePath: "packages/corpus/curriculum/cambridge-international" },
    ],
    ["wrong parent", { parentPath: "curriculum/merdeka" }],
    ["partial material binding", { materialKey: "lesson.mathematics.matrix" }],
    [
      "partial context binding",
      {
        canonicalPath: "subjects/mathematics/matrix",
        materialContextNodeKey: "class-10-mathematics",
        materialKey: "lesson.mathematics.matrix",
      },
    ],
    [
      "context without material",
      {
        materialContextNodeKey: "class-10-mathematics",
        materialContextParentPath: "curriculum/merdeka/class-10",
        materialContextPublicPath: merdekaRoute.publicPath,
      },
    ],
    ["invalid root", { parentPath: undefined }],
    ["non-renderable sitemap row", { level: "lesson", sitemap: true }],
  ])("rejects %s", (_, change) => {
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(CurriculumRouteSchema)({
          ...merdekaRoute,
          ...change,
        })
      )
    ).toBe(true);
  });

  it("accepts the exact localized curriculum root shape", () => {
    const root = Schema.decodeSync(CurriculumRouteSchema)({
      appLocale: "id",
      iconKey: "state",
      kind: "curriculum-context",
      level: "track",
      nodeKey: "merdeka:root",
      order: 10,
      programKey: "merdeka",
      publicPath: "kurikulum/merdeka",
      sitemap: true,
      sourcePath: "packages/corpus/curriculum/merdeka",
      title: "Kurikulum Merdeka",
    });

    expect(root.nodeKey).toBe("merdeka:root");
  });

  it("owns the exact German namespace and current route policy", () => {
    const root = Schema.decodeSync(CurriculumRouteSchema)({
      appLocale: "de",
      iconKey: "state",
      kind: "curriculum-context",
      level: "track",
      nodeKey: "merdeka:root",
      order: 10,
      programKey: "merdeka",
      publicPath: "lehrplaene/merdeka",
      sitemap: true,
      sourcePath: "packages/corpus/curriculum/merdeka",
      title: "Merdeka Lehrplan",
    });

    expect(curriculumNamespace(AppLocaleSchema.make("de"))).toBe("lehrplaene");
    expect(root.publicPath).toBe("lehrplaene/merdeka");
  });

  it("reports every current route ownership failure", () => {
    const german = {
      ...merdekaRoute,
      appLocale: "de",
      parentPath: "lehrplaene/merdeka/class-10",
      publicPath: "lehrplaene/merdeka/class-10/mathematik",
      title: "Mathematik",
    } as const;
    const routeFailure = Schema.decodeExit(CurriculumRouteSchema)({
      ...german,
      publicPath: merdekaRoute.publicPath,
    });
    const materialFailure = Schema.decodeExit(CurriculumRouteSchema)({
      ...german,
      materialKey: "lesson.mathematics.matrix",
    });
    const sitemapFailure = Schema.decodeExit(CurriculumRouteSchema)({
      ...german,
      level: "lesson",
    });
    const draft = Schema.decodeSync(CurriculumRouteDraftSchema)({
      ...german,
      canonicalPath: "subjects/mathematics/matrix",
      materialKey: "lesson.mathematics.matrix",
    });
    const contextFailure = Schema.decodeExit(CurriculumRouteSchema)(draft);

    expect(formatFailure(routeFailure)).toContain(
      "Expected coherent localized curriculum route ownership."
    );
    expect(formatFailure(materialFailure)).toContain(
      "Expected coherent curriculum material ownership."
    );
    expect(formatFailure(sitemapFailure)).toContain(
      "Expected only renderable curriculum sitemap routes."
    );
    expect(formatFailure(contextFailure)).toContain(
      "Expected complete curriculum material context ownership."
    );
  });

  it("reports each exact curriculum ownership failure", () => {
    const routeFailure = Schema.decodeExit(CurriculumRouteSchema)({
      ...merdekaRoute,
      appLocale: "id",
    });
    const materialFailure = Schema.decodeExit(CurriculumRouteSchema)({
      ...merdekaRoute,
      materialKey: "lesson.mathematics.matrix",
    });
    const sitemapFailure = Schema.decodeExit(CurriculumRouteSchema)({
      ...merdekaRoute,
      level: "lesson",
    });
    const incompleteMaterial = {
      ...merdekaRoute,
      canonicalPath: "subjects/mathematics/matrix",
      materialKey: "lesson.mathematics.matrix",
    };
    const draft = Schema.decodeSync(CurriculumRouteDraftSchema)(
      incompleteMaterial
    );
    const contextFailure = Schema.decodeExit(CurriculumRouteSchema)(draft);
    const nodeFailure = Schema.decodeExit(CurriculumNodeKeySchema)(
      "Invalid Node"
    );

    expect(formatFailure(routeFailure)).toContain(
      "Expected coherent localized curriculum route ownership."
    );
    expect(formatFailure(materialFailure)).toContain(
      "Expected coherent curriculum material ownership."
    );
    expect(formatFailure(sitemapFailure)).toContain(
      "Expected only renderable curriculum sitemap routes."
    );
    expect(formatFailure(contextFailure)).toContain(
      "Expected complete curriculum material context ownership."
    );
    expect(formatFailure(nodeFailure)).toContain(
      "Invalid curriculum node key."
    );
  });
});
