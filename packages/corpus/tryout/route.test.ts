import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import {
  TryoutRouteDuplicateError,
  validateTryoutRoutes,
} from "#corpus/tryout/route";

describe("tryout routes", () => {
  it.effect(
    "accepts canonical routes and rejects one exact locale collision",
    () =>
      Effect.gen(function* () {
        const rows = yield* Effect.flatMap(decodeTryoutRegistry(), (sources) =>
          projectTryoutCatalog(sources)
        );
        yield* validateTryoutRoutes(rows);
        const countries = rows.filter((row) => row.kind === "country");
        const first = yield* Effect.fromNullishOr(
          countries.find((row) => row.appLocale === "en")
        );
        const second = yield* Effect.fromNullishOr(
          countries.find((row) => row.appLocale === "id")
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
});
