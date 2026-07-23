import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeProgramCatalog,
  findProgram,
  ProgramCatalogError,
  ProgramIdentityError,
} from "#corpus/program/catalog";
import { examProgramSources } from "#corpus/program/exam";
import { schoolProgramSources } from "#corpus/program/school";

const sources = [...schoolProgramSources, ...examProgramSources];
const [first, second] = sources;

if (!(first && second)) {
  throw new Error("Expected at least two real learning program sources.");
}

/** Returns one typed catalog failure without a FiberFailure wrapper. */
function reject(input: unknown) {
  return Effect.runPromise(decodeProgramCatalog(input).pipe(Effect.flip));
}

describe("learning program catalog", () => {
  it("preserves the exact six real program rows in display order", async () => {
    const programs = await Effect.runPromise(decodeProgramCatalog());

    expect(programs.map(({ key }) => key)).toEqual([
      "merdeka",
      "cambridge-international",
      "singapore-moe",
      "united-states",
      "tka",
      "snbt",
    ]);
    expect(programs.map(({ displayOrder }) => displayOrder)).toEqual([
      10, 20, 30, 40, 50, 60,
    ]);
    expect(programs.every(({ sources: refs }) => refs.length > 0)).toBe(true);
  });

  it("resolves a reviewed program and returns null for an unknown valid key", async () => {
    await expect(
      Effect.runPromise(findProgram(LearningProgramKeySchema.make("snbt")))
    ).resolves.toMatchObject({
      kind: "admission-exam",
      navigation: { model: "exam-domain-set" },
    });
    await expect(
      Effect.runPromise(
        findProgram(LearningProgramKeySchema.make("unknown-program"))
      )
    ).resolves.toBeNull();
  });

  it("maps invalid or excess source fields to a typed catalog error", async () => {
    const error = await reject([{ ...first, invented: true }]);

    expect(error).toBeInstanceOf(ProgramCatalogError);
  });

  it.each([
    ["key", [{ ...first }, { ...second, key: first.key }]],
    ["order", [{ ...first }, { ...second, displayOrder: first.displayOrder }]],
    [
      "slug",
      [
        { ...first },
        {
          ...second,
          translations: {
            ...second.translations,
            en: first.translations.en,
          },
        },
      ],
    ],
  ])("rejects duplicate %s ownership", async (scope, input) => {
    const error = await reject(input);

    expect(error).toBeInstanceOf(ProgramIdentityError);
    expect(error).toMatchObject({ scope });
  });

  it("sorts valid source rows instead of trusting authored array order", async () => {
    const programs = await Effect.runPromise(
      decodeProgramCatalog([...sources].reverse())
    );

    expect(programs.at(0)?.key).toBe("merdeka");
    expect(programs.at(-1)?.key).toBe("snbt");
  });
});
