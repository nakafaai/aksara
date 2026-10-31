import { assert, describe, expect, it } from "@effect/vitest";
import type { ContentCacheChange } from "@nakafa/aksara-contracts/cache/content";
import { encodeJsonText } from "@nakafa/aksara-utilities/text/json";
import {
  Array as Arr,
  Effect,
  Fiber,
  Logger,
  MutableList,
  Redacted,
  References,
  Stream,
} from "effect";
import { HttpClientError } from "effect/http";
import { TestClock } from "effect/testing";
import {
  makeAbsentReleaseDispatch,
  makeProductionReleaseDispatch,
} from "#cli/dispatch/activation";
import { captureClient, requestJson, webResponse } from "#test/http";
import { STAGED_RELEASE_BUNDLE } from "#test/target";

const RELEASE = STAGED_RELEASE_BUNDLE.release;
const TOKEN = Redacted.make("dispatch-token");

/** Runs one program after advancing the native Effect test clock past its retry delays. */
function runAfter<A, E>(program: Effect.Effect<A, E>, milliseconds: number) {
  return Effect.gen(function* () {
    const fiber = yield* Effect.forkChild(program);
    yield* Effect.yieldNow;
    yield* TestClock.adjust(milliseconds);
    return yield* Fiber.join(fiber);
  });
}

/** Builds one release dispatch input from the given content changes. */
const dispatchInput = (
  changes: readonly ContentCacheChange[] = [{ scope: "material" }]
) => ({ cacheChanges: Stream.fromIterable(changes), release: RELEASE });

/** Creates one production dispatch through a captured client that answers each request in turn. */
function makeDispatch(statuses: readonly number[]) {
  const pending = MutableList.make<number>();
  MutableList.appendAll(pending, statuses);
  const captured = captureClient((request) => {
    const [code = 204] = MutableList.takeN(pending, 1);
    return Effect.succeed(
      webResponse(request, code === 204 ? null : encodeJsonText({}), {
        status: code,
      })
    );
  });
  return {
    captured,
    dispatch: makeProductionReleaseDispatch({
      client: captured.client,
      token: TOKEN,
    }),
  };
}

describe("production release dispatch", () => {
  it.effect("runs one production deploy for a release with changes", () =>
    Effect.gen(function* () {
      const { captured, dispatch } = makeDispatch([204]);
      expect(
        yield* runAfter(
          dispatch(
            dispatchInput([{ scope: "material" }, { scope: "article" }])
          ),
          0
        )
      ).toBeUndefined();

      expect(captured.requests).toHaveLength(1);
      const [request] = captured.requests;
      assert(request !== undefined, "The dispatch sent no request.");
      expect(requestJson(request)).toEqual({
        inputs: { stage: "prod" },
        ref: "main",
      });
    })
  );

  it.effect("dispatches nothing for a release that changes no content", () =>
    Effect.gen(function* () {
      const { captured, dispatch } = makeDispatch([]);
      expect(yield* dispatch(dispatchInput([]))).toBeUndefined();
      expect(captured.requests).toHaveLength(0);
    })
  );

  it.effect("retries a throttled dispatch until GitHub accepts it", () =>
    Effect.gen(function* () {
      const { captured, dispatch } = makeDispatch([429, 204]);
      expect(yield* runAfter(dispatch(dispatchInput()), 1000)).toBeUndefined();
      expect(captured.requests).toHaveLength(2);
    })
  );

  it.effect("maps a rejected dispatch to the activation error", () =>
    Effect.gen(function* () {
      const { dispatch } = makeDispatch([404]);
      expect(
        yield* Effect.flip(runAfter(dispatch(dispatchInput()), 0))
      ).toMatchObject({
        _tag: "PublicationActivationError",
        phase: "cache",
        releaseId: RELEASE.manifest.releaseId,
      });
    })
  );

  it.effect("logs GitHub's status and reason when the dispatch fails", () =>
    Effect.gen(function* () {
      const captured = captureClient((request) =>
        Effect.succeed(
          webResponse(
            request,
            encodeJsonText({
              message: "Resource not accessible by integration",
            }),
            { status: 403 }
          )
        )
      );
      const dispatch = makeProductionReleaseDispatch({
        client: captured.client,
        token: TOKEN,
      });
      let logs: Readonly<Record<string, unknown>>[] = [];
      const logger = Logger.make(({ fiber, message }) => {
        logs = Arr.append(logs, {
          ...fiber.getRef(References.CurrentLogAnnotations),
          message,
        });
      });
      expect(
        yield* Effect.flip(
          runAfter(dispatch(dispatchInput()), 0).pipe(
            Effect.provide(Logger.layer([logger]))
          )
        )
      ).toMatchObject({ _tag: "PublicationActivationError", phase: "cache" });
      expect(logs).toEqual([
        {
          detail: "Resource not accessible by integration",
          message: ["Nakafa deploy dispatch failed."],
          retryable: false,
          status: 403,
        },
      ]);
    })
  );

  it.effect(
    "maps a transport failure to the activation error after retries",
    () =>
      Effect.gen(function* () {
        const captured = captureClient((request) =>
          Effect.fail(
            new HttpClientError.HttpClientError({
              reason: new HttpClientError.TransportError({ request }),
            })
          )
        );
        const dispatch = makeProductionReleaseDispatch({
          client: captured.client,
          token: TOKEN,
        });
        expect(
          yield* Effect.flip(runAfter(dispatch(dispatchInput()), 10_000))
        ).toMatchObject({ _tag: "PublicationActivationError", phase: "cache" });
        expect(captured.requests).toHaveLength(4);
      })
  );
});

describe("release dispatch timeout", () => {
  it.effect("maps a dispatch that never answers to the activation error", () =>
    Effect.gen(function* () {
      const captured = captureClient(() => Effect.never);
      const dispatch = makeProductionReleaseDispatch({
        client: captured.client,
        token: TOKEN,
      });
      expect(
        yield* Effect.flip(runAfter(dispatch(dispatchInput()), 31_000))
      ).toMatchObject({ _tag: "PublicationActivationError", phase: "cache" });
    })
  );
});

describe("absent release dispatch", () => {
  it.effect("drains the release changes and dispatches nothing", () =>
    Effect.gen(function* () {
      const drain = makeAbsentReleaseDispatch();
      expect(yield* drain(dispatchInput())).toBeUndefined();
    })
  );
});
