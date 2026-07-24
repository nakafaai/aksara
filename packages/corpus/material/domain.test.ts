import { MaterialDomainSchema } from "@nakafa/aksara-contracts/material/domain";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeMaterialDomains,
  MaterialDomainCatalogError,
  MaterialDomainConflictError,
  MaterialDomainMissingError,
  materialDomainRoute,
  requireMaterialDomain,
} from "#corpus/material/domain";

const genericDomain = {
  key: "earth-science",
  rendererDomain: "physics",
  routeSlugs: { en: "earth-science", id: "ilmu-bumi" },
};

/** Returns one descriptor failure at the Vitest runner boundary. */
function rejectDomains(input: unknown) {
  return Effect.runPromise(decodeMaterialDomains(input).pipe(Effect.flip));
}

describe("material domain registry", () => {
  it("owns the exact current corpus inventory outside the public contract", async () => {
    const descriptors = await Effect.runPromise(decodeMaterialDomains());

    expect(descriptors.map(({ key }) => key)).toEqual([
      "ai-ds",
      "biology",
      "chemistry",
      "mathematics",
      "physics",
    ]);
    expect(
      descriptors.map(({ key, navigationIconKey }) => ({
        key,
        navigationIconKey,
      }))
    ).toEqual([
      { key: "ai-ds", navigationIconKey: undefined },
      { key: "biology", navigationIconKey: "science" },
      { key: "chemistry", navigationIconKey: "science" },
      { key: "mathematics", navigationIconKey: "mathematics" },
      { key: "physics", navigationIconKey: "science" },
    ]);
  });

  it("accepts a generic domain through one descriptor", async () => {
    const descriptors = await Effect.runPromise(
      decodeMaterialDomains([genericDomain])
    );
    const [domain] = descriptors;
    expect(domain).toBeDefined();
    if (!domain) {
      return;
    }
    const descriptor = await Effect.runPromise(
      requireMaterialDomain(descriptors, domain.key, "test-source")
    );

    expect(descriptor.rendererDomain).toBe("physics");
    expect(materialDomainRoute(descriptor, "id")).toBe("ilmu-bumi");
  });

  it("rejects malformed descriptor input", async () => {
    const error = await rejectDomains([
      { ...genericDomain, rendererDomain: "unknown-renderer" },
    ]);

    expect(error).toBeInstanceOf(MaterialDomainCatalogError);
  });

  it("rejects duplicate domain keys", async () => {
    const error = await rejectDomains([
      genericDomain,
      { ...genericDomain, rendererDomain: "mathematics" },
    ]);

    expect(error).toBeInstanceOf(MaterialDomainConflictError);
    expect(error).toMatchObject({ code: "key", key: "earth-science" });
  });

  it("rejects duplicate localized domain routes", async () => {
    const error = await rejectDomains([
      genericDomain,
      {
        key: "geology",
        rendererDomain: "physics",
        routeSlugs: { en: "earth-science", id: "geologi" },
      },
    ]);

    expect(error).toBeInstanceOf(MaterialDomainConflictError);
    expect(error).toMatchObject({
      code: "route",
      key: "geology",
      value: "en:earth-science:earth-science",
    });
  });

  it("preserves an unknown source owner as a typed failure", async () => {
    const descriptors = await Effect.runPromise(decodeMaterialDomains([]));
    const error = await Effect.runPromise(
      requireMaterialDomain(
        descriptors,
        MaterialDomainSchema.make(genericDomain.key),
        "lesson.earth-science.geology"
      ).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(MaterialDomainMissingError);
    expect(error).toMatchObject({
      key: "earth-science",
      owner: "lesson.earth-science.geology",
    });
  });
});
