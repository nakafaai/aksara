import { describe, expect, it } from "@effect/vitest";
import {
  ActiveAppLocaleSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, Option } from "effect";

import {
  decodeMaterialDomains,
  requireMaterialDomain,
} from "#corpus/material/domain";
import { materialLessonPath, materialTopicPath } from "#corpus/material/route";
import { decodeMaterialSources } from "#corpus/material/source";
import { lessonMaterialSource } from "#corpus/test/material";

describe("material public routes", () => {
  it.effect(
    "derives exact localized topic and lesson paths from a real source",
    () =>
      Effect.gen(function* () {
        const [domains, materials] = yield* Effect.all([
          decodeMaterialDomains(),
          decodeMaterialSources(),
        ]);
        const material = Option.getOrUndefined(
          Arr.findFirst(
            materials,
            ({ key }) => key === "lesson.mathematics.function-modeling"
          )
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

  it.effect(
    "derives the Malay path from Malay slugs and refuses a section without one",
    () =>
      Effect.gen(function* () {
        const source = lessonMaterialSource();
        const [section] = source.sections;
        const descriptor = yield* requireMaterialDomain(
          yield* decodeMaterialDomains(),
          source.domain,
          source.key
        );
        const malay = AppLocaleSchema.make("ms");
        const written = {
          ...source,
          routeSlugs: { ...source.routeSlugs, ms: "fungsi-gubahan" },
        };
        if (!section) {
          return;
        }

        expect(
          yield* materialLessonPath(
            written,
            {
              ...section,
              routeSlugs: { ...section.routeSlugs, ms: "konsep-fungsi" },
            },
            descriptor,
            malay
          )
        ).toBe("subjek/matematik/fungsi-gubahan/konsep-fungsi");
        expect(
          yield* Effect.flip(
            materialLessonPath(written, section, descriptor, malay)
          )
        ).toMatchObject({
          _tag: "SourceLocaleUnavailableError",
          appLocale: "ms",
        });
      })
  );
});
