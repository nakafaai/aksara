import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Cause, Effect, Logger, Runtime } from "effect";

/** The stream that receives a failed program's report. */
type FailureStream = "stderr" | "stdout";

/**
 * Runs one maintenance program as the Node process when Node executes its
 * module directly. An imported module stays inert, so a test or another
 * script that imports it never starts the program. A failed program reports
 * its cause on stderr, where the script's other diagnostics go, unless the
 * script asks for stdout because it has always reported there.
 */
export function runEntry<E>(
  main: boolean,
  program: Effect.Effect<unknown, E, NodeServices.NodeServices>,
  options: { readonly failureStream?: FailureStream } = {}
) {
  if (!main) {
    return;
  }
  NodeRuntime.runMain(
    program.pipe(
      Effect.provide(NodeServices.layer),
      Effect.tapCause((cause) =>
        reportFailure(cause, options.failureStream ?? "stderr")
      )
    ),
    { disableErrorReporting: true }
  );
}

/**
 * Logs a failed program's cause on the chosen stream, as the default runner
 * does, except for an interruption and an error that marks its failure as
 * already reported.
 */
function reportFailure(cause: Cause.Cause<unknown>, stream: FailureStream) {
  const isReported = Runtime.getErrorReported(Cause.squash(cause));
  if (Cause.hasInterruptsOnly(cause) || !isReported) {
    return Effect.void;
  }
  return Effect.logError(cause).pipe(
    Effect.provideService(Logger.LogToStderr, stream === "stderr")
  );
}
