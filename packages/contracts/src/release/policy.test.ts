import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
} from "#contracts/locale";
import { PROGRAM_SNAPSHOT_FORMAT } from "#contracts/program/snapshot/spec";
import {
  ReleasePolicyClosureError,
  verifyReleasePolicyTransition,
} from "#contracts/release/policy";
import { PublicationScopeSchema } from "#contracts/release/snapshot/scope";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

const activeAppLocales = ACTIVE_APP_LOCALES;
const priorAppLocales = Schema.decodeSync(ActiveAppLocaleListSchema)([
  "en",
  "id",
]);
const policy = { activeAppLocales } as const;
const completeScope = PublicationScopeSchema.make({
  families: ["article", "material", "page", "question"],
  snapshots: ["program", "quran", "tryout"],
});

describe("release policy", () => {
  it("accepts complete genesis snapshots under one policy", async () => {
    const current = await Effect.runPromise(makeSnapshotTestData());

    await expect(
      Effect.runPromise(
        verifyReleasePolicyTransition({
          basePolicy: null,
          manifests: current.manifests,
          policy,
          scope: completeScope,
        })
      )
    ).resolves.toBeUndefined();
  });

  it("allows inheritance only while the release policy is unchanged", async () => {
    const current = await Effect.runPromise(makeSnapshotTestData());
    const program = current.manifests.filter(
      (manifest) => manifest.family === "program"
    );

    await expect(
      Effect.runPromise(
        verifyReleasePolicyTransition({
          basePolicy: policy,
          manifests: program,
          policy,
          scope: PublicationScopeSchema.make({
            families: ["material"],
            snapshots: ["program"],
          }),
        })
      )
    ).resolves.toBeUndefined();
  });

  it.each([
    { basePolicy: null, name: "genesis" },
    {
      basePolicy: { activeAppLocales: priorAppLocales },
      name: "policy change",
    },
  ])("rejects incomplete snapshots during $name", async ({ basePolicy }) => {
    const current = await Effect.runPromise(makeSnapshotTestData());
    const missingError = await Effect.runPromise(
      verifyReleasePolicyTransition({
        basePolicy,
        manifests: current.manifests.filter(
          (manifest) => manifest.family !== "quran"
        ),
        policy,
        scope: completeScope,
      }).pipe(Effect.flip)
    );

    expect(missingError).toBeInstanceOf(ReleasePolicyClosureError);
    expect(missingError).toMatchObject({ family: "quran", field: "manifest" });
  });

  it("rejects duplicate structured scopes", async () => {
    const current = await Effect.runPromise(makeSnapshotTestData());
    const program = current.manifests.find(
      (manifest) => manifest.family === "program"
    );
    if (program === undefined) {
      throw new Error("Expected the current program manifest.");
    }
    const duplicateError = await Effect.runPromise(
      verifyReleasePolicyTransition({
        basePolicy: policy,
        manifests: [...current.manifests, program],
        policy,
        scope: completeScope,
      }).pipe(Effect.flip)
    );

    expect(duplicateError).toMatchObject({
      actual: "2",
      expected: "at-most-one",
      family: "program",
      field: "manifest",
    });
  });

  it("rejects locale policy drift", async () => {
    const current = await Effect.runPromise(makeSnapshotTestData());
    const program = current.manifests.find(
      (manifest) => manifest.family === "program"
    );
    if (
      program?.family !== "program" ||
      program.manifest.format !== PROGRAM_SNAPSHOT_FORMAT
    ) {
      throw new Error("Expected the current program manifest.");
    }
    const shortAppLocales = Schema.decodeSync(ActiveAppLocaleListSchema)([
      "en",
    ]);
    const changedAppLocales = Schema.decodeSync(ActiveAppLocaleListSchema)([
      "en",
      "de",
    ]);
    /** Returns the exact policy failure for one changed program manifest. */
    const reject = (manifest: typeof program) =>
      Effect.runPromise(
        verifyReleasePolicyTransition({
          basePolicy: policy,
          manifests: current.manifests.map((candidate) =>
            candidate.family === "program" ? manifest : candidate
          ),
          policy,
          scope: completeScope,
        }).pipe(Effect.flip)
      );
    const [shortLocales, changedLocales] = await Promise.all([
      reject({
        ...program,
        manifest: { ...program.manifest, activeAppLocales: shortAppLocales },
      }),
      reject({
        ...program,
        manifest: { ...program.manifest, activeAppLocales: changedAppLocales },
      }),
    ]);

    expect(shortLocales).toMatchObject({ field: "activeAppLocales" });
    expect(changedLocales).toMatchObject({ field: "activeAppLocales" });
  });

  it("rejects partial content scope during genesis or locale policy changes", async () => {
    const current = await Effect.runPromise(makeSnapshotTestData());
    const error = await Effect.runPromise(
      verifyReleasePolicyTransition({
        basePolicy: null,
        manifests: current.manifests,
        policy,
        scope: PublicationScopeSchema.make({
          families: [],
          snapshots: ["program", "quran", "tryout"],
        }),
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      actual: "partial",
      expected: "complete-family",
      family: "article",
      field: "scope",
    });
  });
});
