import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeAuthoringProgramCatalog,
  decodeProgramCatalog,
  ProgramCatalogError,
  ProgramIdentityError,
  selectActiveProgramCatalog,
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

  it("maps invalid or excess source fields to a typed catalog error", async () => {
    const invalid = [{ ...first, invented: true }];
    const [activeError, authoringError] = await Promise.all([
      reject(invalid),
      Effect.runPromise(
        decodeAuthoringProgramCatalog(invalid).pipe(Effect.flip)
      ),
    ]);

    expect(activeError).toBeInstanceOf(ProgramCatalogError);
    expect(authoringError).toBeInstanceOf(ProgramCatalogError);
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
          translations: second.translations.map((translation) =>
            translation.appLocale === "en" ? first.translations[0] : translation
          ),
        },
      ],
    ],
  ])("rejects duplicate %s ownership", async (scope, input) => {
    const error = await reject(input);

    expect(error).toBeInstanceOf(ProgramIdentityError);
    expect(error).toMatchObject({ scope });
  });

  it("rejects a program missing one active translation", async () => {
    const error = await reject([
      {
        ...first,
        translations: first.translations.filter(
          ({ appLocale }) => appLocale !== "id"
        ),
      },
    ]);

    expect(error).toBeInstanceOf(ProgramCatalogError);
  });

  it("rejects a candidate translation substituted for active copy", async () => {
    const error = await reject([
      {
        ...first,
        translations: first.translations.map((translation) =>
          translation.appLocale === "id"
            ? {
                appLocale: "de",
                publicSlug: "deutsches-testprogramm",
                title: "Deutsches Testprogramm",
              }
            : translation
        ),
      },
    ]);

    expect(error).toBeInstanceOf(ProgramCatalogError);
  });

  it("admits reviewed German candidate copy and selects active publication copy", async () => {
    const german = {
      appLocale: "de",
      programKey: first.key,
      publicSlug: "merdeka-lehrplan",
      title: "Merdeka-Lehrplan",
    };
    const programs = await Effect.runPromise(
      decodeProgramCatalog([{ ...first }], [german])
    );
    const active = await Effect.runPromise(
      selectActiveProgramCatalog(programs)
    );

    expect(programs[0]?.translations).toContainEqual({
      appLocale: german.appLocale,
      publicSlug: german.publicSlug,
      title: german.title,
    });
    expect(active[0]?.translations.map(({ appLocale }) => appLocale)).toEqual([
      "en",
      "id",
    ]);

    const [program] = programs;
    const candidate = program?.translations.find(
      ({ appLocale }) => appLocale === "de"
    );
    if (!(program && candidate)) {
      throw new Error("Expected one decoded German program candidate.");
    }
    const error = await Effect.runPromise(
      selectActiveProgramCatalog([
        { ...program, translations: [candidate] },
      ]).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      scope: "translation",
      value: `${program.key}:active-translations-missing`,
    });
  });

  it("sorts valid source rows instead of trusting authored array order", async () => {
    const programs = await Effect.runPromise(
      decodeProgramCatalog([...sources].reverse())
    );

    expect(programs.at(0)?.key).toBe("merdeka");
    expect(programs.at(-1)?.key).toBe("snbt");
  });
});
