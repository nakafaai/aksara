import { describe, expect, it } from "@effect/vitest";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { validateRecoveryRevision } from "#cli/recovery";

describe("production recovery", () => {
  it.effect("accepts only the exact stored Git revision", () =>
    Effect.gen(function* () {
      const expected = GitCommitShaSchema.make("a".repeat(40));
      yield* validateRecoveryRevision(expected, expected);
      const error = yield* validateRecoveryRevision(
        expected,
        GitCommitShaSchema.make("b".repeat(40))
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "RecoveryRevisionMismatchError",
      });
    })
  );
});
