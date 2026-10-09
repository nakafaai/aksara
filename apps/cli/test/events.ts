import { ServerResponse } from "node:http";
import { Array as Arr, Effect } from "effect";
import { PREVIEW_EVENTS_PATH } from "#cli/provider/http";
import {
  openPreviewHttpReader,
  PREVIEW_PROVIDER_TEST_TOKEN,
  PreviewProviderTestError,
  readProviderEvent,
  requestPreviewHttp,
} from "#test/provider";

/** Reads one mandatory body chunk and rejects an early stream close. */
export const readBodyChunk = Effect.fn(
  "AksaraCliTest.readPreviewHttpBodyChunk"
)((reader: ReadableStreamDefaultReader<Uint8Array>) =>
  readProviderEvent(reader).pipe(
    Effect.flatMap((result) =>
      result.done
        ? Effect.fail(new PreviewProviderTestError({ stage: "stream" }))
        : Effect.succeed(result.value)
    )
  )
);

/** Reads exactly one complete SSE block without assuming network chunking. */
export function makeEventReader(
  reader: ReadableStreamDefaultReader<Uint8Array>
) {
  const decoder = new TextDecoder();
  let buffered = "";

  /** Reads the next complete block and retains any following bytes. */
  return Effect.fn("AksaraCliTest.readPreviewHttpEvent")(() =>
    Effect.gen(function* () {
      let boundary = buffered.indexOf("\n\n");
      while (boundary < 0) {
        buffered += decoder.decode(yield* readBodyChunk(reader), {
          stream: true,
        });
        boundary = buffered.indexOf("\n\n");
      }
      const event = buffered.slice(0, boundary + 2);
      buffered = buffered.slice(boundary + 2);
      return event;
    })
  );
}

/** Waits for one asynchronous Vitest assertion through a typed Effect seam. */
export const waitFor = Effect.fn("AksaraCliTest.waitForPreviewHttpAssertion")(
  (assertion: () => void) =>
    Effect.tryPromise({
      catch: (cause) => new PreviewProviderTestError({ cause, stage: "wait" }),
      try: () => vi.waitFor(assertion),
    })
);

/** The exact keep-alive line that the transport writes to an idle event stream. */
export const KEEP_ALIVE_LINE = ": keep-alive\n\n";

/** Counts keep-alive lines written to any response until its scope closes. */
export const keepAliveLineCounter = Effect.acquireRelease(
  Effect.sync(() => vi.spyOn(ServerResponse.prototype, "write")),
  (spy) => Effect.sync(() => spy.mockRestore())
).pipe(
  Effect.map(
    (spy) => () =>
      Arr.filter(spy.mock.calls, ([chunk]) => chunk === KEEP_ALIVE_LINE).length
  )
);

/** Opens one authenticated event stream and returns its raw body reader. */
export const openEventStream = Effect.fn(
  "AksaraCliTest.openPreviewEventStream"
)(function* (origin: URL) {
  const events = yield* requestPreviewHttp(
    new URL(PREVIEW_EVENTS_PATH, origin),
    { headers: { authorization: `Bearer ${PREVIEW_PROVIDER_TEST_TOKEN}` } }
  );
  return yield* openPreviewHttpReader(events);
});
