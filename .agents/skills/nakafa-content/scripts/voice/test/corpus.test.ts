import { NodeServices } from "@effect/platform-node";
import { assert, it } from "@effect/vitest";
import { Effect } from "effect";

import { corpusCoverage, corpusParts } from "#nakafa-content/voice/test/corpus";
import { temporaryRoot } from "#nakafa-content/voice/test/root";

it.effect("names a document that sits above the depth its root splits at", () =>
  Effect.gen(function* () {
    const root = yield* temporaryRoot({
      "physics/motion/en.mdx": "Speed is distance over time.\n",
      "stray/en.mdx": "This document sits above the split depth.\n",
    });
    const coverage = yield* corpusCoverage(root, yield* corpusParts(root, 2));
    assert.deepEqual(coverage, {
      documents: 2,
      unheld: [`${root}/stray/en.mdx`],
    });
    assert.deepEqual(yield* corpusCoverage(root, [root]), {
      documents: 2,
      unheld: [],
    });
  }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
);
