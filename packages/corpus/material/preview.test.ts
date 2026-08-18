import { NodeContext } from "@effect/platform-node";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { decodeMaterialDomains } from "#corpus/material/domain";
import {
  decodeMaterialPreviewEntries,
  decodeMaterialPreviewEntry,
} from "#corpus/material/preview";
import { selectMaterialEntry } from "#corpus/preview/public";
import {
  germanMaterialCatalog,
  lessonMaterialSource,
} from "#corpus/test/material";
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
  it("projects active and candidate bodies through distinct metadata owners", async () => {
    const descriptor = await mathematicsDomain();
    const entries = await Effect.runPromise(
      decodeMaterialPreviewEntries(
        [englishPath, germanPath],
        [lessonMaterialSource()],
        [descriptor],
        germanMaterialCatalog()
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
        [descriptor],
        germanMaterialCatalog()
      )
    );
    const empty = await Effect.runPromise(
      decodeMaterialPreviewEntries(
        [],
        [lessonMaterialSource()],
        [descriptor],
        germanMaterialCatalog()
      )
    );

    if (selected === undefined) {
      throw new Error("Expected the selected German material.");
    }
    const selection = await Effect.runPromise(
      selectMaterialEntry(corpusRoot, selected).pipe(
        Effect.provide(NodeContext.layer)
      )
    );

    expect(selected?.sourcePath).toBe(germanPath);
    expect(empty).toEqual([]);
    expect(selection.sources[0].dependencies.slice(-6)).toEqual([
      {
        mode: "restart",
        sourcePath: "packages/corpus/material/locale.ts",
      },
      {
        mode: "restart",
        sourcePath: "packages/corpus/material/locale-registry.ts",
      },
      {
        mode: "restart",
        sourcePath: "packages/corpus/locale/german/glossary.ts",
      },
      {
        mode: "restart",
        sourcePath: "packages/corpus/locale/german/education.ts",
      },
      {
        mode: "restart",
        sourcePath: "packages/corpus/locale/german/product.ts",
      },
      {
        mode: "restart",
        sourcePath:
          "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/locale/de.ts",
      },
    ]);
  });
});
