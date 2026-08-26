import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import { validateTryoutRoutes } from "#corpus/tryout/route";

/** Returns one routed row or fails the test setup explicitly. */
function requireRoute<Value>(value: Value | undefined, label: string): Value {
  if (value === undefined) {
    throw new Error(`Expected ${label}.`);
  }
  return value;
}

describe("tryout routes", () => {
  it("accepts canonical routes and rejects one exact locale collision", async () => {
    const rows = await Effect.runPromise(
      Effect.flatMap(decodeTryoutRegistry(), (sources) =>
        projectTryoutCatalog(sources)
      )
    );
    await Effect.runPromise(validateTryoutRoutes(rows));
    const countries = rows.filter((row) => row.kind === "country");
    const first = requireRoute(
      countries.find((row) => row.appLocale === "en"),
      "English country row"
    );
    const second = requireRoute(
      countries.find((row) => row.appLocale === "id"),
      "Indonesian country row"
    );
    const duplicate = {
      ...second,
      appLocale: first.appLocale,
      publicPath: first.publicPath,
    };
    const error = await Effect.runPromise(
      validateTryoutRoutes([first, duplicate]).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      appLocale: first.appLocale,
      publicPath: first.publicPath,
    });
  });
});
