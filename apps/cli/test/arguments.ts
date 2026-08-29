import { Effect } from "effect";

import type { ProgramCalls } from "#test/program";

/** Decodes one deterministic command fixture for CLI orchestration tests. */
export function programArguments(calls: ProgramCalls, args: readonly string[]) {
  calls.args = args;
  if (args[0] === "abort") {
    return Effect.succeed({ command: "abort", releaseId: "release-abort" });
  }
  if (args[0] === "accept") {
    return Effect.succeed({
      command: "accept",
      recoveryId: "recovery-active",
      releaseId: "release-active",
    });
  }
  if (args[0] === "cleanup") {
    return Effect.succeed({ command: "cleanup", releaseId: "release-cleanup" });
  }
  if (args[0] === "check") {
    return Effect.succeed({ command: "check" });
  }
  if (args[0] === "release") {
    return Effect.succeed({
      command: "release",
      recoveryId: "recovery-next",
      releaseId: "release-next",
    });
  }
  if (args[0] === "genesis") {
    return Effect.succeed({
      bundlePath: "/tmp/genesis-runtime.json",
      command: "genesis",
    });
  }
  if (args[0] === "recover") {
    return Effect.succeed({
      command: "recover",
      recoveryId: "recovery-active",
      releaseId: "release-active",
    });
  }
  if (args[0] === "status") {
    return Effect.succeed({ command: "status" });
  }
  const appLocaleIndex = args.indexOf("--app-locale");
  const appLocale =
    appLocaleIndex === -1 ? undefined : args[appLocaleIndex + 1];
  return Effect.succeed({
    ...(appLocale === undefined ? {} : { appLocale }),
    command: "preview",
    document: calls.document,
  });
}
