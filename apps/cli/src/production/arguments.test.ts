import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { parseProductionArguments } from "#cli/production/arguments";

const baseArguments = [
  "--release-id",
  "release-2026-07-22",
  "--recovery-id",
  "recovery-2026-07-22",
] as const;
const ACTIVE_TRYOUT_SNAPSHOT =
  '{"family":"tryout","manifest":{"activeAppLocales":["en","id","de"],"catalogDigest":"sha256:e9f063181d12a22cf086d2bcb4326f52168867d03e8b54664dc0d162cca68be8","counts":{"country":3,"exam":6,"section":51,"set":15,"track":6},"placementCount":1260,"placementDigest":"sha256:ddecd95295c33a12f5dbb5d64a0502a857f07eef7121f1ee9e2fa64879542d3b","routeCount":72,"format":"localized-tryout-snapshot","snapshotId":"sha256:a190bcb61dddbdafaf3c63507726d6822e18f5ac53e17734c03ed835156c6eaa"}}';
const PROGRAM_SNAPSHOT = `{"family":"program","manifest":{"activeAppLocales":["en"],"curriculumRowCount":0,"format":"localized-program-snapshot","programRowCount":1,"rowCount":1,"rowDigest":"sha256:${"a".repeat(64)}","sitemapCount":0,"slugCount":1,"snapshotId":"sha256:${"b".repeat(64)}"}}`;

/** Decodes one production argument collection. */
function parse(args: readonly string[]) {
  return parseProductionArguments("release", args);
}

/** Returns one typed production argument failure. */
function reject(args: readonly string[]) {
  return parseProductionArguments("release", args).pipe(Effect.flip);
}

describe("release production arguments", () => {
  it.effect("decodes one explicit family publication scope", () =>
    Effect.gen(function* () {
      expect(
        yield* parse([...baseArguments, "--scope", "family:material"])
      ).toEqual({
        command: "release",
        recoveryId: "recovery-2026-07-22",
        releaseId: "release-2026-07-22",
        scope: {
          families: ["material"],
          snapshots: [],
        },
      });
    })
  );

  it.effect("rejects a release without an explicit publication scope", () =>
    Effect.gen(function* () {
      expect(yield* reject(baseArguments)).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: "release",
        option: "--scope",
        reason: "missing",
      });
    })
  );

  it.effect("rejects an invalid publication scope selector", () =>
    Effect.gen(function* () {
      expect(
        yield* reject([...baseArguments, "--scope", "material"])
      ).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: "release",
        option: "--scope",
        reason: "value",
      });
    })
  );

  it.effect("rejects retired exact-content publication selectors", () =>
    Effect.gen(function* () {
      expect(
        yield* reject([
          ...baseArguments,
          "--scope",
          "content:material:en:material/lesson/mathematics/function-concept",
        ])
      ).toMatchObject({
        _tag: "ProductionArgumentsError",
        command: "release",
        option: "--scope",
        reason: "value",
      });
    })
  );

  it.effect("authenticates one exact retained try-out snapshot", () =>
    Effect.gen(function* () {
      const result = yield* parse([
        ...baseArguments,
        "--scope",
        "snapshot:tryout",
        "--base-snapshot",
        ACTIVE_TRYOUT_SNAPSHOT,
      ]);

      expect(result).toMatchObject({
        baseSnapshot: {
          snapshotId:
            "sha256:a190bcb61dddbdafaf3c63507726d6822e18f5ac53e17734c03ed835156c6eaa",
        },
      });
    })
  );

  it.effect("rejects forged or unrelated retained snapshots", () =>
    Effect.gen(function* () {
      const values = [
        "not-json",
        PROGRAM_SNAPSHOT,
        ACTIVE_TRYOUT_SNAPSHOT.replace("ddecd9", "adecd9"),
      ];
      const failures = yield* Effect.forEach(values, (value) =>
        reject([
          ...baseArguments,
          "--scope",
          "snapshot:tryout",
          "--base-snapshot",
          value,
        ])
      );

      expect(failures).toEqual(
        values.map(() =>
          expect.objectContaining({
            option: "--base-snapshot",
            reason: "value",
          })
        )
      );
    })
  );
});

describe("try-out history migration arguments", () => {
  const assetHash = `sha256:${"a".repeat(64)}`;
  const sourceSha = "b".repeat(40);

  it.effect("requires one absolute exclusive receipt destination", () =>
    Effect.gen(function* () {
      const abort = yield* parseProductionArguments("abort-tryout-history", [
        "--release-id",
        "retained-history-v1",
      ]);
      const migrate = yield* parseProductionArguments(
        "migrate-tryout-history",
        [
          "--release-id",
          "retained-history-v1",
          "--receipt-path",
          "/tmp/retained-history-v1.json",
        ]
      );
      const cleanup = yield* parseProductionArguments(
        "cleanup-tryout-history",
        [
          "--release-id",
          "retained-history-v1",
          "--receipt-path",
          "/tmp/retained-history-v1.json",
          "--asset-hash",
          assetHash,
          "--source-sha",
          sourceSha,
        ]
      );
      const missing = yield* parseProductionArguments(
        "migrate-tryout-history",
        ["--release-id", "retained-history-v1"]
      ).pipe(Effect.flip);
      const relative = yield* parseProductionArguments(
        "cleanup-tryout-history",
        [
          "--release-id",
          "retained-history-v1",
          "--receipt-path",
          "retained-history-v1.json",
        ]
      ).pipe(Effect.flip);

      expect(abort).toEqual({
        command: "abort-tryout-history",
        releaseId: "retained-history-v1",
      });
      expect(migrate).toEqual({
        command: "migrate-tryout-history",
        receiptPath: "/tmp/retained-history-v1.json",
        releaseId: "retained-history-v1",
      });
      expect(cleanup).toEqual({
        command: "cleanup-tryout-history",
        proof: { assetHash, sourceSha },
        receiptPath: "/tmp/retained-history-v1.json",
        releaseId: "retained-history-v1",
      });
      expect(missing).toMatchObject({
        option: "--receipt-path",
        reason: "missing",
      });
      expect(relative).toMatchObject({
        option: "--receipt-path",
        reason: "value",
      });
    })
  );

  it.effect("requires valid immutable release proof for cleanup", () =>
    Effect.gen(function* () {
      const base = [
        "--release-id",
        "retained-history-v1",
        "--receipt-path",
        "/tmp/retained-history-v1.json",
      ] as const;
      const failures = yield* Effect.all([
        parseProductionArguments("cleanup-tryout-history", base).pipe(
          Effect.flip
        ),
        parseProductionArguments("cleanup-tryout-history", [
          ...base,
          "--asset-hash",
          "invalid",
          "--source-sha",
          sourceSha,
        ]).pipe(Effect.flip),
        parseProductionArguments("cleanup-tryout-history", [
          ...base,
          "--asset-hash",
          assetHash,
        ]).pipe(Effect.flip),
        parseProductionArguments("cleanup-tryout-history", [
          ...base,
          "--asset-hash",
          assetHash,
          "--source-sha",
          "invalid",
        ]).pipe(Effect.flip),
      ]);

      expect(failures).toEqual([
        expect.objectContaining({ option: "--asset-hash", reason: "missing" }),
        expect.objectContaining({ option: "--asset-hash", reason: "value" }),
        expect.objectContaining({ option: "--source-sha", reason: "missing" }),
        expect.objectContaining({ option: "--source-sha", reason: "value" }),
      ]);
    })
  );

  it.effect("rejects publication and recovery options", () =>
    Effect.gen(function* () {
      const commands = [
        "abort-tryout-history",
        "migrate-tryout-history",
        "cleanup-tryout-history",
      ] as const;
      const failures = yield* Effect.forEach(
        commands.flatMap((command) =>
          ["--scope", "--recovery-id"].map((option) => ({ command, option }))
        ),
        ({ command, option }) => {
          const receipt =
            command === "abort-tryout-history"
              ? []
              : ["--receipt-path", "/tmp/retained-history-v1.json"];
          return parseProductionArguments(command, [
            "--release-id",
            "retained-history-v1",
            ...receipt,
            option,
            "unexpected",
          ]).pipe(Effect.flip);
        }
      );

      expect(failures).toEqual([
        expect.objectContaining({ option: "--scope", reason: "unknown" }),
        expect.objectContaining({
          option: "--recovery-id",
          reason: "unknown",
        }),
        expect.objectContaining({ option: "--scope", reason: "unknown" }),
        expect.objectContaining({
          option: "--recovery-id",
          reason: "unknown",
        }),
        expect.objectContaining({ option: "--scope", reason: "unknown" }),
        expect.objectContaining({
          option: "--recovery-id",
          reason: "unknown",
        }),
      ]);
    })
  );
});
