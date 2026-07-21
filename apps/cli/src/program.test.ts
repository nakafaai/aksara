// @vitest-environment node

import { NodeFileSystem } from "@effect/platform-node";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { runCli } from "./program.js";

describe("runCli", () => {
  it("checks the real two-locale rich fixture on Node 24", async () => {
    const output = await Effect.runPromise(
      runCli(["check"], "24.18.0").pipe(Effect.provide(NodeFileSystem.layer))
    );

    expect(output).toBe(
      "aksara check ok: 2 documents; format=mdx-function-body-v1; locales=en,id"
    );
  });

  it("fails closed on an unsupported Node major", async () => {
    const error = await Effect.runPromise(
      runCli(["check"], "22.0.0").pipe(
        Effect.provide(NodeFileSystem.layer),
        Effect.flip
      )
    );
    expect(error._tag).toBe("UnsupportedNodeVersionError");
  });

  it("rejects unknown commands", async () => {
    const error = await Effect.runPromise(
      runCli(["publish"], "24.18.0").pipe(
        Effect.provide(NodeFileSystem.layer),
        Effect.flip
      )
    );
    expect(error._tag).toBe("UnknownCliCommandError");
  });
});
