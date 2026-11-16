import type { ContentCacheChange } from "@nakafa/aksara-contracts/cache/content";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import { PublicationActivationError } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, type FileSystem, Schema, Stream } from "effect";

/**
 * Selects whether one publication target deploys Nakafa. Only a production target
 * runs Nakafa's deploy workflow, because that workflow ships the production site.
 * A development or acceptance target asks for nothing.
 */
export const ReleaseSurfaceSchema = Schema.Literals(["deployed", "none"]);

/**
 * What one target does after its release activates: nothing, or record a deploy
 * request in the step-output file the release workflow gives the command.
 */
export const ReleaseDispatchSchema = Schema.Union([
  Schema.Struct({ surface: Schema.Literal("none") }),
  Schema.Struct({
    output: Schema.NonEmptyString,
    surface: Schema.Literal("deployed"),
  }),
]);
export type ReleaseDispatch = typeof ReleaseDispatchSchema.Type;

/**
 * The step output that asks the release workflow for Nakafa's production deploy.
 * The workflow mints the deploy app's token in the step after the command and
 * dispatches with it at once: an installation token lasts one hour, and a
 * release's staging and proof can outlast it, so a token minted before the
 * command expired before the dispatch (release catalog-20261116g).
 */
const DEPLOY_REQUEST = "deploy=true\n";

/** One post-commit convergence request for the activated release. */
interface ReleaseDispatchInput<E, R> {
  /** Replays the exact source-owned transitions for the activated release. */
  readonly cacheChanges: Stream.Stream<ContentCacheChange, E, R>;
  readonly release: SignedContentRelease;
}

/** Drains the release transitions of a target that deploys no site, and asks for nothing. */
export function makeAbsentReleaseDispatch() {
  return Effect.fn("AksaraCli.dispatchAbsentRelease")(function* <E, R>(
    input: ReleaseDispatchInput<E, R>
  ) {
    yield* Stream.runDrain(input.cacheChanges);
  });
}

/**
 * Creates the post-commit deploy request of one activated release. A release that
 * changes no content asks for nothing, and any other release appends one deploy
 * request to the workflow's step-output file, which the next workflow step reads.
 * A request that cannot be written fails the activation's cache phase.
 */
export function makeProductionReleaseDispatch(settings: {
  readonly fileSystem: FileSystem.FileSystem;
  readonly output: string;
}) {
  return Effect.fn("AksaraCli.dispatchProductionRelease")(function* <E, R>(
    input: ReleaseDispatchInput<E, R>
  ) {
    const changes = yield* Stream.runCount(input.cacheChanges);
    if (changes === 0) {
      return;
    }
    yield* settings.fileSystem
      .writeFileString(settings.output, DEPLOY_REQUEST, { flag: "a" })
      .pipe(
        Effect.mapError(
          () =>
            new PublicationActivationError({
              phase: "cache",
              releaseId: input.release.manifest.releaseId,
            })
        )
      );
  });
}
