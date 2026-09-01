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

/** Question audit observation bound to active and retained manifest hashes. */
export type AuditCommand = RecoveryCommand & {
  readonly manifestHash: string;
  readonly recoveryManifestHash: string;
};

/** Mutable observations isolated and reset around every CLI program test. */
export interface ProgramCalls {
  abort: ReleaseCommand | undefined;
  accept: RecoveryCommand | undefined;
  args: readonly string[];
  audit: AuditCommand | undefined;
  check: string | undefined;
  cleanup: ReleaseCommand | undefined;
  document: string;
  info:
    | { readonly command: "help" | "version"; readonly version: string }
    | undefined;
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

/** Builds one CLI program with the real Node boundary services. */
export const runProgram = Effect.fn("AksaraCliTest.runProgram")(
  (args: readonly string[]) =>
    makeCliProgram({ args, cwd: "/code/aksara", version: "9.8.7" }).pipe(
      Effect.provide(NodeHttpClient.layerNodeHttp),
      Effect.provideService(ExactProcess, unusedExactProcess),
      Effect.provide(NodeServices.layer)
    )
);
