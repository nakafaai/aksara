import { assert, it } from "@effect/vitest";
import { Effect } from "effect";

import { parseArguments } from "#nakafa-content/voice/options";

it.effect("parses documented defaults without arguments", () =>
  Effect.gen(function* () {
    assert.deepEqual(yield* parseArguments([]), {
      format: "text",
      pedagogyReview: false,
      root: "packages/corpus/material/lesson",
      strictReview: false,
    });
  })
);

it.effect("parses every documented option", () =>
  Effect.gen(function* () {
    assert.deepEqual(
      yield* parseArguments([
        "--format",
        "json",
        "--root",
        "packages/corpus/articles",
        "--strict-review",
        "--pedagogy-review",
      ]),
      {
        format: "json",
        pedagogyReview: true,
        root: "packages/corpus/articles",
        strictReview: true,
      }
    );
  })
);

it.effect("rejects incomplete and unsupported CLI arguments", () =>
  Effect.gen(function* () {
    for (const arguments_ of [
      ["--format"],
      ["--root"],
      ["--format", "xml"],
      ["--unknown"],
    ]) {
      const failure = yield* Effect.flip(parseArguments([...arguments_]));
      assert.equal(failure.reason, "invalid-arguments");
    }
  })
);
