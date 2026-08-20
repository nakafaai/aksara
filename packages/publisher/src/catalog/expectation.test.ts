import { NodeServices } from "@effect/platform-node";
import { beforeEach, describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { vi } from "vitest";
import { readContentCatalogExpectation } from "#publisher/catalog/expectation";

const control = vi.hoisted(() => ({
  articles: [
    {
      route: {
        appLocale: "en",
        artifactLocale: "en",
        contentKey: "articles/politics/one",
        publicPath: "articles/politics/one",
      },
    },
  ],
  failure: false,
  materials: [
    {
      route: {
        appLocale: "id",
        artifactLocale: "id",
        contentKey: "material/lesson/mathematics/one",
        publicPath: "materi/matematika/one",
      },
    },
  ],
  pages: [
    {
      route: {
        appLocale: "en",
        artifactLocale: "en",
        contentKey: "pages/privacy-policy",
        publicPath: "privacy-policy",
      },
    },
  ],
  questions: [
    {
      artifactLocale: "en",
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
    },
  ],
}));

vi.mock("@nakafa/aksara-corpus/articles/registry", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies controlled article identities without authored fixtures. */
    decodeArticleRegistry: () =>
      control.failure
        ? TestEffect.fail("registry")
        : TestEffect.succeed(control.articles),
  };
});

vi.mock("@nakafa/aksara-corpus/material/registry", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies controlled material identities without authored fixtures. */
    decodeMaterialRegistry: () => TestEffect.succeed(control.materials),
  };
});

vi.mock("@nakafa/aksara-corpus/pages/registry", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies controlled page identities without authored fixtures. */
    decodePageRegistry: () => TestEffect.succeed(control.pages),
  };
});

vi.mock("@nakafa/aksara-corpus/tryout/content", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies controlled question identities from one try-out scan. */
    loadTryoutContent: () => TestEffect.succeed({ entries: control.questions }),
  };
});

beforeEach(() => {
  control.failure = false;
  control.articles = [
    {
      route: {
        appLocale: "en",
        artifactLocale: "en",
        contentKey: "articles/politics/one",
        publicPath: "articles/politics/one",
      },
    },
  ];
  control.materials = [
    {
      route: {
        appLocale: "id",
        artifactLocale: "id",
        contentKey: "material/lesson/mathematics/one",
        publicPath: "materi/matematika/one",
      },
    },
  ];
  control.pages = [
    {
      route: {
        appLocale: "en",
        artifactLocale: "en",
        contentKey: "pages/privacy-policy",
        publicPath: "privacy-policy",
      },
    },
  ];
  control.questions = [
    {
      artifactLocale: "en",
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
    },
  ];
});

/** Runs source expectation discovery through its platform boundary. */
function readExpectation() {
  return Effect.runPromise(
    readContentCatalogExpectation("/code/aksara").pipe(
      Effect.provide(NodeServices.layer)
    )
  );
}

describe("content catalog expectation", () => {
  it("projects exact source identities and public routes", async () => {
    await expect(readExpectation()).resolves.toEqual({
      articleCount: 1,
      heads: [
        {
          artifactLocale: "en",
          contentKey: "articles/politics/one",
          family: "article",
        },
        {
          artifactLocale: "id",
          contentKey: "material/lesson/mathematics/one",
          family: "material",
        },
        {
          artifactLocale: "en",
          contentKey: "pages/privacy-policy",
          family: "page",
        },
        {
          artifactLocale: "en",
          contentKey:
            "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
          family: "question",
        },
      ],
      materialCount: 1,
      pageCount: 1,
      questionCount: 1,
      routes: [
        {
          current: {
            appLocale: "en",
            contentKey: "articles/politics/one",
          },
          next: {
            appLocale: "en",
            contentKey: "articles/politics/one",
            publicPath: "articles/politics/one",
          },
        },
        {
          current: {
            appLocale: "id",
            contentKey: "material/lesson/mathematics/one",
          },
          next: {
            appLocale: "id",
            contentKey: "material/lesson/mathematics/one",
            publicPath: "materi/matematika/one",
          },
        },
        {
          current: {
            appLocale: "en",
            contentKey: "pages/privacy-policy",
          },
          next: {
            appLocale: "en",
            contentKey: "pages/privacy-policy",
            publicPath: "privacy-policy",
          },
        },
      ],
      totalCount: 4,
    });
  });

  it("derives additions and deletions directly from current sources", async () => {
    control.articles = [];
    control.questions.push({
      artifactLocale: "id",
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-2/question",
    });

    await expect(readExpectation()).resolves.toMatchObject({
      articleCount: 0,
      materialCount: 1,
      pageCount: 1,
      questionCount: 2,
      totalCount: 4,
    });
  });

  it("owns registry failures behind one stable expectation error", async () => {
    control.failure = true;

    await expect(
      Effect.runPromise(
        readContentCatalogExpectation("/code/aksara").pipe(
          Effect.flip,
          Effect.provide(NodeServices.layer)
        )
      )
    ).resolves.toMatchObject({
      _tag: "ContentCatalogExpectationError",
      cause: "registry",
    });
  });
});
