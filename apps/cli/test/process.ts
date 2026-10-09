import { NodeServices } from "@effect/platform-node";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import {
  Array as Arr,
  ConfigProvider,
  Effect,
  FileSystem,
  Option,
  Path,
  Record as Rec,
  Schedule,
  Schema,
} from "effect";
import type * as Scope from "effect/Scope";
import {
  NakafaProcess,
  type NakafaProcessInput,
  NakafaProcessLive,
  type RunningProcess,
} from "#cli/child/process";
import { startNakafa } from "#cli/child/session";
import { makePreviewCredentials } from "#cli/credentials";
import type { NakafaAppError } from "#cli/error";
import type { PreviewProvider } from "#cli/provider";

/** Fails if a mocked CLI flow unexpectedly reaches the operating system. */
export const unusedExactProcess = ExactProcess.of({
  run: () =>
    Effect.die(new Error("Unexpected exact process execution in test.")),
});

/** Reports each process request to a test double while returning a deterministic child result. */
export const makeProcess = (
  onStart: (input: NakafaProcessInput) => void,
  result: Effect.Effect<RunningProcess, NakafaAppError>
) =>
  NakafaProcess.of({
    start: (input) => {
      onStart(input);
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
    const onStart = vi.fn<(input: NakafaProcessInput) => void>();
    const processes = makeProcess(
      onStart,
      Effect.succeed({ exitCode: Effect.succeed(0) })
    );
    yield* Effect.scoped(
      startNakafa(input).pipe(Effect.provideService(NakafaProcess, processes))
    );
    return onStart.mock.lastCall?.[0];
  }).pipe(
    Effect.provide(
      ConfigProvider.layer(
        ConfigProvider.fromEnv({ env: inheritedVariables(path) })
      )
    )
  );
}

/** Starts the child with the inherited HOME and the given PATH; returns its start failure. */
export function failInheritedStart(path: string | undefined) {
  return Effect.gen(function* () {
    const input = yield* makeStartInput();
    const processes = makeProcess(
      vi.fn(),
      Effect.succeed({ exitCode: Effect.succeed(0) })
    );
    return yield* Effect.scoped(
      startNakafa(input).pipe(Effect.provideService(NakafaProcess, processes))
    ).pipe(Effect.flip);
  }).pipe(
    Effect.provide(
      ConfigProvider.layer(
        ConfigProvider.fromEnv({ env: inheritedVariables(path) })
      )
    )
  );
}

/** Creates one exact Node child request; extra arguments follow the eval source. */
export function nodeProcess(
  source: string,
  environment: Readonly<Record<string, string>> = {},
  args: readonly string[] = []
): NakafaProcessInput {
  return {
    args: ["--input-type=module", "--eval", source, ...args],
    command: process.execPath,
    environment,
    root: process.cwd(),
  };
}

/** Starts one child in its own scope, lets the observer read it, and closes the scope before returning. */
export function withProcess<A, E, R>(
  input: NakafaProcessInput,
  observe: (child: RunningProcess) => Effect.Effect<A, E, R>
) {
  return Effect.scoped(
    NakafaProcess.pipe(
      Effect.flatMap((processes) => processes.start(input)),
      Effect.flatMap(observe)
    )
  ).pipe(Effect.provide(NakafaProcessLive));
}

/** Runs one child to its end and returns its exit code after the scope has closed. */
export function processProgram(input: NakafaProcessInput) {
  return withProcess(input, (child) => child.exitCode);
}

/** Runs one test body with Node services and a scope that owns its temporary files. */
export function withNodeFiles<A, E>(
  effect: Effect.Effect<A, E, FileSystem.FileSystem | Path.Path | Scope.Scope>
) {
  return effect.pipe(Effect.scoped, Effect.provide(NodeServices.layer));
}

/** Returns one file path in a temporary directory removed when the enclosing scope closes. */
export const tempFile = Effect.fn("test.tempFile")(function* (name: string) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const directory = yield* fileSystem.makeTempDirectoryScoped({
    prefix: "aksara-child-",
  });
  return path.join(directory, name);
});

/** Waits until a child has written its file, then returns the complete text. */
const readWrittenFile = Effect.fn("test.readWrittenFile")(function* (
  file: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const readOnce = Effect.gen(function* () {
    if (!(yield* fileSystem.exists(file))) {
      return "";
    }
    return yield* fileSystem.readFileString(file);
  });
  return yield* readOnce.pipe(
    Effect.repeat({
      schedule: Schedule.spaced("10 millis"),
      while: (text) => text === "",
    }),
    Effect.timeout("5 seconds")
  );
});

const ProcessIdSchema = Schema.FiniteFromString.pipe(
  Schema.check(Schema.isInt(), Schema.isGreaterThan(0))
);

/** Reads the process identifier that a child published in its file. */
export const readProcessId = Effect.fn("test.readProcessId")(function* (
  file: string
) {
  const text = yield* readWrittenFile(file);
  return yield* Schema.decodeEffect(ProcessIdSchema)(text);
});

const ChildReportSchema = Schema.Struct({
  environment: Schema.Record(Schema.String, Schema.String),
});

/** Reads the environment that a child reported. */
export const readChildReport = Effect.fn("test.readChildReport")(function* (
  file: string
) {
  const text = yield* readWrittenFile(file);
  return yield* Schema.decodeEffect(Schema.fromJsonString(ChildReportSchema))(
    text
  );
});

/** Reports whether signal zero reaches the process or process group with this identifier. */
export const signalReaches = (id: number) =>
  Effect.try(() => process.kill(id, 0)).pipe(
    Effect.option,
    Effect.map(Option.isSome)
  );

/** Child source that publishes its process identifier and then waits to be signalled. */
export const WAITING_CHILD = Arr.join(
  [
    'import { writeFileSync } from "node:fs";',
    "writeFileSync(process.argv[1], String(process.pid));",
    "setInterval(() => undefined, 1_000);",
  ],
  "\n"
);

/** Child source that ignores SIGTERM, publishes its process identifier, then waits to be killed. */
export const TERMINATION_IGNORING_CHILD = Arr.join(
  [
    'import { writeFileSync } from "node:fs";',
    'process.on("SIGTERM", () => undefined);',
    "writeFileSync(process.argv[1], String(process.pid));",
    "setInterval(() => undefined, 1_000);",
  ],
  "\n"
);

/** Child source that reports its environment to the file named by its first argument, then exits. */
export const REPORTING_CHILD = Arr.join(
  [
    'import { writeFileSync } from "node:fs";',
    "writeFileSync(process.argv[1], JSON.stringify({ environment: process.env }));",
  ],
  "\n"
);

/** Child source that exits 0 only when the parent secret is absent and the allowed variable is visible. */
export const ISOLATION_CHILD = Arr.join(
  [
    "const isolated =",
    "  process.env.AKSARA_TEST_PARENT_SECRET === undefined;",
    'const allowed = process.env.AKSARA_TEST_ALLOWED === "visible";',
    "process.exit(isolated && allowed ? 0 : 23);",
  ],
  "\n"
);

/** The libuv handle that keeps the event loop alive while a child runs. */
const CHILD_HANDLE = "ProcessWrap";

/** Reports whether the running Node process currently keeps a child handle referenced. */
export const childHandleReferenced = () =>
  Arr.contains(process.getActiveResourcesInfo(), CHILD_HANDLE);

/** Waits, within a bound, until the running Node process no longer keeps a child handle. */
export const waitForChildHandleRelease = Effect.sync(
  () => !childHandleReferenced()
).pipe(
  Effect.repeat({
    schedule: Schedule.spaced("10 millis"),
    while: (released) => !released,
  }),
  Effect.timeout("5 seconds")
);

/** macOS adds this variable inside every process it starts, so it is not part of the supplied environment. */
const SYSTEM_VARIABLES = ["__CF_USER_TEXT_ENCODING"];

/** Removes the variables that the operating system adds to every child before its code runs. */
export const withoutSystemVariables = (
  environment: Readonly<Record<string, string>>
) =>
  Rec.filter(
    environment,
    (_value, key) => !Arr.contains(SYSTEM_VARIABLES, key)
  );

/** Starts a child that publishes its process identifier, then runs the observer with both values. */
export function withPublishingProcess<A, E>(
  source: string,
  observe: (child: RunningProcess, pid: number) => Effect.Effect<A, E>
) {
  return withNodeFiles(
    Effect.gen(function* () {
      const pidFile = yield* tempFile("pid");
      return yield* withProcess(nodeProcess(source, {}, [pidFile]), (child) =>
        readProcessId(pidFile).pipe(
          Effect.flatMap((pid) => observe(child, pid))
        )
      );
    })
  );
}
