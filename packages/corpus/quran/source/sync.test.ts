import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect, Result } from "effect";
import {
  makePriorQuranSyncSources,
  QuranSyncFixture,
  quranSyncFileFailure,
  quranSyncFixtureLayer,
  quranSyncTestProgram,
} from "#corpus/test/quran/sync";

layer(quranSyncFixtureLayer)("German Quran source sync", (it) => {
  it.effect(
    "installs the complete exact German source bundle",
    () =>
      Effect.gen(function* () {
        const { edition, publication, sources, terms, translation } =
          yield* QuranSyncFixture;
        const prior = makePriorQuranSyncSources();
        const [firstInstall, result] = yield* Effect.all(
          [
            quranSyncTestProgram(sources),
            quranSyncTestProgram(sources, { prior }),
          ],
          { concurrency: "unbounded" }
        );

        expect(firstInstall.outcome._tag).toBe("Success");
        expect(firstInstall.backupExists).toBe(false);
        expect(result.outcome).toMatchObject({
          _tag: "Success",
          success: {
            edition: {
              byteCount: 4_944_410,
              digest:
                "sha256:bdd3a3a52bff49be17ef5b7133c6ee258bf82dad3807775eb712de99e1ce5006",
              path: result.targets.edition,
            },
            publication: {
              byteCount: 3485,
              digest:
                "sha256:df3b2437afa0f52c3621c8c611384c45b00169e00a259a4f205a7ccd9150f645",
              path: result.targets.publication,
            },
            terms: {
              byteCount: 97_233,
              digest:
                "sha256:9b28dc4d1b745e98028227488f77d7db8e46a8ac912c322ae34482f0c389d707",
              path: result.targets.terms,
            },
            translation: {
              byteCount: 1_523_305,
              digest:
                "sha256:38763b972b2efeeed3062ba3495042c28f320cf734071e010d746c525ebce47e",
              path: result.targets.translation,
            },
          },
        });
        expect(result.backupExists).toBe(false);
        expect(result.installed).toBe(true);
        expect(result.installedBytes).toEqual({
          edition,
          publication,
          terms,
          translation,
        });
      }),
    60_000
  );

  it.effect(
    "classifies every atomic installation boundary as a write failure",
    () =>
      Effect.gen(function* () {
        const { sources } = yield* QuranSyncFixture;
        const failures = yield* Effect.all(
          [
            quranSyncTestProgram(sources, {
              configureFileSystem: (fileSystem) => ({
                ...fileSystem,
                makeDirectory: () =>
                  Effect.fail(quranSyncFileFailure("makeDirectory")),
              }),
            }),
            quranSyncTestProgram(sources, {
              configureFileSystem: (fileSystem) => ({
                ...fileSystem,
                makeTempDirectory: () =>
                  Effect.fail(quranSyncFileFailure("makeTempDirectory")),
              }),
            }),
            quranSyncTestProgram(sources, {
              configureFileSystem: (fileSystem) => ({
                ...fileSystem,
                writeFile: () => Effect.fail(quranSyncFileFailure("writeFile")),
              }),
            }),
          ],
          { concurrency: "unbounded" }
        );

        expect(
          Arr.every(
            failures,
            ({ installed, outcome }) =>
              !installed &&
              outcome._tag === "Failure" &&
              outcome.failure.phase === "write"
          )
        ).toBe(true);
      })
  );

  it.effect(
    "restores the complete prior bundle when staged installation fails",
    () =>
      Effect.gen(function* () {
        const { sources } = yield* QuranSyncFixture;
        const prior = makePriorQuranSyncSources();
        const result = yield* quranSyncTestProgram(sources, {
          configureFileSystem: (fileSystem) => ({
            ...fileSystem,
            rename: (source, target) =>
              source.includes("german-stage-") && target.endsWith("/german")
                ? Effect.fail(quranSyncFileFailure("rename"))
                : fileSystem.rename(source, target),
          }),
          prior,
        });

        expect(result.outcome).toMatchObject({
          _tag: "Failure",
          failure: { phase: "write", source: "German Quran source bundle" },
        });
        expect(result.backupExists).toBe(false);
        expect(result.installedBytes).toEqual(prior);
      })
  );

  it.effect(
    "preserves the recoverable backup when installation and restoration fail",
    () =>
      Effect.gen(function* () {
        const { sources } = yield* QuranSyncFixture;
        const prior = makePriorQuranSyncSources();
        const result = yield* quranSyncTestProgram(sources, {
          configureFileSystem: (fileSystem) => ({
            ...fileSystem,
            rename: (source, target) =>
              target.endsWith("/german")
                ? Effect.fail(quranSyncFileFailure("rename"))
                : fileSystem.rename(source, target),
          }),
          prior,
        });
        const failure = yield* Effect.fromOption(
          Result.getFailure(result.outcome)
        ).pipe(Effect.orDie);

        expect(failure).toMatchObject({
          phase: "write",
          source: "German Quran source bundle",
        });
        expect(failure.cause).toMatchObject({
          installation: { reason: { method: "rename" } },
          restoration: { reason: { method: "rename" } },
        });
        expect(result.backupExists).toBe(true);
        expect(result.installed).toBe(false);
      })
  );

  it.effect(
    "reports a first installation failure without inventing a prior tree",
    () =>
      Effect.gen(function* () {
        const { sources } = yield* QuranSyncFixture;
        const result = yield* quranSyncTestProgram(sources, {
          configureFileSystem: (fileSystem) => ({
            ...fileSystem,
            rename: (source, target) =>
              source.includes("german-stage-") && target.endsWith("/german")
                ? Effect.fail(quranSyncFileFailure("rename"))
                : fileSystem.rename(source, target),
          }),
        });
        const failure = yield* Effect.fromOption(
          Result.getFailure(result.outcome)
        ).pipe(Effect.orDie);

        expect(failure).toMatchObject({
          phase: "write",
          source: "German Quran source bundle",
        });
        expect(failure.cause).toMatchObject({
          reason: { method: "rename" },
        });
        expect(result.backupExists).toBe(false);
        expect(result.installed).toBe(false);
      })
  );
});
