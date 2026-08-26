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
  it.effect("accepts complete genesis snapshots under one policy", () =>
    Effect.gen(function* () {
      const current = yield* makeSnapshotTestData();

      expect(
        yield* verifyReleasePolicyTransition({
          basePolicy: null,
          manifests: current.manifests,
          policy,
          scope: completeScope,
        })
      ).toBeUndefined();
    })
  );

  it.effect(
    "allows inheritance only while the release policy is unchanged",
    () =>
      Effect.gen(function* () {
        const current = yield* makeSnapshotTestData();
        const program = current.manifests.filter(
          (manifest) => manifest.family === "program"
        );

        expect(
          yield* verifyReleasePolicyTransition({
            basePolicy: policy,
            manifests: program,
            policy,
            scope: PublicationScopeSchema.make({
              families: ["material"],
              snapshots: ["program"],
            }),
          })
        ).toBeUndefined();
      })
  );

  it.effect.each([
    { basePolicy: null, name: "genesis" },
    {
      basePolicy: { activeAppLocales: priorAppLocales },
      name: "policy change",
    },
  ])("rejects incomplete snapshots during $name", ({ basePolicy }) =>
    Effect.gen(function* () {
      const current = yield* makeSnapshotTestData();
      const missingError = yield* verifyReleasePolicyTransition({
        basePolicy,
        manifests: current.manifests.filter(
          (manifest) => manifest.family !== "quran"
        ),
        policy,
        scope: completeScope,
      }).pipe(Effect.flip);

      expect(missingError).toBeInstanceOf(ReleasePolicyClosureError);
      expect(missingError).toMatchObject({
        family: "quran",
        field: "manifest",
      });
    })
  );

  it.effect("rejects duplicate structured scopes", () =>
    Effect.gen(function* () {
      const current = yield* makeSnapshotTestData();
      const program = current.manifests.find(
        (manifest) => manifest.family === "program"
      );
      if (program === undefined) {
        return yield* Effect.die("Expected the current program manifest.");
      }
      const duplicateError = yield* verifyReleasePolicyTransition({
        basePolicy: policy,
        manifests: [...current.manifests, program],
        policy,
        scope: completeScope,
      }).pipe(Effect.flip);

      expect(duplicateError).toMatchObject({
        actual: "2",
        expected: "at-most-one",
        family: "program",
        field: "manifest",
      });
    })
  );

  it.effect("rejects locale policy drift", () =>
    Effect.gen(function* () {
      const current = yield* makeSnapshotTestData();
      const program = current.manifests.find(
        (manifest) => manifest.family === "program"
      );
      if (
        program?.family !== "program" ||
        program.manifest.format !== PROGRAM_SNAPSHOT_FORMAT
      ) {
        return yield* Effect.die("Expected the current program manifest.");
      }
      const shortAppLocales = yield* Schema.decodeEffect(
        ActiveAppLocaleListSchema
      )(["en"]);
      const changedAppLocales = yield* Schema.decodeEffect(
        ActiveAppLocaleListSchema
      )(["en", "de"]);
      /** Returns the exact policy failure for one changed program manifest. */
      const reject = (manifest: typeof program) =>
        verifyReleasePolicyTransition({
          basePolicy: policy,
          manifests: current.manifests.map((candidate) =>
            candidate.family === "program" ? manifest : candidate
          ),
          policy,
          scope: completeScope,
        }).pipe(Effect.flip);
      const [shortLocales, changedLocales] = yield* Effect.all([
        reject({
          ...program,
          manifest: { ...program.manifest, activeAppLocales: shortAppLocales },
        }),
        reject({
          ...program,
          manifest: {
            ...program.manifest,
            activeAppLocales: changedAppLocales,
          },
        }),
      ]);

      expect(shortLocales).toMatchObject({ field: "activeAppLocales" });
      expect(changedLocales).toMatchObject({ field: "activeAppLocales" });
    })
  );

  it.effect(
    "rejects partial content scope during genesis or locale policy changes",
    () =>
      Effect.gen(function* () {
        const current = yield* makeSnapshotTestData();
        const error = yield* verifyReleasePolicyTransition({
          basePolicy: null,
          manifests: current.manifests,
          policy,
          scope: PublicationScopeSchema.make({
            families: [],
            snapshots: ["program", "quran", "tryout"],
          }),
        }).pipe(Effect.flip);

        expect(error).toMatchObject({
          actual: "partial",
          expected: "complete-family",
          family: "article",
          field: "scope",
        });
      })
  );
});
