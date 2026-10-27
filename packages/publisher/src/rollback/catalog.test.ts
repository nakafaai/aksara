import { describe, expect, it } from "@effect/vitest";
import type { MaterialHead } from "@nakafa/aksara-contracts/release/head";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Stream } from "effect";
import { mergeRollbackResult } from "#publisher/rollback/catalog";
import type { DerivedRollbackRecord } from "#publisher/rollback/records";
import {
  makeDerivedDelete,
  makeDerivedMaterial,
  makeDerivedTransition,
} from "#test/rollback/spec";

const fixtures = Effect.all({
  current: makeDerivedMaterial({
    contentKey: "test:catalog:a",
    hashCharacter: "a",
    index: 0,
    publicPath: "subjects/test/catalog/a",
  }),
  restored: makeDerivedMaterial({
    contentKey: "test:catalog:a",
    hashCharacter: "b",
    index: 0,
    publicPath: "subjects/test/catalog/restored",
  }),
});
const deleted = makeDerivedDelete({ contentKey: "test:catalog:a", index: 0 });

/** Collects one complete catalog merge without hiding typed failures. */
const collect = Effect.fn("RollbackCatalogTest.collect")(
  (input: {
    readonly active: Stream.Stream<MaterialHead>;
    readonly transitions: Stream.Stream<DerivedRollbackRecord>;
  }) =>
    mergeRollbackResult(input).pipe(
      Stream.runCollect,
      Effect.map((heads) => [...heads])
    )
);

/** Returns one expected catalog merge failure without a FiberFailure wrapper. */
const reject = Effect.fn("RollbackCatalogTest.reject")(
  (input: {
    readonly active: Stream.Stream<MaterialHead>;
    readonly transitions: Stream.Stream<DerivedRollbackRecord>;
  }) => mergeRollbackResult(input).pipe(Stream.runDrain, Effect.flip)
);

describe("mergeRollbackResult", () => {
  it.effect("keeps an untouched head", () =>
    Effect.gen(function* () {
      const { current } = yield* fixtures;

      expect(
        yield* collect({
          active: Stream.make(current.head),
          transitions: Stream.empty,
        })
      ).toEqual([current.head]);
    })
  );

  it.effect(
    "restores a prior material head when the current head is absent",
    () =>
      Effect.gen(function* () {
        const { restored } = yield* fixtures;
        expect(
          yield* collect({
            active: Stream.empty,
            transitions: Stream.make(
              makeDerivedTransition(deleted, restored.state)
            ),
          })
        ).toEqual([restored.head]);
      })
  );

  it.effect(
    "removes a matching active head when the prior state is absent",
    () =>
      Effect.gen(function* () {
        const { current } = yield* fixtures;
        expect(
          yield* collect({
            active: Stream.make(current.head),
            transitions: Stream.make(
              makeDerivedTransition(current.state, deleted)
            ),
          })
        ).toEqual([]);
      })
  );

  it.effect("rejects every active-state contradiction", () =>
    Effect.gen(function* () {
      const { current, restored } = yield* fixtures;
      const contradictions = [
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
      ];
      yield* Effect.forEach(contradictions, (input) =>
        Effect.gen(function* () {
          expect(
            yield* reject({
              active: input.active,
              transitions: Stream.make(input.transition),
            })
          ).toMatchObject({
            _tag: "RollbackCatalogStateMismatchError",
            reason: input.reason,
          });
        })
      );
    })
  );

  it.effect("rejects a restored route colliding with an untouched head", () =>
    Effect.gen(function* () {
      const { restored } = yield* fixtures;
      const untouched = yield* makeDerivedMaterial({
        contentKey: "test:catalog:b",
        hashCharacter: "c",
        index: 1,
        publicPath: restored.head.publicPath,
      });

      expect(
        yield* reject({
          active: Stream.make(untouched.head),
          transitions: Stream.make(
            makeDerivedTransition(deleted, restored.state)
          ),
        })
      ).toMatchObject({
        _tag: "RollbackCatalogRouteError",
        publicPath: restored.head.publicPath,
      });
    })
  );
});
