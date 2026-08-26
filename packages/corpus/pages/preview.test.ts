import { describe, expect, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import {
  decodePagePreviewEntries,
  decodePagePreviewEntry,
} from "#corpus/pages/preview";
import { pageSource } from "#corpus/test/page";

const englishPath = CorpusSourcePathSchema.make(
  "packages/corpus/pages/privacy-policy/en.mdx"
);
const germanPath = CorpusSourcePathSchema.make(
  "packages/corpus/pages/privacy-policy/de.mdx"
);

describe("public page preview projection", () => {
  it("projects every selected locale through the same source owner", async () => {
    const entries = await Effect.runPromise(
      decodePagePreviewEntries([englishPath, germanPath], [pageSource()])
    );

    expect(entries.map(({ route }) => route.appLocale)).toEqual(["en", "de"]);
    expect(entries[1]).toMatchObject({
      rendererDomain: "site",
      route: {
        contentKey: "pages/privacy-policy",
        publicPath: "privacy-policy",
      },
    });
  });

  it("returns one exact selection and no invented unselected body", async () => {
    const selected = await Effect.runPromise(
      decodePagePreviewEntry(germanPath, [pageSource()])
    );
    const empty = await Effect.runPromise(
      decodePagePreviewEntries([], [pageSource()])
    );
    const activeWithCandidateInput = await Effect.runPromise(
      decodePagePreviewEntries([englishPath], [pageSource()])
    );

    expect(selected?.sourcePath).toBe(germanPath);
    expect(empty).toEqual([]);
    expect(activeWithCandidateInput).toHaveLength(1);
  });

  it("maps an invalid projected entry to the registry failure model", async () => {
    const oversizedPageKey = "a".repeat(507);
    const invalid = pageSource({
      pageKey: oversizedPageKey,
      sourceRoot: `pages/${oversizedPageKey}`,
    });
    const path = CorpusSourcePathSchema.make(
      `packages/corpus/pages/${oversizedPageKey}/en.mdx`
    );
    const error = await Effect.runPromise(
      decodePagePreviewEntry(path, [invalid]).pipe(Effect.flip)
    );

    expect(error._tag).toBe("PageRegistryError");
  });
});
