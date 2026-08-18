import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { composeCurriculumLocaleCatalog } from "#corpus/curriculum/locale";
import {
  CurriculumLocaleOwnershipError,
  CurriculumLocaleSourceSchema,
} from "#corpus/curriculum/locale-source";
import { projectCurriculumNodes } from "#corpus/curriculum/projection";
import {
  defineCurriculum,
  materialNode,
  unitNode,
} from "#corpus/curriculum/schema";
import { addLocalizedSource } from "#corpus/locale/source";
import { decodeMaterialDomains } from "#corpus/material/domain";
import { PublicRouteSegmentSchema } from "#corpus/route/schema";
import { lessonMaterialSource } from "#corpus/test/material";

const baseTranslation = {
  en: { routeSlug: "foundation", title: "Foundation" },
  id: { routeSlug: "dasar", title: "Dasar" },
};

/** Builds one structure node and its flattened projection. */
async function foundationNode(
  input: {
    readonly displayGroup?: { readonly title: string };
    readonly materialCard?: {
      readonly description: string;
      readonly title: string;
    };
  } = {}
) {
  const curriculum = await Effect.runPromise(
    defineCurriculum({
      programKey: "merdeka",
      tree: [
        unitNode({
          ...(input.displayGroup === undefined
            ? {}
            : {
                displayGroup: {
                  en: input.displayGroup,
                  id: input.displayGroup,
                },
              }),
          ...(input.materialCard === undefined
            ? {}
            : {
                materialCard: {
                  en: input.materialCard,
                  id: input.materialCard,
                },
              }),
          key: "foundation",
          order: 1,
          translations: baseTranslation,
        }),
      ],
    })
  );
  const [node] = await Effect.runPromise(
    projectCurriculumNodes([curriculum], [], [])
  );
  if (node === undefined) {
    throw new Error("Expected one projected curriculum node.");
  }
  return { curriculum, node };
}

/** Builds one strict German locale row for the representative source node. */
function germanRow(
  input: {
    readonly displayGroup?: { readonly title: string };
    readonly materialCard?: {
      readonly description: string;
      readonly title: string;
    };
  } = {}
) {
  return Schema.decodeUnknownSync(CurriculumLocaleSourceSchema)({
    appLocale: "de",
    ...input,
    nodeKey: "foundation",
    programKey: "merdeka",
    translation: { routeSlug: "grundlagen", title: "Grundlagen" },
  });
}

describe("curriculum locale sources", () => {
  it("composes exact translation, group, and material-card ownership", async () => {
    const displayGroup = { title: "Lernbereiche" };
    const materialCard = {
      description: "Ein kurzer Einstieg.",
      title: "Grundlagenmaterial",
    };
    const { curriculum, node } = await foundationNode({
      displayGroup,
      materialCard,
    });
    const [composed] = await Effect.runPromise(
      composeCurriculumLocaleCatalog({
        appLocales: [AppLocaleSchema.make("de")],
        curricula: [curriculum],
        nodes: [node],
        rows: [germanRow({ displayGroup, materialCard })],
      })
    );
    expect(composed).toMatchObject({
      displayGroup: { de: displayGroup },
      materialCard: { de: materialCard },
      translations: {
        de: { routeSlug: "grundlagen", title: "Grundlagen" },
      },
    });
    expect(composed?.path[0]?.translations).toMatchObject({
      de: { routeSlug: "grundlagen", title: "Grundlagen" },
    });
  });

  it.each([
    ["missing", []],
    ["duplicate", [germanRow(), germanRow()]],
    ["shape", [germanRow({ displayGroup: { title: "Nicht im Basisknoten" } })]],
  ])("rejects %s locale ownership", async (scope, rows) => {
    const { curriculum, node } = await foundationNode();
    const error = await Effect.runPromise(
      composeCurriculumLocaleCatalog({
        appLocales: [AppLocaleSchema.make("de")],
        curricula: [curriculum],
        nodes: [node],
        rows,
      }).pipe(Effect.flip)
    );
    expect(error).toBeInstanceOf(CurriculumLocaleOwnershipError);
    expect(error).toMatchObject({ scope });
  });

  it("ignores valid unrequested overlays and rejects detached projections", async () => {
    const { curriculum, node } = await foundationNode();
    await expect(
      Effect.runPromise(
        composeCurriculumLocaleCatalog({
          appLocales: [AppLocaleSchema.make("en")],
          curricula: [curriculum],
          nodes: [node],
          rows: [],
        })
      )
    ).resolves.toEqual([node]);
    await expect(
      Effect.runPromise(
        composeCurriculumLocaleCatalog({
          appLocales: [AppLocaleSchema.make("en")],
          curricula: [curriculum],
          nodes: [node],
          rows: [germanRow()],
        })
      )
    ).resolves.toEqual([node]);

    const detached = await Effect.runPromise(
      composeCurriculumLocaleCatalog({
        appLocales: [AppLocaleSchema.make("de")],
        curricula: [],
        nodes: [node],
        rows: [],
      }).pipe(Effect.flip)
    );
    expect(detached).toMatchObject({
      nodeKey: node.key,
      programKey: node.curriculumKey,
      scope: "orphan",
    });
  });

  it("localizes nested material ancestry without inventing a leaf row", async () => {
    const material = lessonMaterialSource();
    const localizedMaterial = {
      ...material,
      routeSlugs: addLocalizedSource(
        material.routeSlugs,
        AppLocaleSchema.make("de"),
        PublicRouteSegmentSchema.make("funktionskomposition-und-umkehrfunktion")
      ),
      translations: addLocalizedSource(
        material.translations,
        AppLocaleSchema.make("de"),
        {
          description:
            "Verknüpfe Funktionen mit passenden Definitionsbereichen.",
          title: "Funktionskomposition und Umkehrfunktion",
        }
      ),
    };
    const curriculum = await Effect.runPromise(
      defineCurriculum({
        programKey: "merdeka",
        tree: [
          unitNode({
            children: [
              materialNode({
                key: "advanced",
                level: "lesson",
                materialKeys: [material.key],
                order: 1,
              }),
            ],
            key: "foundation",
            order: 1,
            translations: baseTranslation,
          }),
        ],
      })
    );
    const domains = await Effect.runPromise(decodeMaterialDomains());
    const nodes = await Effect.runPromise(
      projectCurriculumNodes([curriculum], [localizedMaterial], domains)
    );

    const composed = await Effect.runPromise(
      composeCurriculumLocaleCatalog({
        appLocales: [AppLocaleSchema.make("de")],
        curricula: [curriculum],
        nodes,
        rows: [germanRow()],
      })
    );
    const leaf = composed.find(({ key }) => key === "advanced");

    expect(leaf?.path).toMatchObject([
      { translations: { de: { routeSlug: "grundlagen" } } },
      {
        translations: {
          de: {
            routeSlug: "funktionskomposition-und-umkehrfunktion",
          },
        },
      },
    ]);
  });

  it("rejects a valid row whose projected node is absent", async () => {
    const curriculum = await Effect.runPromise(
      defineCurriculum({
        programKey: "merdeka",
        tree: [
          unitNode({
            children: [
              unitNode({
                key: "advanced",
                order: 1,
                translations: baseTranslation,
              }),
            ],
            key: "foundation",
            order: 1,
            translations: baseTranslation,
          }),
        ],
      })
    );
    const [projected, child] = await Effect.runPromise(
      projectCurriculumNodes([curriculum], [], [])
    );
    if (!(projected && child)) {
      throw new Error("Expected parent and child curriculum nodes.");
    }
    const childRow = Schema.decodeUnknownSync(CurriculumLocaleSourceSchema)({
      ...germanRow(),
      nodeKey: "advanced",
    });
    const rows = [germanRow(), childRow];
    const error = await Effect.runPromise(
      composeCurriculumLocaleCatalog({
        appLocales: [AppLocaleSchema.make("de")],
        curricula: [curriculum],
        nodes: [projected],
        rows,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ nodeKey: "advanced", scope: "orphan" });
    const missingAncestry = await Effect.runPromise(
      composeCurriculumLocaleCatalog({
        appLocales: [AppLocaleSchema.make("de")],
        curricula: [curriculum],
        nodes: [child],
        rows: [childRow],
      }).pipe(Effect.flip)
    );
    expect(missingAncestry).toMatchObject({
      nodeKey: "foundation",
      scope: "missing",
    });
  });
});
