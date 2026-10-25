import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Effect, Path } from "effect";

import { createConfig } from "#scripts/dependencies/fixture";
import { readManifest } from "#scripts/dependencies/manifest";

layer(NodeServices.layer)("dependency manifest reader", (it) => {
  it.effect(
    "reads the fields the dependency policy owns from a valid manifest",
    () =>
      Effect.gen(function* () {
        const config = yield* createConfig();
        const { fields } = yield* readManifest(config.manifest);

        assert.deepStrictEqual(fields.workspaces.packages, [
          "apps/*",
          "packages/*",
        ]);
      })
  );

  it.effect("types an unreadable, invalid JSON, and incomplete manifest", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const config = yield* createConfig();
      const missing = yield* readManifest(
        path.join(config.root, "missing.json")
      ).pipe(Effect.flip);
      assert.strictEqual(missing._tag, "DependencyPolicyError");

      const invalid = yield* createConfig({ text: "{" });
      const invalidFailure = yield* readManifest(invalid.manifest).pipe(
        Effect.flip
      );
      assert.ok(invalidFailure.message.includes("is not valid"));

      const incomplete = yield* createConfig({ text: "{}" });
      const incompleteFailure = yield* readManifest(incomplete.manifest).pipe(
        Effect.flip
      );
      assert.ok(incompleteFailure.message.includes("has an invalid shape"));
    })
  );
});
