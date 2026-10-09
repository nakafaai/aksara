import { describe, expect, it } from "@effect/vitest";
import {
  GitCommitShaSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import { ActiveContentReleaseSchema } from "@nakafa/aksara-contracts/release/current/evidence";
import { inheritContentSnapshot } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { ConfigProvider, Effect, Schema } from "effect";
import { HttpClient } from "effect/http";
import { runParityCommand, verifyPublicationParity } from "#cli/parity";
import type { ParityArguments } from "#cli/production/arguments";
import { encodeJsonText } from "#cli/text/json";
import { captureClient, requestJson, webResponse } from "#test/http";
import {
  activeState,
  signedActiveState,
  stateBundle,
  stateCompleted,
  stateCurrent,
  stateRecovery,
} from "#test/state";
import { releaseId } from "#test/target";

const args: ParityArguments = {
  command: "parity",
  recoveryId: releaseId("inverse"),
  releaseId: releaseId("paired"),
};
const active = Schema.decodeSync(ActiveContentReleaseSchema)(
  stateCompleted("paired")
);
const current = activeState(active);
const otherHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const appLocale = AppLocaleSchema.make;

/** Models a different complete active catalog at the parity comparison seam. */
function changedManifest(overrides: Partial<ContentReleaseManifest>) {
  return {
    ...current,
    active: {
      ...active,
      release: {
        ...active.release,
        manifest: { ...active.release.manifest, ...overrides },
      },
    },
  };
}

describe("complete publication parity", () => {
  it.effect(
    "accepts matching results despite independent base histories and a cleared inverse",
    () =>
      Effect.gen(function* () {
        const production = stateCurrent({
          ...current,
          recovery: stateRecovery(active, "inverse"),
        });
        const development = changedManifest({
          baseManifestHash: otherHash,
          baseReleaseId: releaseId("previous"),
        });
        const evidence = yield* verifyPublicationParity(
          args,
          development,
          production
        );
        expect(evidence).toMatchObject({ releaseId: "paired", resultCount: 0 });
      })
  );

  it.effect("accepts equal active locale sets listed in another order", () =>
    Effect.gen(function* () {
      // Each side lists the same three locales in a different unsorted order,
      // so removing either sort, or both, changes the comparison.
      const development = changedManifest({
        activeAppLocales: [appLocale("id"), appLocale("de"), appLocale("en")],
      });
      const production = changedManifest({
        activeAppLocales: [appLocale("en"), appLocale("id"), appLocale("de")],
      });
      expect(
        yield* verifyPublicationParity(args, development, production)
      ).toMatchObject({ releaseId: "paired", resultCount: 0 });
    })
  );

  it.effect.each([
    ["active", { ...current, active: null }],
    ["active", changedManifest({ releaseId: releaseId("different") })],
    [
      "candidate",
      {
        ...current,
        candidate: { ...stateBundle("pending"), phase: "staging" as const },
      },
    ],
    [
      "recovery",
      stateCurrent({
        ...current,
        recovery: stateRecovery(active, "different"),
      }),
    ],
    [
      "recovery",
      stateCurrent({
        ...current,
        recovery: {
          ...stateRecovery(active, "inverse"),
          phase: "aborting" as const,
        },
      }),
    ],
    [
      "source",
      changedManifest({
        origin: { kind: "rollback", releaseId: releaseId("previous") },
      }),
    ],
    [
      "source",
      changedManifest({
        origin: { kind: "git", sha: GitCommitShaSchema.make("b".repeat(40)) },
      }),
    ],
    [
      "renderer",
      {
        ...current,
        active: {
          ...active,
          rendererManifest: { ...active.rendererManifest, hash: otherHash },
        },
      },
    ],
    [
      "locales",
      changedManifest({ activeAppLocales: [AppLocaleSchema.make("en")] }),
    ],
    ["catalog", changedManifest({ resultCount: 1 })],
    ["catalog", changedManifest({ resultDigest: otherHash })],
    [
      "snapshots",
      changedManifest({
        snapshots: {
          ...active.release.manifest.snapshots,
          program: inheritContentSnapshot(otherHash),
        },
      }),
    ],
  ] as const)("rejects %s drift on either target", ([reason, changed]) =>
    Effect.gen(function* () {
      for (const [development, production] of [
        [current, changed],
        [changed, current],
      ] as const) {
        const error = yield* Effect.flip(
          verifyPublicationParity(args, development, production)
        );
        expect(error).toMatchObject({
          _tag: "PublicationParityError",
          reason,
          releaseId: "paired",
        });
        expect(error.message).toContain(
          "converge the complete release before acceptance"
        );
      }
    })
  );
});

const config = {
  AKSARA_DEV_PUBLICATION_ENDPOINT:
    "https://development.example.test/internal/content/releases",
  AKSARA_DEV_PUBLICATION_TOKEN: "development-token",
  AKSARA_PUBLICATION_ENDPOINT:
    "https://production.example.test/internal/content/releases",
  AKSARA_PUBLICATION_TOKEN: "production-token",
};

describe("authenticated parity command", () => {
  it.effect(
    "reads both targets with isolated credentials and verifies actual signatures",
    () =>
      Effect.gen(function* () {
        const { value, resolver } = yield* signedActiveState(active);
        const captured = captureClient((request) =>
          Effect.succeed(
            webResponse(
              request,
              encodeJsonText({ ok: true, operation: "current", value }),
              { headers: { "content-type": "application/json" }, status: 200 }
            )
          )
        );
        const evidence = yield* runParityCommand(args).pipe(
          Effect.provideService(
            ConfigProvider.ConfigProvider,
            ConfigProvider.fromUnknown(config)
          ),
          Effect.provideService(HttpClient.HttpClient, captured.client),
          Effect.provideService(ContentVerificationKeyResolver, resolver)
        );
        expect(evidence).toMatchObject({ releaseId: "paired" });
        expect(
          captured.requests.map((request) => request.headers.authorization)
        ).toEqual(["Bearer development-token", "Bearer production-token"]);
        expect(captured.requests.map(requestJson)).toEqual([
          { operation: "current" },
          { operation: "current" },
        ]);
      })
  );

  it.effect.each([
    "missing",
    "aliased",
    "empty",
    "signature",
    "protocol",
  ] as const)("fails closed for %s target evidence", (failure) =>
    Effect.gen(function* () {
      const { value, resolver } = yield* signedActiveState(active);
      const values = new Map(Object.entries(config));
      if (failure === "missing") {
        values.delete("AKSARA_DEV_PUBLICATION_TOKEN");
      }
      if (failure === "aliased") {
        values.set(
          "AKSARA_DEV_PUBLICATION_ENDPOINT",
          config.AKSARA_PUBLICATION_ENDPOINT
        );
      }
      let response =
        failure === "empty"
          ? {
              active: null,
              candidate: null,
              recovery: null,
              tryoutRuntimeBundle: null,
            }
          : value;
      if (failure === "signature" && response.active) {
        response = {
          ...response,
          active: {
            ...response.active,
            release: {
              ...response.active.release,
              signature: active.release.signature,
            },
          },
        };
      }
      const captured = captureClient((request) =>
        Effect.succeed(
          webResponse(
            request,
            failure === "protocol"
              ? "{}"
              : encodeJsonText({
                  ok: true,
                  operation: "current",
                  value: response,
                }),
            { headers: { "content-type": "application/json" }, status: 200 }
          )
        )
      );
      const error = yield* runParityCommand(args).pipe(
        Effect.provideService(
          ConfigProvider.ConfigProvider,
          ConfigProvider.fromUnknown(Object.fromEntries(values))
        ),
        Effect.provideService(HttpClient.HttpClient, captured.client),
        Effect.provideService(ContentVerificationKeyResolver, resolver),
        Effect.flip
      );
      if (
        failure === "missing" ||
        failure === "protocol" ||
        failure === "signature"
      ) {
        expect(error._tag).toBe("ProductionError");
      } else {
        expect(error).toMatchObject({
          _tag: "PublicationParityError",
          reason: failure === "empty" ? "active" : "target",
        });
      }
      expect(encodeJsonText(error)).not.toContain("production-token");
      expect(encodeJsonText(error)).not.toContain("development-token");
    })
  );
});
