import { NodeServices } from "@effect/platform-node";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import { decodeMaterialDomains } from "#corpus/material/domain";
import {
  decodeMaterialPreviewEntries,
  decodeMaterialPreviewEntry,
} from "#corpus/material/preview";
import { selectMaterialEntry } from "#corpus/preview/public";
import { lessonMaterialSource } from "#corpus/test/material";
import { corpusRoot } from "#corpus/test/question-layer";

const englishPath = CorpusSourcePathSchema.make(
  "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx"
);
const germanPath = CorpusSourcePathSchema.make(
  "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/de.mdx"
);

/** Resolves the one descriptor used by the representative material source. */
async function mathematicsDomain() {
  const descriptors = await Effect.runPromise(decodeMaterialDomains());
  const descriptor = descriptors.find(({ key }) => key === "mathematics");
  if (descriptor === undefined) {
    throw new Error("Expected the mathematics material domain.");
  }
  return descriptor;
}

describe("material preview projection", () => {
  it("projects every selected body through one source owner", async () => {
    const descriptor = await mathematicsDomain();
    const entries = await Effect.runPromise(
      decodeMaterialPreviewEntries(
        [englishPath, germanPath],
        [lessonMaterialSource()],
        [descriptor]
      )
    );

    expect(entries.map(({ route }) => route.appLocale)).toEqual(["de", "en"]);
    expect(entries.find(({ route }) => route.appLocale === "de")).toMatchObject(
      {
        route: {
          contentKey:
            "material/lesson/mathematics/function-composition-inverse-function/function-concept",
          publicPath:
            "faecher/mathematik/funktionskomposition-und-umkehrfunktion/funktionsbegriff",
          topicTitle: "Funktionskomposition und Umkehrfunktion",
        },
      }
    );
  });

  it("returns one exact selected entry and no invented unselected body", async () => {
    const descriptor = await mathematicsDomain();
    const selected = await Effect.runPromise(
      decodeMaterialPreviewEntry(
        germanPath,
        [lessonMaterialSource()],
        [descriptor]
      )
    );
    const empty = await Effect.runPromise(
      decodeMaterialPreviewEntries([], [lessonMaterialSource()], [descriptor])
    );

    if (selected === undefined) {
      throw new Error("Expected the selected German material.");
    }
    const selection = await Effect.runPromise(
      selectMaterialEntry(corpusRoot, selected).pipe(
        Effect.provide(NodeServices.layer)
      )
    );

    expect(selected?.sourcePath).toBe(germanPath);
    expect(empty).toEqual([]);
    expect(selection.sources[0].dependencies).toContainEqual({
      mode: "restart",
      sourcePath:
        "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/source.ts",
    });
    const dependencyPaths = selection.sources[0].dependencies.map(
      ({ sourcePath }) => sourcePath
    );
    expect(dependencyPaths).not.toContain("packages/corpus/material/locale.ts");
    expect(dependencyPaths).not.toContain(
      "packages/corpus/material/locale-registry.ts"
    );
    expect(dependencyPaths).not.toContain(
      "packages/corpus/locale/german/glossary.ts"
    );
    expect(
      dependencyPaths.some(
        (sourcePath) =>
          sourcePath.startsWith("packages/corpus/material/lesson/") &&
          sourcePath.endsWith("/locale/de.ts")
      )
    ).toBe(false);
  });
});
