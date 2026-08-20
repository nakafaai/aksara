import { CurriculumNodeKeySchema } from "@nakafa/aksara-contracts/program/curriculum";
import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";
import { MaterialKeySchema } from "@nakafa/aksara-contracts/projection/material";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";

import {
  CurriculumLocaleCatalogError,
  CurriculumLocaleSourceSchema,
  curriculumLocaleRequiredKeys,
  curriculumLocaleRowRequired,
  curriculumLocaleSourcePath,
  decodeCurriculumLocaleCatalog,
  findCurriculumSourceNode,
  validateCurriculumLocaleRows,
} from "#corpus/curriculum/locale-source";
import {
  defineCurriculum,
  materialNode,
  unitNode,
} from "#corpus/curriculum/schema";

const embeddedCopy = {
  en: { routeSlug: "foundation", title: "Foundation" },
  id: { routeSlug: "dasar", title: "Dasar" },
};
const materialKey = MaterialKeySchema.make("lesson.mathematics.matrix");
const programKey = LearningProgramKeySchema.make("merdeka");
const advancedNodeKey = CurriculumNodeKeySchema.make("advanced");
const foundationNodeKey = CurriculumNodeKeySchema.make("foundation");

/** Decodes one German row while keeping each ownership variation explicit. */
function localeRow(
  input: Partial<typeof CurriculumLocaleSourceSchema.Encoded> = {}
) {
  return Schema.decodeSync(CurriculumLocaleSourceSchema)({
    appLocale: "de",
    nodeKey: "foundation",
    programKey: "merdeka",
    translation: { routeSlug: "grundlagen", title: "Grundlagen" },
    ...input,
  });
}

describe("curriculum locale source ownership", () => {
  it("sorts rows and finds nested stable source nodes", async () => {
    const curriculum = await Effect.runPromise(
      defineCurriculum({
        programKey: "merdeka",
        tree: [
          unitNode({
            children: [
              unitNode({
                key: "advanced",
                order: 1,
                translations: embeddedCopy,
              }),
            ],
            key: "foundation",
            order: 1,
            translations: embeddedCopy,
          }),
        ],
      })
    );
    const rows = await Effect.runPromise(
      decodeCurriculumLocaleCatalog([
        localeRow({ nodeKey: "foundation" }),
        localeRow({ nodeKey: "advanced" }),
      ])
    );

    expect(rows.map(({ nodeKey }) => nodeKey)).toEqual([
      "advanced",
      "foundation",
    ]);
    expect(
      findCurriculumSourceNode([curriculum], programKey, advancedNodeKey)
    ).toMatchObject({
      key: "advanced",
    });
    expect(
      findCurriculumSourceNode([], programKey, advancedNodeKey)
    ).toBeUndefined();
    expect(curriculumLocaleRequiredKeys([curriculum])).toHaveLength(2);
    expect(curriculumLocaleSourcePath(programKey, localeRow().appLocale)).toBe(
      "packages/corpus/curriculum/merdeka/locale/de.ts"
    );
    const malformed = await Effect.runPromise(
      decodeCurriculumLocaleCatalog([{ ...localeRow(), invented: true }]).pipe(
        Effect.flip
      )
    );
    expect(malformed).toBeInstanceOf(CurriculumLocaleCatalogError);
  });

  it("validates material overrides and rejects every invalid row shape", async () => {
    const withOverride = await Effect.runPromise(
      defineCurriculum({
        programKey: "merdeka",
        tree: [
          materialNode({
            displayOverride: embeddedCopy,
            key: "foundation",
            level: "lesson",
            materialKeys: [materialKey],
            order: 1,
          }),
        ],
      })
    );
    const withoutOverride = await Effect.runPromise(
      defineCurriculum({
        programKey: "merdeka",
        tree: [
          materialNode({
            key: "foundation",
            level: "lesson",
            materialKeys: [materialKey],
            order: 1,
          }),
        ],
      })
    );
    const valid = localeRow({
      displayOverride: { routeSlug: "grundlagen", title: "Grundlagen" },
      translation: undefined,
    });
    const [validated] = await Effect.runPromise(
      validateCurriculumLocaleRows([withOverride], [valid])
    );
    const owner = findCurriculumSourceNode(
      [withoutOverride],
      programKey,
      foundationNodeKey
    );
    if (owner === undefined) {
      throw new Error("Expected the material node.");
    }

    expect(validated?.copy).toEqual(valid.displayOverride);
    expect(curriculumLocaleRowRequired(owner)).toBe(false);

    const invalidRows = [
      localeRow({
        displayOverride: { routeSlug: "grundlagen", title: "Grundlagen" },
      }),
      localeRow({ displayGroup: { title: "Gruppe" } }),
      localeRow({
        materialCard: { description: "Beschreibung", title: "Material" },
      }),
      localeRow({ translation: undefined }),
    ];
    const failures = await Effect.runPromise(
      Effect.all([
        validateCurriculumLocaleRows([], [valid]).pipe(Effect.flip),
        validateCurriculumLocaleRows([withOverride], [valid, valid]).pipe(
          Effect.flip
        ),
        ...invalidRows.map((row) =>
          validateCurriculumLocaleRows([withOverride], [row]).pipe(Effect.flip)
        ),
      ])
    );
    expect(failures.map(({ scope }) => scope)).toEqual([
      "orphan",
      "duplicate",
      "shape",
      "shape",
      "shape",
      "shape",
    ]);
  });
});
