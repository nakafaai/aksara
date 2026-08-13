import { join } from "node:path";
import type { ExactProcessInput } from "#utilities/process/exact";

/** Approved absolute Git executable for Aksara-controlled environments. */
export const GIT_EXECUTABLE = "/usr/bin/git";

/** Minimal deterministic Git environment that rejects prompts and global config. */
export const GIT_ENVIRONMENT = Object.freeze({
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_OPTIONAL_LOCKS: "0",
  GIT_TERMINAL_PROMPT: "0",
  LC_ALL: "C",
});

/** Builds an exact-repository Git process without ambient repository discovery. */
export function makeExactGitInput(input: {
  readonly args: readonly string[];
  readonly root: string;
  readonly stderrLimit: number;
  readonly stdin?: Uint8Array;
  readonly stdoutLimit: number;
}): ExactProcessInput {
  const exactInput: ExactProcessInput = {
    args: [
      `--git-dir=${join(input.root, ".git")}`,
      `--work-tree=${input.root}`,
      "--no-replace-objects",
      ...input.args,
    ],
    environment: GIT_ENVIRONMENT,
    executable: GIT_EXECUTABLE,
    root: input.root,
    stderrLimit: input.stderrLimit,
    stdoutLimit: input.stdoutLimit,
  };
  if (input.stdin === undefined) {
    return exactInput;
  }
  return { ...exactInput, stdin: input.stdin };
}
