import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import type { ContentCacheChange } from "@nakafa/aksara-contracts/cache/content";
import { Effect, FileSystem, Path, Stream } from "effect";
import {
  makeAbsentReleaseDispatch,
  makeProductionReleaseDispatch,
} from "#cli/dispatch/activation";
import { STAGED_RELEASE_BUNDLE } from "#test/target";

const RELEASE = STAGED_RELEASE_BUNDLE.release;

/** Builds one release dispatch input from the given content changes. */
const dispatchInput = (
  changes: readonly ContentCacheChange[] = [{ scope: "material" }]
) => ({ cacheChanges: Stream.fromIterable(changes), release: RELEASE });

/** Creates a step-output file in a scoped temporary directory, holding `text`. */
const stepOutput = Effect.fn("AksaraCliTest.stepOutput")(function* (
  text: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const directory = yield* fileSystem
    .makeTempDirectoryScoped({ prefix: "aksara-step-output-" })
    .pipe(Effect.orDie);
  const output = path.join(directory, "output");
  yield* fileSystem.writeFileString(output, text).pipe(Effect.orDie);
  return { fileSystem, output };
});

describe("production release dispatch", () => {
  it.effect(
    "asks the workflow for one deploy after a release with changes",
    () =>
      Effect.gen(function* () {
        const { fileSystem, output } = yield* stepOutput("previous=kept\n");
        const dispatch = makeProductionReleaseDispatch({ fileSystem, output });
        yield* dispatch(
          dispatchInput([{ scope: "material" }, { scope: "article" }])
        );
        expect(yield* fileSystem.readFileString(output)).toBe(
          "previous=kept\ndeploy=true\n"
        );
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );

  it.effect("asks for nothing after a release that changes no content", () =>
    Effect.gen(function* () {
      const { fileSystem, output } = yield* stepOutput("");
      const dispatch = makeProductionReleaseDispatch({ fileSystem, output });
      yield* dispatch(dispatchInput([]));
      expect(yield* fileSystem.readFileString(output)).toBe("");
    }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );

  it.effect("fails the cache phase when the request cannot be written", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const dispatch = makeProductionReleaseDispatch({
        fileSystem,
        output: "/nonexistent/aksara/step-output",
      });
      expect(yield* Effect.flip(dispatch(dispatchInput()))).toMatchObject({
        _tag: "PublicationActivationError",
        phase: "cache",
        releaseId: RELEASE.manifest.releaseId,
      });
    }).pipe(Effect.provide(NodeServices.layer))
  );
});

describe("absent release dispatch", () => {
  it.effect("drains the release changes and asks for nothing", () =>
    Effect.gen(function* () {
      const drain = makeAbsentReleaseDispatch();
      expect(yield* drain(dispatchInput())).toBeUndefined();
    })
  );
});
