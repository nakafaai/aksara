import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import { localizeCurriculumMaterials } from "#corpus/curriculum/material-locale";
import { decodeMaterialDomains } from "#corpus/material/domain";
import {
  germanMaterialCatalog,
  lessonMaterialSource,
} from "#corpus/test/material";

/** Resolves the representative mathematics descriptor for material tests. */
async function mathematicsDomain() {
  const domains = await Effect.runPromise(decodeMaterialDomains());
  const domain = domains.find(({ key }) => key === "mathematics");
  if (domain === undefined) {
    throw new Error("Expected the mathematics material domain.");
  }
  return domain;
}

describe("curriculum material locale selection", () => {
  it("does not decode an unselected overlay", async () => {
    const domain = await mathematicsDomain();
    const material = lessonMaterialSource();

    await expect(
      Effect.runPromise(
        localizeCurriculumMaterials({
          appLocales: [AppLocaleSchema.make("en"), AppLocaleSchema.make("id")],
          domains: [domain],
          localeInput: null,
          materials: [material],
        })
      )
    ).resolves.toEqual({ domains: [domain], materials: [material] });
  });

  it("composes a selected permanent overlay", async () => {
    const domain = await mathematicsDomain();

    await expect(
      Effect.runPromise(
        localizeCurriculumMaterials({
          appLocales: [AppLocaleSchema.make("de")],
          domains: [domain],
          localeInput: germanMaterialCatalog(),
          materials: [lessonMaterialSource()],
        })
      )
    ).resolves.toMatchObject({
      domains: [{ routeSlugs: { de: "mathematik" } }],
      materials: [
        {
          translations: {
            de: { title: "Funktionskomposition und Umkehrfunktion" },
          },
        },
      ],
    });
  });
});
