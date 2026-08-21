import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import {
  decodeProgramCatalog,
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
    expect(
      programs.every(
        ({ translations }) =>
          translations.length === ACTIVE_APP_LOCALES.length &&
          translations.every(
            ({ appLocale }, index) => appLocale === ACTIVE_APP_LOCALES[index]
          )
      )
    ).toBe(true);
  });

  it("maps invalid or excess source fields to a typed catalog error", async () => {
    const invalid = [{ ...first, invented: true }];
    const error = await reject(invalid);

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

  it("rejects noncanonical translation order", async () => {
    const error = await reject([
      {
        ...first,
        translations: [...first.translations].reverse(),
      },
    ]);

    expect(error).toBeInstanceOf(ProgramCatalogError);
  });

  it("sorts valid source rows instead of trusting authored array order", async () => {
    const programs = await Effect.runPromise(
      decodeProgramCatalog([...sources].reverse())
    );

    expect(programs.at(0)?.key).toBe("merdeka");
    expect(programs.at(-1)?.key).toBe("snbt");
  });
});
