import type { MaterialHead } from "@nakafa/aksara-contracts/release/head";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { mergeRollbackResult } from "#publisher/rollback/catalog";
import type { DerivedRollbackRecord } from "#publisher/rollback/records";
import {
  makeDerivedDelete,
  makeDerivedMaterial,
  makeDerivedTransition,
} from "#test/rollback";

const current = makeDerivedMaterial({
  contentKey: "test:catalog:a",
  hashCharacter: "a",
  index: 0,
  publicPath: "subjects/test/catalog/a",
});
const restored = makeDerivedMaterial({
  contentKey: "test:catalog:a",
  hashCharacter: "b",
  index: 0,
  publicPath: "subjects/test/catalog/restored",
});
const deleted = makeDerivedDelete({ contentKey: "test:catalog:a", index: 0 });

/** Collects one complete catalog merge without hiding typed failures. */
function collect(input: {
  readonly active: Stream.Stream<MaterialHead>;
  readonly transitions: Stream.Stream<DerivedRollbackRecord>;
}) {
  return Effect.runPromise(
    mergeRollbackResult(input).pipe(
      Stream.runCollect,
      Effect.map((heads) => [...heads])
    )
  );
}

/** Returns one expected catalog merge failure without a FiberFailure wrapper. */
function reject(input: {
  readonly active: Stream.Stream<MaterialHead>;
  readonly transitions: Stream.Stream<DerivedRollbackRecord>;
}) {
  return Effect.runPromise(
    mergeRollbackResult(input).pipe(Stream.runDrain, Effect.flip)
  );
}

describe("mergeRollbackResult", () => {
  it("keeps untouched heads, including body-only heads without routes", async () => {
    const { publicPath: _publicPath, ...bodyOnlyFields } = current.head;
    const bodyOnly = MaterialHeadSchema.make(bodyOnlyFields);

    await expect(
      collect({ active: Stream.make(bodyOnly), transitions: Stream.empty })
    ).resolves.toEqual([bodyOnly]);
  });

  it("restores a prior material head when the current head is absent", async () => {
    await expect(
      collect({
        active: Stream.empty,
        transitions: Stream.make(
          makeDerivedTransition(deleted, restored.state)
        ),
      })
    ).resolves.toEqual([restored.head]);
  });

  it("removes a matching active head when the prior state is absent", async () => {
    await expect(
      collect({
        active: Stream.make(current.head),
        transitions: Stream.make(makeDerivedTransition(current.state, deleted)),
      })
    ).resolves.toEqual([]);
  });

  it.each([
    {
      active: Stream.empty,
      reason: "missing",
      transition: makeDerivedTransition(current.state, deleted),
    },
    {
      active: Stream.make(current.head),
      reason: "unexpected",
      transition: makeDerivedTransition(deleted, restored.state),
    },
    {
      active: Stream.make(
        MaterialHeadSchema.make({
          ...current.head,
          artifactHash: restored.head.artifactHash,
        })
      ),
      reason: "different",
      transition: makeDerivedTransition(current.state, deleted),
    },
  ] as const)("rejects a $reason active-state contradiction", async (input) => {
    await expect(
      reject({
        active: input.active,
        transitions: Stream.make(input.transition),
      })
    ).resolves.toMatchObject({
      _tag: "RollbackCatalogStateMismatchError",
      reason: input.reason,
    });
  });

  it("rejects a restored route colliding with an untouched head", async () => {
    const untouched = makeDerivedMaterial({
      contentKey: "test:catalog:b",
      hashCharacter: "c",
      index: 1,
      publicPath: restored.head.publicPath ?? "subjects/test/catalog/restored",
    });

    await expect(
      reject({
        active: Stream.make(untouched.head),
        transitions: Stream.make(
          makeDerivedTransition(deleted, restored.state)
        ),
      })
    ).resolves.toMatchObject({
      _tag: "RollbackCatalogRouteError",
      publicPath: restored.head.publicPath,
    });
  });
});
