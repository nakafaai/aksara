import { describe, expect, it } from "@effect/vitest";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect } from "effect";

import {
  decodeProgramCatalog,
  ProgramCatalogError,
  ProgramIdentityError,
} from "#corpus/program/catalog";
import { examProgramSources } from "#corpus/program/exam";
import { schoolProgramSources } from "#corpus/program/school";

const sources = [...schoolProgramSources, ...examProgramSources];
type ProgramSource = (typeof sources)[number];

/** Loads the two checked-in sources required by duplicate-ownership fixtures. */
const requireProgramSourcePair = Effect.fn(
  "AksaraCorpus.test.requireProgramSourcePair"
)(function* () {
  const first = yield* Effect.fromNullishOr(sources[0]);
  const second = yield* Effect.fromNullishOr(sources[1]);
  return [first, second] as const;
});

const duplicateOwnershipCases = [
  [
    "key",
    (first: ProgramSource, second: ProgramSource) => [
      { ...first },
      { ...second, key: first.key },
    ],
  ],
  [
    "order",
    (first: ProgramSource, second: ProgramSource) => [
      { ...first },
      { ...second, displayOrder: first.displayOrder },
    ],
  ],
  [
    "slug",
    (first: ProgramSource, second: ProgramSource) => [
      { ...first },
      {
        ...second,
        translations: Arr.map(second.translations, (translation) =>
          translation.appLocale === "en" ? first.translations[0] : translation
        ),
      },
    ],
  ],
] as const;

/** Returns one typed catalog failure without a FiberFailure wrapper. */
function reject(input: unknown) {
  return decodeProgramCatalog(input).pipe(Effect.flip);
}

describe("learning program catalog", () => {
  it.effect("preserves the exact six real program rows in display order", () =>
    Effect.gen(function* () {
      const programs = yield* decodeProgramCatalog();

      expect(Arr.map(programs, ({ key }) => key)).toEqual([
        "merdeka",
        "cambridge-international",
        "singapore-moe",
        "united-states",
        "tka",
        "snbt",
      ]);
      expect(Arr.map(programs, ({ displayOrder }) => displayOrder)).toEqual([
        10, 20, 30, 40, 50, 60,
      ]);
      expect(Arr.every(programs, ({ sources: refs }) => refs.length > 0)).toBe(
        true
      );
      expect(
        Arr.every(
          programs,
          ({ translations }) =>
            translations.length === ACTIVE_APP_LOCALES.length &&
            Arr.every(
              translations,
              ({ appLocale }, index) => appLocale === ACTIVE_APP_LOCALES[index]
            )
        )
      ).toBe(true);
    })
  );

  it.effect(
    "maps invalid or excess source fields to a typed catalog error",
    () =>
      Effect.gen(function* () {
        const [first] = yield* requireProgramSourcePair();
        const invalid = [{ ...first, invented: true }];
        const error = yield* reject(invalid);

        expect(error).toBeInstanceOf(ProgramCatalogError);
      })
  );

  it.effect.each(duplicateOwnershipCases)(
    "rejects duplicate %s ownership",
    ([scope, makeInput]) =>
      Effect.gen(function* () {
        const [first, second] = yield* requireProgramSourcePair();
        const error = yield* reject(makeInput(first, second));

        expect(error).toBeInstanceOf(ProgramIdentityError);
        expect(error).toMatchObject({ scope });
      })
  );

  it.effect("rejects a program missing one active translation", () =>
    Effect.gen(function* () {
      const [first] = yield* requireProgramSourcePair();
      const error = yield* reject([
        {
          ...first,
          translations: Arr.filter<ProgramSource["translations"][number]>(
            first.translations,
            ({ appLocale }) => appLocale !== "id"
          ),
        },
      ]);

      expect(error).toBeInstanceOf(ProgramCatalogError);
    })
  );

  it.effect("rejects noncanonical translation order", () =>
    Effect.gen(function* () {
      const [first] = yield* requireProgramSourcePair();
      const error = yield* reject([
        {
          ...first,
          translations: Arr.reverse(first.translations),
        },
      ]);

      expect(error).toBeInstanceOf(ProgramCatalogError);
    })
  );

  it.effect(
    "sorts valid source rows instead of trusting authored array order",
    () =>
      Effect.gen(function* () {
        const programs = yield* decodeProgramCatalog(Arr.reverse(sources));

        expect(programs.at(0)?.key).toBe("merdeka");
        expect(programs.at(-1)?.key).toBe("snbt");
      })
  );
});
