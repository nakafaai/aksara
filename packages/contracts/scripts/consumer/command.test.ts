import { NodeServices } from "@effect/platform-node";
import { describe, expect, it, layer } from "@effect/vitest";
import { Effect } from "effect";
import {
  executablePath,
  readConsumerCommand,
  runConsumerCommand,
} from "#scripts/consumer/command";
import { ConsumerVerificationError } from "#scripts/consumer/tools";

describe("consumer command paths", () => {
  it("selects platform executables without a shell", () => {
    expect(executablePath("pnpm", "darwin")).toBe("pnpm");
    expect(executablePath("pnpm", "win32")).toBe("pnpm.cmd");
  });
});

layer(NodeServices.layer)("consumer commands", (effectIt) => {
  effectIt.effect(
    "fails with the exit code of a command that does not succeed",
    () =>
      Effect.gen(function* () {
        yield* runConsumerCommand(
          process.execPath,
          ["-e", ""],
          {},
          process.platform,
          "Probe"
        );
        const error = yield* runConsumerCommand(
          process.execPath,
          ["-e", "process.exit(3)"],
          {},
          process.platform,
          "Probe"
        ).pipe(Effect.flip);

        expect(error).toBeInstanceOf(ConsumerVerificationError);
        expect(error).toMatchObject({
          detail: "Probe exited unsuccessfully with code 3",
          reason: "process",
        });
      })
  );

  effectIt.effect(
    "returns standard output and names standard error on failure",
    () =>
      Effect.gen(function* () {
        const output = yield* readConsumerCommand({
          args: ["-e", "process.stdin.pipe(process.stdout)"],
          environment: {},
          executable: process.execPath,
          input: "echoed",
          platform: process.platform,
          stage: "Echo",
        });
        expect(output).toBe("echoed");

        const error = yield* readConsumerCommand({
          args: [
            "-e",
            "process.stderr.write('named failure'); process.exitCode = 2",
          ],
          environment: {},
          executable: process.execPath,
          input: "",
          platform: process.platform,
          stage: "Echo",
        }).pipe(Effect.flip);

        expect(error).toMatchObject({
          detail: "Echo exited unsuccessfully with code 2: named failure",
          reason: "process",
        });
      })
  );
});
