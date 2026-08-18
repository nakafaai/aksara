import { NodeContext } from "@effect/platform-node";
import { Effect, Fiber, TestClock, TestContext } from "effect";
import { describe, expect, it } from "vitest";

import {
  GERMAN_QURAN_PUBLICATION_URL,
  GERMAN_QURAN_SOURCE_URL,
} from "#corpus/quran/source/policy";
import {
  officialQuranSyncSources,
  quranSyncFileFailure,
  quranSyncTestProgram,
  replaceQuranSyncSource,
  runQuranSyncTest,
} from "#corpus/test/quran-sync";

describe("German Quran source sync", () => {
  it("installs only the exact translation and publication record bytes", async () => {
    const prior = {
      publication: new TextEncoder().encode("prior publication"),
      translation: new TextEncoder().encode("prior translation"),
    };
    const [firstInstall, result] = await Promise.all([
      runQuranSyncTest(),
      runQuranSyncTest(officialQuranSyncSources, { prior }),
    ]);

    expect(firstInstall.outcome._tag).toBe("Right");
    expect(firstInstall.backupExists).toBe(false);
    expect(result.outcome).toMatchObject({
      _tag: "Right",
      right: {
        publication: {
          byteCount: 3485,
          digest:
            "sha256:df3b2437afa0f52c3621c8c611384c45b00169e00a259a4f205a7ccd9150f645",
          path: result.targets.publication,
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
      publication: officialQuranSyncSources.get(GERMAN_QURAN_PUBLICATION_URL),
      translation: officialQuranSyncSources.get(GERMAN_QURAN_SOURCE_URL),
    });
  }, 30_000);

  it("rejects changed bytes for either pinned artifact", async () => {
    const translation = Uint8Array.from(
      officialQuranSyncSources.get(GERMAN_QURAN_SOURCE_URL) ?? []
    );
    const publication = Uint8Array.from(
      officialQuranSyncSources.get(GERMAN_QURAN_PUBLICATION_URL) ?? []
    );
    translation[0] = translation[0] === 0 ? 1 : 0;
    const [incomplete, mismatched] = await Promise.all([
      runQuranSyncTest(
        replaceQuranSyncSource(
          GERMAN_QURAN_PUBLICATION_URL,
          publication.subarray(1)
        )
      ),
      runQuranSyncTest(
        replaceQuranSyncSource(GERMAN_QURAN_SOURCE_URL, translation)
      ),
    ]);

    expect([incomplete, mismatched]).toMatchObject([
      {
        installed: false,
        outcome: {
          left: {
            phase: "integrity",
            source: "islamhouse-german-bubenheim.json",
          },
        },
      },
      {
        installed: false,
        outcome: {
          left: { phase: "integrity", source: "quranenc-de.xml" },
        },
      },
    ]);
  });

  it("classifies HTTP and bounded-body failures as downloads", async () => {
    const translation = officialQuranSyncSources.get(GERMAN_QURAN_SOURCE_URL);
    if (translation === undefined) {
      throw new Error("Expected the pinned German Quran source fixture.");
    }
    const oversized = new Uint8Array(translation.byteLength + 1);
    const [response, body] = await Promise.all([
      runQuranSyncTest(officialQuranSyncSources, { status: 503 }),
      runQuranSyncTest(
        replaceQuranSyncSource(GERMAN_QURAN_SOURCE_URL, oversized)
      ),
    ]);

    expect([response, body]).toMatchObject([
      { installed: false, outcome: { left: { phase: "download" } } },
      { installed: false, outcome: { left: { phase: "download" } } },
    ]);
  });

  it("bounds a stalled official source download", async () => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const fiber = yield* quranSyncTestProgram(officialQuranSyncSources, {
          stalledUrl: GERMAN_QURAN_SOURCE_URL,
        }).pipe(Effect.fork);
        yield* TestClock.adjust("61 seconds");
        return yield* Fiber.join(fiber);
      }).pipe(
        Effect.provide(NodeContext.layer),
        Effect.provide(TestContext.TestContext)
      )
    );

    expect(result).toMatchObject({
      installed: false,
      outcome: {
        left: {
          cause: "Official source download exceeded 60 seconds.",
          phase: "download",
          source: "quranenc-de.xml",
        },
      },
    });
  });

  it("classifies every atomic installation boundary as a write failure", async () => {
    const failures = await Promise.all([
      runQuranSyncTest(officialQuranSyncSources, {
        configureFileSystem: (fileSystem) => ({
          ...fileSystem,
          makeDirectory: () =>
            Effect.fail(quranSyncFileFailure("makeDirectory")),
        }),
      }),
      runQuranSyncTest(officialQuranSyncSources, {
        configureFileSystem: (fileSystem) => ({
          ...fileSystem,
          makeTempDirectory: () =>
            Effect.fail(quranSyncFileFailure("makeTempDirectory")),
        }),
      }),
      runQuranSyncTest(officialQuranSyncSources, {
        configureFileSystem: (fileSystem) => ({
          ...fileSystem,
          writeFile: () => Effect.fail(quranSyncFileFailure("writeFile")),
        }),
      }),
    ]);

    expect(
      failures.every(
        ({ installed, outcome }) =>
          !installed &&
          outcome._tag === "Left" &&
          outcome.left.phase === "write"
      )
    ).toBe(true);
  });

  it("restores the complete prior pair when staged installation fails", async () => {
    const prior = {
      publication: new TextEncoder().encode("prior publication"),
      translation: new TextEncoder().encode("prior translation"),
    };
    const result = await runQuranSyncTest(officialQuranSyncSources, {
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
      _tag: "Left",
      left: { phase: "write", source: "German Quran source pair" },
    });
    expect(result.backupExists).toBe(false);
    expect(result.installedBytes).toEqual(prior);
  });

  it("preserves the recoverable backup when installation and restoration fail", async () => {
    const prior = {
      publication: new TextEncoder().encode("prior publication"),
      translation: new TextEncoder().encode("prior translation"),
    };
    const result = await runQuranSyncTest(officialQuranSyncSources, {
      configureFileSystem: (fileSystem) => ({
        ...fileSystem,
        rename: (source, target) =>
          target.endsWith("/german")
            ? Effect.fail(quranSyncFileFailure("rename"))
            : fileSystem.rename(source, target),
      }),
      prior,
    });

    expect(result.outcome).toMatchObject({
      _tag: "Left",
      left: {
        cause: {
          installation: { method: "rename" },
          restoration: { method: "rename" },
        },
        phase: "write",
        source: "German Quran source pair",
      },
    });
    expect(result.backupExists).toBe(true);
    expect(result.installed).toBe(false);
  });

  it("reports a first installation failure without inventing a prior tree", async () => {
    const result = await runQuranSyncTest(officialQuranSyncSources, {
      configureFileSystem: (fileSystem) => ({
        ...fileSystem,
        rename: (source, target) =>
          source.includes("german-stage-") && target.endsWith("/german")
            ? Effect.fail(quranSyncFileFailure("rename"))
            : fileSystem.rename(source, target),
      }),
    });

    expect(result.outcome).toMatchObject({
      _tag: "Left",
      left: {
        cause: { method: "rename" },
        phase: "write",
        source: "German Quran source pair",
      },
    });
    expect(result.backupExists).toBe(false);
    expect(result.installed).toBe(false);
  });
});
