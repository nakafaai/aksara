import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema } from "#contracts/locale";
import { PROGRAM_SNAPSHOT_V4_FORMAT } from "#contracts/program/snapshot/spec";
import {
  SnapshotLocaleClosureError,
  verifySnapshotLocaleClosure,
} from "#contracts/release/locale-closure";
import { makeSnapshotTestData } from "#contracts/test/snapshot";
import { makeSnapshotV2TestData } from "#contracts/test/snapshot-v2";

const activeAppLocales = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)([
  "en",
  "id",
]);
const editorialReviewDigest = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);

describe("snapshot locale closure", () => {
  it("accepts all current scopes under one locale and review policy", async () => {
    const current = await Effect.runPromise(makeSnapshotV2TestData());

    await expect(
      Effect.runPromise(
        verifySnapshotLocaleClosure({
          activeAppLocales,
          editorialReviewDigest,
          manifests: current.manifests,
        })
      )
    ).resolves.toBeUndefined();
  });

  it("rejects historical or missing structured scopes", async () => {
    const historical = await Effect.runPromise(makeSnapshotTestData());
    const historicalError = await Effect.runPromise(
      verifySnapshotLocaleClosure({
        activeAppLocales,
        editorialReviewDigest,
        manifests: historical.manifests,
      }).pipe(Effect.flip)
    );
    const current = await Effect.runPromise(makeSnapshotV2TestData());
    const missingError = await Effect.runPromise(
      verifySnapshotLocaleClosure({
        activeAppLocales,
        editorialReviewDigest,
        manifests: current.manifests.filter(
          (manifest) => manifest.family !== "quran"
        ),
      }).pipe(Effect.flip)
    );

    expect(historicalError).toMatchObject({
      _tag: "SnapshotLocaleClosureError",
      family: "program",
      field: "format",
    });
    expect(missingError).toBeInstanceOf(SnapshotLocaleClosureError);
    expect(missingError).toMatchObject({ family: "quran", field: "manifest" });
  });

  it("rejects duplicate structured scopes", async () => {
    const current = await Effect.runPromise(makeSnapshotV2TestData());
    const program = current.manifests.find(
      (manifest) => manifest.family === "program"
    );
    if (program === undefined) {
      throw new Error("Expected the current program manifest.");
    }
    const duplicateError = await Effect.runPromise(
      verifySnapshotLocaleClosure({
        activeAppLocales,
        editorialReviewDigest,
        manifests: [...current.manifests, program],
      }).pipe(Effect.flip)
    );

    expect(duplicateError).toMatchObject({
      actual: "duplicate",
      expected: "exactly-one",
      family: "program",
      field: "manifest",
    });
  });

  it("rejects locale and editorial policy drift", async () => {
    const current = await Effect.runPromise(makeSnapshotV2TestData());
    const program = current.manifests.find(
      (manifest) => manifest.family === "program"
    );
    if (
      program?.family !== "program" ||
      program.manifest.format !== PROGRAM_SNAPSHOT_V4_FORMAT
    ) {
      throw new Error("Expected the current program manifest.");
    }
    const shortAppLocales = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)(
      ["en"]
    );
    const changedAppLocales = Schema.decodeUnknownSync(
      ActiveAppLocaleListSchema
    )(["en", "de"]);
    /** Returns the exact policy failure for one changed program manifest. */
    const reject = (manifest: typeof program) =>
      Effect.runPromise(
        verifySnapshotLocaleClosure({
          activeAppLocales,
          editorialReviewDigest,
          manifests: current.manifests.map((candidate) =>
            candidate.family === "program" ? manifest : candidate
          ),
        }).pipe(Effect.flip)
      );
    const [shortLocales, changedLocales, changedReview] = await Promise.all([
      reject({
        ...program,
        manifest: { ...program.manifest, activeAppLocales: shortAppLocales },
      }),
      reject({
        ...program,
        manifest: { ...program.manifest, activeAppLocales: changedAppLocales },
      }),
      reject({
        ...program,
        manifest: {
          ...program.manifest,
          editorialReviewDigest: Sha256HashSchema.make(
            `sha256:${"e".repeat(64)}`
          ),
        },
      }),
    ]);

    expect(shortLocales).toMatchObject({ field: "activeAppLocales" });
    expect(changedLocales).toMatchObject({ field: "activeAppLocales" });
    expect(changedReview).toMatchObject({ field: "editorialReviewDigest" });
  });
});
