import {
  Exit,
  Option,
  PlatformError,
  Predicate,
  Runtime,
  Schema,
} from "effect";

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
  // Platform-owned error identity: @effect/platform exposes no Schema for
  // PlatformError, so its own prototype discriminator stays the native check.
  if (!(error instanceof PlatformError.PlatformError)) {
    return Option.none();
  }
  const { reason } = error;
  if (
    reason.module !== "ChildProcess" ||
    reason.method !== "exitCode" ||
    !Predicate.isObject(reason.cause) ||
    !Predicate.hasProperty(reason.cause, "message") ||
    !Predicate.isString(reason.cause.message)
  ) {
    return Option.none();
  }
  const match = signalMessage.exec(reason.cause.message);
  // biome-ignore lint/suspicious/noUnnecessaryConditions: RegExp.exec returns null on no match; Biome 2.5.14 false positive (biomejs/biome#11278).
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

interface LauncherTeardownInput {
  /** Records a numeric status without forcing process termination. */
  readonly setExitCode: (exitCode: number) => void;
  /** Re-emits an exact delegated signal at the host boundary. */
  readonly terminate: (signal: NodeSignal) => void;
}

/** Preserves delegated signal termination after Effect removes its listeners. */
export function makeLauncherTeardown(
  input: LauncherTeardownInput
): Runtime.Teardown {
  return (exit, onExit) => {
    const termination = Exit.isSuccess(exit)
      ? Schema.decodeUnknownOption(SignalTerminationSchema)(exit.value)
      : Option.none();
    if (Option.isSome(termination)) {
      input.terminate(termination.value.signal);
      return;
    }
    if (Exit.isSuccess(exit) && Predicate.isNumber(exit.value)) {
      input.setExitCode(exit.value);
      onExit(0);
      return;
    }
    Runtime.defaultTeardown(exit, onExit);
  };
}

/** Records a numeric status while allowing Node streams to drain naturally. */
export function setProcessExitCode(exitCode: number): void {
  process.exitCode = exitCode;
}

/** Clears launcher listeners and re-emits delegated signal termination. */
export function terminateSelf(signal: NodeSignal): void {
  process.removeAllListeners(signal);
  process.kill(process.pid, signal);
}
