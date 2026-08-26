import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
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
const mathematicsDomain = Effect.fn("AksaraCorpus.test.mathematicsDomain")(
  function* () {
    const descriptors = yield* decodeMaterialDomains();
    const descriptor = descriptors.find(({ key }) => key === "mathematics");
    return yield* Effect.fromNullishOr(descriptor);
  }
);

layer(NodeServices.layer)("material preview projection", (it) => {
  it.effect("projects every selected body through one source owner", () =>
    Effect.gen(function* () {
      const descriptor = yield* mathematicsDomain();
      const entries = yield* decodeMaterialPreviewEntries(
        [englishPath, germanPath],
        [lessonMaterialSource()],
        [descriptor]
      );

      expect(entries.map(({ route }) => route.appLocale)).toEqual(["de", "en"]);
      expect(
        entries.find(({ route }) => route.appLocale === "de")
      ).toMatchObject({
        route: {
          contentKey:
            "material/lesson/mathematics/function-composition-inverse-function/function-concept",
          publicPath:
            "faecher/mathematik/funktionskomposition-und-umkehrfunktion/funktionsbegriff",
          topicTitle: "Funktionskomposition und Umkehrfunktion",
        },
      });
    })
  );

  it.effect(
    "returns one exact selected entry and no invented unselected body",
    () =>
      Effect.gen(function* () {
        const descriptor = yield* mathematicsDomain();
        const selected = yield* decodeMaterialPreviewEntry(
          germanPath,
          [lessonMaterialSource()],
          [descriptor]
        );
        const empty = yield* decodeMaterialPreviewEntries(
          [],
          [lessonMaterialSource()],
          [descriptor]
        );

        expect(selected).toBeDefined();
        if (selected === undefined) {
          return;
        }
        const selection = yield* selectMaterialEntry(corpusRoot, selected);

        expect(selected.sourcePath).toBe(germanPath);
        expect(empty).toEqual([]);
        expect(selection.sources[0].dependencies).toContainEqual({
          mode: "restart",
          sourcePath:
            "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/source.ts",
        });
      })
  );
});
