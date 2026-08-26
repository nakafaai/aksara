import { describe, expect, it } from "@effect/vitest";
import { ActiveAppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";

import {
  decodeMaterialDomains,
  requireMaterialDomain,
} from "#corpus/material/domain";
import { materialLessonPath, materialTopicPath } from "#corpus/material/route";
import { decodeMaterialSources } from "#corpus/material/source";

describe("material public routes", () => {
  it.effect(
    "derives exact localized topic and lesson paths from a real source",
    () =>
      Effect.gen(function* () {
        const [domains, materials] = yield* Effect.all([
          decodeMaterialDomains(),
          decodeMaterialSources(),
        ]);
        const material = materials.find(
          ({ key }) => key === "lesson.mathematics.function-modeling"
        );

        expect(material).toBeDefined();
        if (!material) {
          return;
        }
        const [section] = material.sections;
        expect(section).toBeDefined();
        if (!section) {
          return;
        }
        const descriptor = yield* requireMaterialDomain(
          domains,
          material.domain,
          material.key
        );
        expect(
          yield* materialTopicPath(
            material,
            descriptor,
            ActiveAppLocaleSchema.make("en")
          )
        ).toBe("subjects/mathematics/function-modeling");
        expect(
          yield* materialTopicPath(
            material,
            descriptor,
            ActiveAppLocaleSchema.make("id")
          )
        ).toBe("materi/matematika/fungsi-dan-pemodelannya");
        expect(
          yield* materialLessonPath(
            material,
            section,
            descriptor,
            ActiveAppLocaleSchema.make("en")
          )
        ).toBe(
          "subjects/mathematics/function-modeling/absolute-value-function"
        );
      })
  );
});
