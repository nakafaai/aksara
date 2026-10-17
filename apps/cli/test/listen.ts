import type { Server } from "node:http";
import type { NodeHttpServer } from "@effect/platform-node";
import { Array as Arr, Effect, MutableRef, Schema } from "effect";
import { unixPathAddress } from "effect/net/NetAddress";

/** How the mocked loopback listener behaves in the current test, and every server it created. */
export const listenPlan = {
  fail: MutableRef.make<boolean>(false),
  servers: Arr.empty<Server>(),
  unix: MutableRef.make<boolean>(false),
};

/** One tagged bind failure that the listener mock reports on demand. */
class ListenTestError extends Schema.TaggedError<
  ListenTestError,
  { readonly brand: unique symbol }
>()("ListenTestError", {}) {}

/**
 * Wraps the platform listener so that one test can fail the bind or report a
 * Unix address, while every Node server that the provider creates is recorded.
 */
export function mockListen(make: typeof NodeHttpServer.make) {
  return (...[evaluate, options]: Parameters<typeof make>) => {
    if (MutableRef.get(listenPlan.fail)) {
      return Effect.fail(new ListenTestError());
    }
    const listening = make(() => {
      const server = evaluate();
      listenPlan.servers = Arr.append(listenPlan.servers, server);
      return server;
    }, options);
    return MutableRef.get(listenPlan.unix)
      ? Effect.map(listening, (server) => ({
          ...server,
          address: unixPathAddress("/tmp/aksara-listen-test.sock"),
        }))
      : listening;
  };
}
