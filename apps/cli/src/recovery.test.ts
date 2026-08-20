import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { validateRecoveryRevision } from "#cli/recovery";

describe("production recovery", () => {
  it("accepts only the exact stored Git revision", async () => {
    const expected = GitCommitShaSchema.make("a".repeat(40));
    await expect(
      Effect.runPromise(validateRecoveryRevision(expected, expected))
    ).resolves.toBeUndefined();
    await expect(
      Effect.runPromise(
        validateRecoveryRevision(
          expected,
          GitCommitShaSchema.make("b".repeat(40))
        ).pipe(Effect.flip)
      )
    ).resolves.toMatchObject({ _tag: "RecoveryRevisionMismatchError" });
  });
});
