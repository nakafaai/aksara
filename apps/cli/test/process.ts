import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import {
  NakafaProcess,
  type NakafaProcessInput,
  type RunningProcess,
} from "#cli/child/process";
import { startNakafa } from "#cli/child/session";
import { makePreviewCredentials } from "#cli/credentials";
import type { NakafaAppError } from "#cli/error";
import type { PreviewProvider } from "#cli/provider";
import { inheritedProcessEnvironment } from "#test/environment";

/** Fails if a mocked CLI flow unexpectedly reaches the operating system. */
export const unusedExactProcess = ExactProcess.of({
  run: () =>
    Effect.die(new Error("Unexpected exact process execution in test.")),
});

/** Captures one process request while returning a deterministic child result. */
export const makeProcess = (
  capture: { input?: NakafaProcessInput },
  result: Effect.Effect<RunningProcess, NakafaAppError>
) =>
  NakafaProcess.of({
    start: (input) => {
      capture.input = input;
      return result;
    },
  });

/** Creates one minimal provider input for the real child-process seam. */
export const makeStartInput = Effect.fn("test.makeStartInput")(function* () {
  const credentials = yield* makePreviewCredentials();
  const provider: PreviewProvider = {
    eventsPath: "/events",
    failed: () => Effect.succeed(true),
    manifestPath: "/manifest",
    origin: new URL("http://127.0.0.1:32123"),
    pending: () => Effect.succeed(1),
    ready: () => Effect.succeed(true),
  };
  return { credentials, provider, root: "/code/nakafa.com" };
});

/** Inherited HOME, with PATH only when the given PATH is defined. */
const inheritedVariables = (path: string | undefined) =>
  path === undefined
    ? { HOME: "/home/aksara-test" }
    : { HOME: "/home/aksara-test", PATH: path };

/** Starts the child with the inherited HOME and the given PATH; returns the input it received. */
export function captureInheritedStart(path: string) {
  return Effect.gen(function* () {
    const input = yield* makeStartInput();
    const capture: { input?: NakafaProcessInput } = {};
    const processes = makeProcess(
      capture,
      Effect.succeed({ exitCode: Effect.succeed(0) })
    );
    yield* Effect.scoped(
      startNakafa(input).pipe(Effect.provideService(NakafaProcess, processes))
    );
    return capture.input;
  }).pipe(
    Effect.provide(inheritedProcessEnvironment(inheritedVariables(path)))
  );
}

/** Starts the child with the inherited HOME and the given PATH; returns its start failure. */
export function failInheritedStart(path: string | undefined) {
  return Effect.gen(function* () {
    const input = yield* makeStartInput();
    const processes = makeProcess(
      {},
      Effect.succeed({ exitCode: Effect.succeed(0) })
    );
    return yield* Effect.scoped(
      startNakafa(input).pipe(Effect.provideService(NakafaProcess, processes))
    ).pipe(Effect.flip);
  }).pipe(
    Effect.provide(inheritedProcessEnvironment(inheritedVariables(path)))
  );
}
