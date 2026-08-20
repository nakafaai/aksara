import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { defineCurriculum, unitNode } from "#corpus/curriculum/schema";
import { decodeMaterialDomains } from "#corpus/material/domain";
import {
  CandidateProgramOwnershipError,
  validateCandidateProgram,
} from "#corpus/program/candidate";
import { schoolProgramSources } from "#corpus/program/school";
import {
  germanMaterialCatalog,
  lessonMaterialSource,
} from "#corpus/test/material";

const [baseProgram] = schoolProgramSources;

const programLocale = {
  appLocale: "de",
  programKey: baseProgram.key,
  publicSlug: "merdeka-lehrplan",
  title: "Merdeka-Lehrplan",
} as const;
const curriculumLocale = {
  appLocale: "de",
  nodeKey: "foundation",
  programKey: baseProgram.key,
  translation: { routeSlug: "grundlagen", title: "Grundlagen" },
} as const;

/** Builds one minimal curriculum whose locale closure is independently owned. */
function curriculum() {
  return Effect.runPromise(
    defineCurriculum({
      programKey: baseProgram.key,
      tree: [
        unitNode({
          key: "foundation",
          order: 1,
          translations: {
            en: { routeSlug: "foundation", title: "Foundation" },
            id: { routeSlug: "dasar", title: "Dasar" },
          },
        }),
      ],
    })
  );
}

describe("candidate Program validation", () => {
  it("returns exact zero evidence after candidate activation", async () => {
    await expect(
      Effect.runPromise(validateCandidateProgram({ appLocales: [] }))
    ).resolves.toEqual({
      curriculumLocaleCount: 0,
      curriculumRouteCount: 0,
      programLocaleCount: 0,
      readyLocaleCount: 0,
    });
    await expect(
      Effect.runPromise(validateCandidateProgram())
    ).resolves.toEqual({
      curriculumLocaleCount: 95,
      curriculumRouteCount: 195,
      programLocaleCount: 6,
      readyLocaleCount: 1,
    });
  });

  it("validates partial rows and projects only a complete locale", async () => {
    const source = await curriculum();
    const domains = await Effect.runPromise(decodeMaterialDomains());
    const descriptor = domains.find(({ key }) => key === "mathematics");
    if (descriptor === undefined) {
      throw new Error("Expected the mathematics material domain.");
    }
    const material = lessonMaterialSource();
    const partial = await Effect.runPromise(
      validateCandidateProgram({
        appLocales: [AppLocaleSchema.make("de")],
        curricula: [source],
        curriculumLocaleInput: [],
        domains: [],
        materialInput: [],
        materialLocaleInput: { domains: [], sources: [] },
        programInput: [baseProgram],
        programLocaleInput: [programLocale],
      })
    );
    const complete = await Effect.runPromise(
      validateCandidateProgram({
        appLocales: [AppLocaleSchema.make("de")],
        curricula: [source],
        curriculumLocaleInput: [curriculumLocale],
        domains: [descriptor],
        materialInput: [material],
        materialLocaleInput: germanMaterialCatalog(),
        programInput: [baseProgram],
        programLocaleInput: [programLocale],
      })
    );

    expect(partial).toMatchObject({
      curriculumRouteCount: 0,
      programLocaleCount: 1,
      readyLocaleCount: 0,
    });
    expect(complete).toMatchObject({
      curriculumLocaleCount: 1,
      curriculumRouteCount: 2,
      programLocaleCount: 1,
      readyLocaleCount: 1,
    });
  });

  it("rejects curriculum copy without its localized program root", async () => {
    const source = await curriculum();
    const error = await Effect.runPromise(
      validateCandidateProgram({
        appLocales: [AppLocaleSchema.make("de")],
        curricula: [source],
        curriculumLocaleInput: [curriculumLocale],
        domains: [],
        materialInput: [],
        materialLocaleInput: { domains: [], sources: [] },
        programInput: [baseProgram],
        programLocaleInput: [],
      }).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(CandidateProgramOwnershipError);
    expect(error).toMatchObject({ reason: "curriculum-program" });
  });
});
