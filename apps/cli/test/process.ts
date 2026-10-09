import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import {
  NakafaProcess,
  type NakafaProcessInput,
  type RunningProcess,
} from "#cli/child/process";
import type { NakafaAppError } from "#cli/error";

/** Fails if a mocked CLI flow unexpectedly reaches the operating system. */
export const unusedExactProcess = ExactProcess.of({
  run: () =>
    Effect.die(new Error("Unexpected exact process execution in test.")),
});

/** Captures one process request while returning a deterministic child result. */
export const makeProcess = (
  capture: { input?: NakafaProcessInput },
  result: Effect.Effect<RunningProcess, NakafaAppError>
) =>
  NakafaProcess.of({
    start: (input) => {
      capture.input = input;
      return result;
    },
  });
