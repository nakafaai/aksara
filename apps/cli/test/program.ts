import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";

import { makeCliProgram } from "#cli/program";
import { unusedExactProcess } from "#test/process";

/** Shared release-command observation recorded by CLI dispatch tests. */
export interface ReleaseCommand {
  readonly command: string;
  readonly releaseId: string;
}

/** Recovery command observation with its exact protected recovery identity. */
export type RecoveryCommand = ReleaseCommand & { readonly recoveryId: string };

/** Mutable observations isolated and reset around every CLI program test. */
export interface ProgramCalls {
  abort: ReleaseCommand | undefined;
  accept: RecoveryCommand | undefined;
  args: readonly string[];
  check: string | undefined;
  cleanup: ReleaseCommand | undefined;
  document: string;
  migration: ReleaseCommand | undefined;
  open:
    | {
        readonly cwd: string;
        readonly environment: { readonly nakafaAppDir: string };
        readonly requestedDocument: string;
      }
    | undefined;
  production:
    | {
        readonly args: {
          readonly command: string;
          readonly recoveryId: string;
          readonly releaseId: string;
        };
        readonly cwd: string;
      }
    | undefined;
  recover: RecoveryCommand | undefined;
  status: boolean;
}

/** Runs one CLI program with the real Node boundary services. */
export function runProgram(args: readonly string[]) {
  return Effect.runPromise(
    makeCliProgram({ args, cwd: "/code/aksara" }).pipe(
      Effect.provide(NodeHttpClient.layerNodeHttp),
      Effect.provideService(ExactProcess, unusedExactProcess),
      Effect.provide(NodeServices.layer)
    )
  );
}
