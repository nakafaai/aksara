import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { readContentCatalogExpectation } from "#publisher/catalog/expectation";

const control = vi.hoisted(() => ({
  articles: [
    {
      route: {
        contentKey: "articles/politics/one",
        locale: "en",
        publicPath: "articles/politics/one",
      },
    },
  ],
  failure: false,
  materials: [
    {
      route: {
        contentKey: "material/lesson/mathematics/one",
        locale: "id",
        publicPath: "materi/matematika/one",
      },
    },
  ],
  questions: [
    {
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
      locale: "en",
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
        contentKey: "articles/politics/one",
        locale: "en",
        publicPath: "articles/politics/one",
      },
    },
  ];
  control.materials = [
    {
      route: {
        contentKey: "material/lesson/mathematics/one",
        locale: "id",
        publicPath: "materi/matematika/one",
      },
    },
  ];
  control.questions = [
    {
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
      locale: "en",
    },
  ];
});

/** Runs source expectation discovery through its platform boundary. */
function readExpectation() {
  return Effect.runPromise(
    readContentCatalogExpectation("/code/aksara").pipe(
      Effect.provide(NodeContext.layer)
    )
  );
}

describe("content catalog expectation", () => {
  it("projects exact source identities and public routes", async () => {
    await expect(readExpectation()).resolves.toEqual({
      articleCount: 1,
      heads: [
        {
          contentKey: "articles/politics/one",
          family: "article",
          locale: "en",
        },
        {
          contentKey: "material/lesson/mathematics/one",
          family: "material",
          locale: "id",
        },
        {
          contentKey:
            "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
          family: "question",
          locale: "en",
        },
      ],
      materialCount: 1,
      questionCount: 1,
      routes: [
        {
          current: {
            contentKey: "articles/politics/one",
            locale: "en",
          },
          next: {
            contentKey: "articles/politics/one",
            locale: "en",
            publicPath: "articles/politics/one",
          },
        },
        {
          current: {
            contentKey: "material/lesson/mathematics/one",
            locale: "id",
          },
          next: {
            contentKey: "material/lesson/mathematics/one",
            locale: "id",
            publicPath: "materi/matematika/one",
          },
        },
      ],
      totalCount: 3,
    });
  });

  it("derives additions and deletions directly from current sources", async () => {
    control.articles = [];
    control.questions.push({
      contentKey:
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-2/question",
      locale: "id",
    });

    await expect(readExpectation()).resolves.toMatchObject({
      articleCount: 0,
      materialCount: 1,
      questionCount: 2,
      totalCount: 3,
    });
  });

  it("owns registry failures behind one stable expectation error", async () => {
    control.failure = true;

    await expect(
      Effect.runPromise(
        readContentCatalogExpectation("/code/aksara").pipe(
          Effect.flip,
          Effect.provide(NodeContext.layer)
        )
      )
    ).resolves.toMatchObject({
      _tag: "ContentCatalogExpectationError",
      cause: "registry",
    });
  });
});
