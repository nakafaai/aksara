import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  EditorialReviewCoverageIdentityError,
  requirementsForHead,
} from "#publisher/editorial/requirements";
import { editorialCoverageHeads, makeEditorialHead } from "#test/editorial";

const germanAppLocales = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)([
  "en",
  "id",
  "de",
]);

/** Returns one typed identity failure without a FiberFailure wrapper. */
function reject(
  sourcePath: string,
  family: "material" | "question",
  activeAppLocales: ActiveAppLocaleList = germanAppLocales
) {
  const head = makeEditorialHead({
    artifactLocale: "de",
    family,
    sourcePath,
  });
  return Effect.runPromise(
    requirementsForHead(head, activeAppLocales).pipe(Effect.flip)
  );
}

describe("editorial review requirements", () => {
  it("binds German authored bodies to both source-locale siblings", async () => {
    const sourcePath = "packages/corpus/material/test/editorial/de.mdx";
    const head = makeEditorialHead({
      artifactLocale: "de",
      family: "material",
      sourcePath,
    });

    await expect(
      Effect.runPromise(requirementsForHead(head, germanAppLocales))
    ).resolves.toMatchObject([
      {
        requiredSourcePaths: [
          "packages/corpus/material/test/editorial/en.mdx",
          "packages/corpus/material/test/editorial/id.mdx",
        ],
        targetPath: sourcePath,
      },
    ]);
  });

  it("rejects a German body without a locale-owned filename", async () => {
    const wrongLocale = await reject(
      "packages/corpus/material/test/editorial/oxide.mdx",
      "material"
    );
    const wrongBoundary = await reject(
      "packages/corpus/material/test/editorial/myde.mdx",
      "material"
    );

    expect(wrongLocale).toBeInstanceOf(EditorialReviewCoverageIdentityError);
    expect(wrongBoundary).toBeInstanceOf(EditorialReviewCoverageIdentityError);
  });

  it.each([
    ["packages/corpus/question-bank/invalid/question.en.mdx", germanAppLocales],
    [
      `${editorialCoverageHeads.questionRoot}/general-reasoning/set-1/question-1/choices.ts`,
      germanAppLocales,
    ],
    [
      `${editorialCoverageHeads.questionRoot}/general-reasoning/set-1/question-1/question.de.mdx`,
      ACTIVE_APP_LOCALES,
    ],
    [
      `${editorialCoverageHeads.questionRoot}/general-reasoning/set-1/question-1/question.en.mdx`,
      germanAppLocales,
    ],
  ] as const)(
    "rejects a question head outside current body policy: %s",
    async (path, locales) => {
      const error = await reject(path, "question", locales);

      expect(error).toBeInstanceOf(EditorialReviewCoverageIdentityError);
    }
  );
});
