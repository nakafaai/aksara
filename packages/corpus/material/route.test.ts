import { Effect } from "effect";
import { describe, expect, it } from "vitest";

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
    expect(materialTopicPath(material, descriptor, "en")).toBe(
      "subjects/mathematics/function-modeling"
    );
    expect(materialTopicPath(material, descriptor, "id")).toBe(
      "materi/matematika/fungsi-dan-pemodelannya"
    );
    expect(materialLessonPath(material, section, descriptor, "en")).toBe(
      "subjects/mathematics/function-modeling/absolute-value-function"
    );
  });
});
