import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { Array as Arr, Effect, Option } from "effect";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import {
  TryoutRouteDuplicateError,
  TryoutRouteTitleError,
  validateTryoutRoutes,
} from "#corpus/tryout/route";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Projects the complete authored catalog into its localized rows, every set with a test paper. */
const catalogRows = Effect.flatMap(decodeTryoutRegistry(), (sources) =>
  projectTryoutCatalog(sources, (id) => Option.some({ hash, id }))
);

describe("tryout routes", () => {
  it.effect(
    "accepts canonical routes and rejects one exact locale collision",
    () =>
      Effect.gen(function* () {
        const rows = yield* catalogRows;
        yield* validateTryoutRoutes(rows);
        const countries = Arr.filter(rows, (row) => row.kind === "country");
        const first = yield* Effect.fromOption(
          Arr.findFirst(countries, (row) => row.appLocale === "en")
        );
        const second = yield* Effect.fromOption(
          Arr.findFirst(countries, (row) => row.appLocale === "id")
        );
        const duplicate = {
          ...second,
          appLocale: first.appLocale,
          publicPath: first.publicPath,
        };
        const error = yield* validateTryoutRoutes([first, duplicate]).pipe(
          Effect.flip
        );

        expect(error).toBeInstanceOf(TryoutRouteDuplicateError);
        expect(error).toMatchObject({
          _tag: "TryoutRouteDuplicateError",
          appLocale: first.appLocale,
          publicPath: first.publicPath,
        });
      })
  );

  it.effect("spells every public route from the title its page shows", () =>
    Effect.gen(function* () {
      const rows = yield* catalogRows;
      const paths = Arr.flatMap(rows, ({ publicPath }) =>
        publicPath === undefined ? [] : [publicPath]
      );

      expect(paths).toContain(
        "try-out/indonesien/snbt/2027/utbk/aufgabensatz-1/leseverstaendnis-und-schreiben"
      );
      expect(paths).toContain(
        "try-out/indonesia/snbt/2027/utbk/set-1/literasi-dalam-bahasa-inggris"
      );
      expect(paths).toContain(
        "try-out/indonesia/tka/sma-ma-smk/matematika-wajib/set-1"
      );
      expect(paths).toContain(
        "try-out/indonesien/tka/oberstufe/pflichtmathematik/aufgabensatz-1"
      );
    })
  );

  it.effect(
    "spells a grade's route from its title, and a year's from the year",
    () =>
      Effect.gen(function* () {
        const rows = yield* catalogRows;
        const grade = yield* Effect.fromOption(
          Arr.findFirst(
            rows,
            (row) =>
              row.kind === "group" &&
              row.appLocale === "en" &&
              row.examKey === "tka"
          )
        );
        const year = yield* Effect.fromOption(
          Arr.findFirst(
            rows,
            (row) =>
              row.kind === "group" &&
              row.appLocale === "en" &&
              row.examKey === "snbt"
          )
        );
        const error = yield* validateTryoutRoutes([
          { ...grade, title: "High School" },
        ]).pipe(Effect.flip);

        expect(year).toMatchObject({
          publicPath: "try-out/indonesia/snbt/2027",
        });
        expect(error).toMatchObject({
          _tag: "TryoutRouteTitleError",
          publicPath: "try-out/indonesia/tka/senior-high-school",
        });
      })
  );

  it.effect("rejects a route that does not spell its page title", () =>
    Effect.gen(function* () {
      const rows = yield* catalogRows;
      const section = yield* Effect.fromOption(
        Arr.findFirst(
          rows,
          (row) =>
            row.kind === "section" &&
            row.appLocale === "en" &&
            row.sectionKey === "reading-comprehension-and-writing"
        )
      );
      const error = yield* validateTryoutRoutes([
        { ...section, title: "Reading and Writing Skills" },
      ]).pipe(Effect.flip);

      expect(error).toBeInstanceOf(TryoutRouteTitleError);
      expect(error).toMatchObject({
        _tag: "TryoutRouteTitleError",
        appLocale: "en",
        publicPath: section.publicPath,
        title: "Reading and Writing Skills",
      });
    })
  );
});
