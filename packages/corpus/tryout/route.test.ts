import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import {
  TryoutRouteDuplicateError,
  TryoutRouteTitleError,
  validateTryoutRoutes,
} from "#corpus/tryout/route";

/** Projects the complete authored catalog into its signed localized rows. */
const catalogRows = Effect.flatMap(decodeTryoutRegistry(), (sources) =>
  projectTryoutCatalog(sources)
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
      const paths = Arr.flatMap(rows, (row) =>
        "publicPath" in row && row.publicPath !== undefined
          ? [row.publicPath]
          : []
      );

      expect(paths).toContain(
        "try-out/indonesien/snbt/2027/aufgabensatz-1/leseverstaendnis-und-schreiben"
      );
      expect(paths).toContain(
        "try-out/indonesia/snbt/2027/set-1/literasi-dalam-bahasa-inggris"
      );
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
