import {
  ContentKeySchema,
  PublicPathSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  makeRouteItems,
  RoutePlanConflictError,
  type RouteTransition,
  type RouteVersion,
} from "#publisher/routes";

const releaseId = ReleaseIdSchema.make("test-routes");

/** Creates one unmistakably test-owned public route version. */
function version(name: string, path?: string): RouteVersion {
  return {
    contentKey: ContentKeySchema.make(`test:${name}`),
    locale: "en",
    ...(path === undefined
      ? {}
      : { publicPath: PublicPathSchema.make(`subjects/test/${path}`) }),
  };
}

/** Collects one planned final-path delta without bypassing its stream API. */
function collect(transitions: readonly RouteTransition[]) {
  return Effect.runPromise(
    makeRouteItems<never, never>(
      releaseId,
      Stream.fromIterable(transitions)
    ).pipe(
      Stream.runCollect,
      Effect.map((items) => Array.from(items))
    )
  );
}

/** Returns one route-planning failure without a FiberFailure wrapper. */
function reject(transitions: readonly RouteTransition[]) {
  return Effect.runPromise(
    makeRouteItems<never, never>(
      releaseId,
      Stream.fromIterable(transitions)
    ).pipe(Stream.runDrain, Effect.flip)
  );
}

describe("route derivation", () => {
  it("binds new paths without restaging unchanged ownership", async () => {
    const created = version("created", "created");
    const stable = version("stable", "stable");
    const items = await collect([
      { current: version("created"), next: created },
      { current: stable, next: stable },
    ]);

    expect(items.map(({ change }) => change)).toEqual([
      {
        contentKey: created.contentKey,
        locale: "en",
        operation: "bind",
        publicPath: created.publicPath,
      },
    ]);
  });

  it("emits one bind when ownership transfers at the same path", async () => {
    const oldOwner = version("old", "shared");
    const newOwner = version("new", "shared");
    const items = await collect([
      { current: oldOwner, next: version("old") },
      { current: version("new"), next: newOwner },
    ]);

    expect(items.map(({ change }) => change)).toEqual([
      {
        contentKey: newOwner.contentKey,
        locale: "en",
        operation: "bind",
        publicPath: newOwner.publicPath,
      },
    ]);
  });

  it("represents path swaps as two final owner bindings", async () => {
    const first = version("first", "first");
    const second = version("second", "second");
    const items = await collect([
      { current: first, next: version("first", "second") },
      { current: second, next: version("second", "first") },
    ]);

    expect(items.map(({ change }) => change)).toEqual([
      {
        contentKey: second.contentKey,
        locale: "en",
        operation: "bind",
        publicPath: first.publicPath,
      },
      {
        contentKey: first.contentKey,
        locale: "en",
        operation: "bind",
        publicPath: second.publicPath,
      },
    ]);
  });

  it("deletes removed paths and binds renamed paths deterministically", async () => {
    const removed = version("removed", "removed");
    const renamed = version("renamed", "old");
    const next = version("renamed", "new");
    const items = await collect([
      { current: removed, next: version("removed") },
      { current: renamed, next },
    ]);

    expect(items.map(({ change }) => change)).toEqual([
      {
        contentKey: next.contentKey,
        locale: "en",
        operation: "bind",
        publicPath: next.publicPath,
      },
      { locale: "en", operation: "delete", publicPath: renamed.publicPath },
      { locale: "en", operation: "delete", publicPath: removed.publicPath },
    ]);
  });

  it.each(["current", "next"] as const)(
    "rejects duplicate %s route ownership",
    async (side) => {
      const first = version("first", "shared");
      const second = version("second", "shared");
      const absentFirst = version("first");
      const absentSecond = version("second");
      const transitions =
        side === "current"
          ? [
              { current: first, next: absentFirst },
              { current: second, next: absentSecond },
            ]
          : [
              { current: absentFirst, next: first },
              { current: absentSecond, next: second },
            ];

      await expect(reject(transitions)).resolves.toEqual(
        new RoutePlanConflictError({
          existingContentKey: first.contentKey,
          incomingContentKey: second.contentKey,
          locale: "en",
          publicPath: PublicPathSchema.make("subjects/test/shared"),
          side,
        })
      );
    }
  );

  it("indexes the canonical final delta", async () => {
    const items = await collect([
      { current: version("first"), next: version("first", "first") },
      { current: version("second", "old"), next: version("second", "new") },
    ]);
    expect(items.map(({ index }) => index)).toEqual([0, 1, 2]);
    expect(items.every((item) => item.releaseId === releaseId)).toBe(true);
  });
});
