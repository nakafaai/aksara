import { NodeServices } from "@effect/platform-node";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  type ContentReleaseItem,
  ContentReleaseItemSchema,
} from "@nakafa/aksara-contracts/release";
import { ActiveRollbackContentReleaseSchema } from "@nakafa/aksara-contracts/release/current/evidence";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema, Stream } from "effect";
import { HttpClient } from "effect/unstable/http";
import { vi } from "vitest";
import {
  activatesDeveloperPage,
  verifyDeveloperPublication,
  verifyDeveloperRecovery,
} from "#cli/developer-readiness/activation";
import { captureClient } from "#test/http";
import {
  completedBundle,
  currentState,
  gitBundle,
  makeProductionTarget,
  recoveryBundle,
  rollbackBundle,
} from "#test/target";

const calls = vi.hoisted(() => ({
  prepareCalls: 0,
  prepareInput: undefined as unknown,
  readinessCalls: 0,
  readinessFailure: false,
  recoveryItems: [] as ContentReleaseItem[],
  reuseCalls: 0,
}));

vi.mock("#cli/developer-readiness/verify", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    verifyPublishedDeveloperSurface: () => {
      calls.readinessCalls += 1;
      return calls.readinessFailure
        ? TestEffect.fail({ _tag: "DeveloperReadinessError" })
        : TestEffect.void;
    },
  };
});

vi.mock("@nakafa/aksara-publisher/rollback", async () => {
  const { Effect: TestEffect, Stream: TestStream } = await import("effect");
  return {
    prepareRollback: (input: unknown) => {
      calls.prepareCalls += 1;
      calls.prepareInput = input;
      return TestEffect.succeed({
        items: TestStream.fromIterable(calls.recoveryItems),
      });
    },
  };
});

vi.mock("@nakafa/aksara-publisher/preparation/recovery", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    reuseStoredRollbackRelease: (input: {
      readonly prepared: { readonly items: Stream.Stream<ContentReleaseItem> };
    }) => {
      calls.reuseCalls += 1;
      return TestEffect.succeed(input.prepared);
    },
  };
});

const TEST_HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const TEST_RELEASE_ID = ReleaseIdSchema.make("rollback-readiness-test");

/** Creates one canonical page upsert for rollback-readiness tests. */
function pageUpsert(contentKey: "pages/developers" | "pages/imprint") {
  return ContentReleaseItemSchema.make({
    change: {
      artifactHash: TEST_HASH,
      artifactLocale: ArtifactLocaleSchema.make("en"),
      contentKey: ContentKeySchema.make(contentKey),
      delivery: "public",
      family: "page",
      operation: "upsert",
      rendererDomain: "site",
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/${contentKey}/en.mdx`
      ),
    },
    index: 0,
    releaseId: TEST_RELEASE_ID,
  });
}

/** Creates one developer-page deletion that must never require readiness. */
function developerDelete() {
  return ContentReleaseItemSchema.make({
    change: {
      artifactLocale: ArtifactLocaleSchema.make("en"),
      contentKey: ContentKeySchema.make("pages/developers"),
      family: "page",
      operation: "delete",
    },
    index: 0,
    releaseId: TEST_RELEASE_ID,
  });
}

/** Supplies the explicit HTTP boundary required by live readiness. */
function publicationProgram(items: Stream.Stream<ContentReleaseItem>) {
  const client = captureClient(() => Effect.die("Unexpected HTTP request."));
  return verifyDeveloperPublication(items).pipe(
    Effect.provideService(HttpClient.HttpClient, client.client)
  );
}

/** Runs retained recovery through explicit target and Node boundaries. */
function recoveryProgram(input: {
  readonly completed?: boolean;
  readonly hasActive?: boolean;
}) {
  const active = gitBundle("release-active");
  const recovery = recoveryBundle("recovery-active", active);
  const state = currentState({
    active: input.hasActive === false ? null : completedBundle(active),
    candidate: null,
    recovery: input.hasActive === false ? null : recovery,
  });
  const base = makeProductionTarget(() => state);
  const completed = Schema.decodeSync(ActiveRollbackContentReleaseSchema)(
    completedBundle(
      rollbackBundle("recovery-active", active.release.manifest.releaseId)
    )
  );
  const target = PublicationTarget.of({
    ...base,
    recovery: () =>
      Effect.succeed(
        input.completed
          ? { kind: "completed" as const, value: completed }
          : { kind: "missing" as const }
      ),
  });
  const client = captureClient(() => Effect.die("Unexpected HTTP request."));
  return verifyDeveloperRecovery({
    recoveryId: recovery.release.manifest.releaseId,
    releaseId: active.release.manifest.releaseId,
  }).pipe(
    Effect.provideService(
      ContentVerificationKeyResolver,
      makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS)
    ),
    Effect.provideService(HttpClient.HttpClient, client.client),
    Effect.provideService(PublicationTarget, target),
    Effect.provide(NodeServices.layer),
    Effect.scoped
  );
}

describe("developer page activation", () => {
  it.effect("detects an authenticated developer-page upsert", () =>
    Effect.gen(function* () {
      const items = Stream.fromIterable([
        pageUpsert("pages/imprint"),
        pageUpsert("pages/developers"),
      ]);

      expect(yield* activatesDeveloperPage(items)).toBe(true);
      expect(
        yield* items.pipe(Stream.runCollect, Effect.map(Array.from))
      ).toHaveLength(2);
    })
  );

  it.effect("ignores deletion and unrelated page transitions", () =>
    Effect.gen(function* () {
      const deleteItem = ContentReleaseItemSchema.make({
        change: {
          artifactLocale: ArtifactLocaleSchema.make("en"),
          contentKey: ContentKeySchema.make("pages/developers"),
          family: "page",
          operation: "delete",
        },
        index: 0,
        releaseId: TEST_RELEASE_ID,
      });
      const items = Stream.fromIterable([
        deleteItem,
        pageUpsert("pages/imprint"),
      ]);

      expect(yield* activatesDeveloperPage(items)).toBe(false);
    })
  );

  it.effect("gates only an authenticated developer-page upsert", () =>
    Effect.gen(function* () {
      calls.readinessCalls = 0;
      yield* publicationProgram(
        Stream.fromIterable([developerDelete(), pageUpsert("pages/imprint")])
      );
      expect(calls.readinessCalls).toBe(0);

      yield* publicationProgram(Stream.make(pageUpsert("pages/developers")));
      expect(calls.readinessCalls).toBe(1);

      calls.readinessFailure = true;
      expect(
        yield* publicationProgram(
          Stream.make(pageUpsert("pages/developers"))
        ).pipe(Effect.flip)
      ).toMatchObject({ _tag: "DeveloperReadinessError" });
      calls.readinessFailure = false;
    })
  );

  it.effect("rebuilds and gates the exact retained inverse", () =>
    Effect.gen(function* () {
      calls.prepareCalls = 0;
      calls.readinessCalls = 0;
      calls.recoveryItems = [pageUpsert("pages/developers")];
      calls.reuseCalls = 0;

      yield* recoveryProgram({});

      expect(calls.prepareCalls).toBe(1);
      expect(calls.reuseCalls).toBe(1);
      expect(calls.readinessCalls).toBe(1);
      expect(calls.prepareInput).toMatchObject({
        releaseId: "recovery-active",
        rollbackOf: "release-active",
      });
    })
  );

  it.effect("allows completed, unrelated, and deleting recovery safely", () =>
    Effect.gen(function* () {
      calls.prepareCalls = 0;
      calls.readinessCalls = 0;
      calls.recoveryItems = [developerDelete(), pageUpsert("pages/imprint")];

      yield* recoveryProgram({});
      expect(calls.prepareCalls).toBe(1);
      expect(calls.readinessCalls).toBe(0);

      yield* recoveryProgram({ completed: true });
      expect(calls.prepareCalls).toBe(1);
      expect(calls.readinessCalls).toBe(0);
    })
  );

  it.effect("rejects recovery without the exact active pair", () =>
    Effect.gen(function* () {
      calls.prepareCalls = 0;
      expect(
        yield* recoveryProgram({ hasActive: false }).pipe(Effect.flip)
      ).toMatchObject({ _tag: "RetainedRecoveryStateError", reason: "active" });
      expect(calls.prepareCalls).toBe(0);
    })
  );
});
