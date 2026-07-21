#!/usr/bin/env node

import { NodeFileSystem } from "@effect/platform-node";
import { Effect } from "effect";
import { runCli } from "./program.js";

const program = runCli(process.argv.slice(2), process.versions.node).pipe(
  Effect.provide(NodeFileSystem.layer),
  Effect.match({
    onFailure: (error) => ({ exitCode: 1, output: `${String(error)}\n` }),
    onSuccess: (output) => ({ exitCode: 0, output: `${output}\n` }),
  }),
  Effect.flatMap(({ exitCode, output }) =>
    Effect.sync(() => {
      process.exitCode = exitCode;
      const stream = exitCode === 0 ? process.stdout : process.stderr;
      stream.write(output);
    })
  )
);

await Effect.runPromise(program);
