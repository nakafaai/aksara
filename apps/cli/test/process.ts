import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";

/** Fails if a mocked CLI flow unexpectedly reaches the operating system. */
export const unusedExactProcess = ExactProcess.of({
  run: () => Effect.dieMessage("Unexpected exact process execution in test."),
});
