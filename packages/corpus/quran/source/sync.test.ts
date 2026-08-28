import { expect, layer } from "@effect/vitest";
import { Deferred, Effect, Fiber, Result } from "effect";
import { TestClock } from "effect/testing";

import {
  GERMAN_QURAN_EDITION_URL,
  GERMAN_QURAN_PUBLICATION_URL,
  GERMAN_QURAN_SOURCE_URL,
  GERMAN_QURAN_TERMS_URL,
} from "#corpus/quran/source/policy";
import {
  makePriorQuranSyncSources,
  QuranSyncFixture,
  quranSyncFileFailure,
  quranSyncFixtureLayer,
  quranSyncTestProgram,
  replaceQuranSyncSource,
} from "#corpus/test/quran-sync";

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

  it.effect("rejects changed bytes for every pinned artifact", () =>
    Effect.gen(function* () {
      const fixture = yield* QuranSyncFixture;
      const edition = Uint8Array.from(fixture.edition);
      const translation = Uint8Array.from(fixture.translation);
      const publication = Uint8Array.from(fixture.publication);
      const terms = Uint8Array.from(fixture.terms);
      edition[0] = edition[0] === 0 ? 1 : 0;
      translation[0] = translation[0] === 0 ? 1 : 0;
      const cases = [
        [GERMAN_QURAN_EDITION_URL, edition, "bubenheim-edition.pdf"],
        [
          GERMAN_QURAN_PUBLICATION_URL,
          publication.subarray(1),
          "islamhouse-german-bubenheim.json",
        ],
        [GERMAN_QURAN_TERMS_URL, terms.subarray(1), "islamhouse-faq.html"],
        [GERMAN_QURAN_SOURCE_URL, translation, "quranenc-de.xml"],
      ] as const;
      const results = yield* Effect.forEach(
        cases,
        ([url, bytes]) =>
          quranSyncTestProgram(
            replaceQuranSyncSource(fixture.sources, url, bytes)
          ),
        { concurrency: "unbounded" }
      );

      expect(results).toMatchObject(
        cases.map(([, , source]) => ({
          installed: false,
          outcome: { failure: { phase: "integrity", source } },
        }))
      );
    })
  );

  it.effect("classifies HTTP and bounded-body failures as downloads", () =>
    Effect.gen(function* () {
      const { sources, translation } = yield* QuranSyncFixture;
      const oversized = new Uint8Array(translation.byteLength + 1);
      const [response, body] = yield* Effect.all(
        [
          quranSyncTestProgram(sources, { status: 503 }),
          quranSyncTestProgram(
            replaceQuranSyncSource(sources, GERMAN_QURAN_SOURCE_URL, oversized)
          ),
        ],
        { concurrency: "unbounded" }
      );

      expect([response, body]).toMatchObject([
        { installed: false, outcome: { failure: { phase: "download" } } },
        { installed: false, outcome: { failure: { phase: "download" } } },
      ]);
    })
  );

  it.effect("bounds a stalled official source download", () =>
    Effect.gen(function* () {
      const { sources } = yield* QuranSyncFixture;
      const stallStarted = yield* Deferred.make<void>();
      const fiber = yield* quranSyncTestProgram(sources, {
        stalledUrl: GERMAN_QURAN_SOURCE_URL,
        stallStarted,
      }).pipe(Effect.forkChild);
      yield* Deferred.await(stallStarted);
      yield* TestClock.adjust("61 seconds");
      const result = yield* Fiber.join(fiber);

      expect(result).toMatchObject({
        installed: false,
        outcome: {
          failure: {
            cause: "Official source download exceeded 60 seconds.",
            phase: "download",
            source: "quranenc-de.xml",
          },
        },
      });
    })
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
          failures.every(
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
