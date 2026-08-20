import { ActiveAppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import {
  decodeMaterialDomains,
  requireMaterialDomain,
} from "#corpus/material/domain";
import { materialLessonPath, materialTopicPath } from "#corpus/material/route";
import { decodeMaterialSources } from "#corpus/material/source";

describe("material public routes", () => {
  it("derives exact localized topic and lesson paths from a real source", async () => {
    const [domains, materials] = await Effect.runPromise(
      Effect.all([decodeMaterialDomains(), decodeMaterialSources()])
    );
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
    const descriptor = await Effect.runPromise(
      requireMaterialDomain(domains, material.domain, material.key)
    );
    expect(
      await Effect.runPromise(
        materialTopicPath(
          material,
          descriptor,
          ActiveAppLocaleSchema.make("en")
        )
      )
    ).toBe("subjects/mathematics/function-modeling");
    expect(
      await Effect.runPromise(
        materialTopicPath(
          material,
          descriptor,
          ActiveAppLocaleSchema.make("id")
        )
      )
    ).toBe("materi/matematika/fungsi-dan-pemodelannya");
    expect(
      await Effect.runPromise(
        materialLessonPath(
          material,
          section,
          descriptor,
          ActiveAppLocaleSchema.make("en")
        )
      )
    ).toBe("subjects/mathematics/function-modeling/absolute-value-function");
  });
});
