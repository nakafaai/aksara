import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { materialLessonPath, materialTopicPath } from "#corpus/material/route";
import { decodeMaterialSources } from "#corpus/material/source";

describe("material public routes", () => {
  it("derives exact localized topic and lesson paths from a real source", async () => {
    const materials = await Effect.runPromise(decodeMaterialSources());
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
    expect(materialTopicPath(material, "en")).toBe(
      "subjects/mathematics/function-modeling"
    );
    expect(materialTopicPath(material, "id")).toBe(
      "materi/matematika/fungsi-dan-pemodelannya"
    );
    expect(materialLessonPath(material, section, "en")).toBe(
      "subjects/mathematics/function-modeling/absolute-value-function"
    );
  });
});
