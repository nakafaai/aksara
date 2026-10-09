import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect, Schema } from "effect";

import { makeCliProgram } from "#cli/program";
import { unusedExactProcess } from "#test/process";

const ReleaseCommandSchema = Schema.Struct({
  command: Schema.String,
  releaseId: Schema.String,
});

/** Shared release-command observation recorded by CLI dispatch tests. */
export type ReleaseCommand = typeof ReleaseCommandSchema.Type;

const RecoveryCommandSchema = Schema.Struct({
  command: Schema.String,
  recoveryId: Schema.String,
  releaseId: Schema.String,
});

/** Recovery command observation with its exact protected recovery identity. */
export type RecoveryCommand = typeof RecoveryCommandSchema.Type;

const ProgramCallsSchema = Schema.Struct({
  abort: Schema.mutableKey(Schema.UndefinedOr(ReleaseCommandSchema)),
  accept: Schema.mutableKey(Schema.UndefinedOr(RecoveryCommandSchema)),
  args: Schema.mutableKey(Schema.Array(Schema.String)),
  check: Schema.mutableKey(Schema.UndefinedOr(Schema.String)),
  cleanup: Schema.mutableKey(Schema.UndefinedOr(ReleaseCommandSchema)),
  document: Schema.String,
  info: Schema.mutableKey(
    Schema.UndefinedOr(
      Schema.Struct({
        command: Schema.Literals(["help", "version"]),
        version: Schema.String,
      })
    )
  ),
  open: Schema.mutableKey(
    Schema.UndefinedOr(
      Schema.Struct({
        cwd: Schema.String,
        environment: Schema.Struct({ nakafaAppDir: Schema.String }),
        requestedDocument: Schema.String,
      })
    )
  ),
  parity: Schema.mutableKey(Schema.UndefinedOr(RecoveryCommandSchema)),
  production: Schema.mutableKey(
    Schema.UndefinedOr(
      Schema.Struct({
        args: Schema.Struct({
          command: Schema.String,
          recoveryId: Schema.String,
          releaseId: Schema.String,
        }),
        cwd: Schema.String,
      })
    )
  ),
  recover: Schema.mutableKey(Schema.UndefinedOr(RecoveryCommandSchema)),
  status: Schema.mutableKey(Schema.Boolean),
});

/** Mutable observations isolated and reset around every CLI program test. */
export type ProgramCalls = typeof ProgramCallsSchema.Type;

/** Builds one CLI program with the real Node boundary services. */
export const runProgram = Effect.fn("AksaraCliTest.runProgram")(
  (args: readonly string[]) =>
    makeCliProgram({ args, cwd: "/code/aksara", version: "9.8.7" }).pipe(
      Effect.provide(NodeHttpClient.layerNodeHttp),
      Effect.provideService(ExactProcess, unusedExactProcess),
      Effect.provide(NodeServices.layer)
    )
);
