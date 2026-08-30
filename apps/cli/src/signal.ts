import { Exit, Option, PlatformError, Runtime, Schema } from "effect";

/** Node signals that can terminate a delegated CLI process. */
export const NodeSignalSchema = Schema.Literals([
  "SIGABRT",
  "SIGALRM",
  "SIGBUS",
  "SIGCHLD",
  "SIGCONT",
  "SIGFPE",
  "SIGHUP",
  "SIGILL",
  "SIGINT",
  "SIGIO",
  "SIGIOT",
  "SIGKILL",
  "SIGPIPE",
  "SIGPOLL",
  "SIGPROF",
  "SIGPWR",
  "SIGQUIT",
  "SIGSEGV",
  "SIGSTKFLT",
  "SIGSTOP",
  "SIGSYS",
  "SIGTERM",
  "SIGTRAP",
  "SIGTSTP",
  "SIGTTIN",
  "SIGTTOU",
  "SIGUNUSED",
  "SIGURG",
  "SIGUSR1",
  "SIGUSR2",
  "SIGVTALRM",
  "SIGWINCH",
  "SIGXCPU",
  "SIGXFSZ",
  "SIGBREAK",
  "SIGLOST",
  "SIGINFO",
]);

/** One signal understood by the Node process boundary. */
export type NodeSignal = typeof NodeSignalSchema.Type;

/** A delegated process terminated by a signal instead of an exit code. */
export const SignalTerminationSchema = Schema.TaggedStruct(
  "SignalTermination",
  { signal: NodeSignalSchema }
);

/** A validated delegated signal termination. */
export type SignalTermination = typeof SignalTerminationSchema.Type;

const signalMessage =
  /^Process interrupted due to receipt of signal: '(SIG[A-Z0-9]+)'$/u;

/** Reads the signal retained by the pinned Effect Node process adapter. */
export function readExitSignal(error: unknown): Option.Option<NodeSignal> {
  if (!(error instanceof PlatformError.PlatformError)) {
    return Option.none();
  }
  const { reason } = error;
  if (
    reason.module !== "ChildProcess" ||
    reason.method !== "exitCode" ||
    !(reason.cause instanceof Error)
  ) {
    return Option.none();
  }
  const match = signalMessage.exec(reason.cause.message);
  return Schema.decodeUnknownOption(NodeSignalSchema)(match?.[1]);
}

/** Converts an Effect child-process signal failure into launcher termination. */
export function readSignalTermination(
  error: unknown
): Option.Option<SignalTermination> {
  return readExitSignal(error).pipe(
    Option.map((signal) => ({ _tag: "SignalTermination", signal }))
  );
}

/** Preserves delegated signal termination after Effect removes its listeners. */
export function makeLauncherTeardown(
  terminate: (signal: NodeSignal) => void
): Runtime.Teardown {
  return (exit, onExit) => {
    const termination = Exit.isSuccess(exit)
      ? Schema.decodeUnknownOption(SignalTerminationSchema)(exit.value)
      : Option.none();
    if (Option.isSome(termination)) {
      terminate(termination.value.signal);
      return;
    }
    if (Exit.isSuccess(exit) && typeof exit.value === "number") {
      onExit(exit.value);
      return;
    }
    Runtime.defaultTeardown(exit, onExit);
  };
}

/** Clears launcher listeners and re-emits delegated signal termination. */
export function terminateSelf(signal: NodeSignal): void {
  process.removeAllListeners(signal);
  process.kill(process.pid, signal);
}
