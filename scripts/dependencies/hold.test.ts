import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Option, Ref } from "effect";

import { makeBumpDependenciesProgram } from "#scripts/dependencies/bump";
import type { BunRunner } from "#scripts/dependencies/command";
import {
  approvedManifest,
  createConfig,
  GATED_RELEASE,
  makeRunner,
  PAST_RELEASE,
  releaseTimes,
} from "#scripts/dependencies/fixture";

layer(NodeServices.layer, { excludeTestServices: true })(
  "reviewed hold policy",
  (it) => {
    it.effect(
      "fails before writing or updating when a reviewed hold drifts",
      () =>
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const config = yield* createConfig({
            manifest: approvedManifest({ catalog: { effect: "4.0.6" } }),
          });
          const before = yield* fileSystem.readFileString(config.manifest);
          const commands = yield* Ref.make<readonly (readonly string[])[]>([]);
          /** Records every Bun command that the policy runs before the fixture answers it. */
          const runner: BunRunner = (root, args) =>
            Effect.andThen(
              Ref.update(commands, (list) => Arr.append(list, args)),
              makeRunner()(root, args)
            );

          const error = yield* makeBumpDependenciesProgram(config, runner).pipe(
            Effect.flip
          );

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.ok(
            error.message.includes("effect declares 4.0.6; approved 4.0.5.")
          );
          const recorded = yield* Ref.get(commands);
          assert.strictEqual(
            Arr.some(recorded, ([command]) => command === "update"),
            false
          );
          assert.strictEqual(
            yield* fileSystem.readFileString(config.manifest),
            before
          );
        })
    );

    it.effect(
      "fails when a reviewed hold has a newer upstream than its review",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig();
          const error = yield* makeBumpDependenciesProgram(
            config,
            makeRunner({
              effect: releaseTimes({
                "4.0.6": PAST_RELEASE,
                "4.0.7": PAST_RELEASE,
              }),
            })
          ).pipe(Effect.flip);

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.ok(
            error.message.includes(
              "effect upstream is 4.0.7; last reviewed 4.0.6."
            )
          );
        })
    );

    it.effect(
      "keeps a reviewed hold while its newer upstream is inside the release-age gate",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig();
          const reports = yield* makeBumpDependenciesProgram(
            config,
            makeRunner({
              effect: releaseTimes({
                "4.0.6": PAST_RELEASE,
                "4.0.7": GATED_RELEASE,
              }),
            })
          );
          const effectReport = Option.getOrUndefined(
            Arr.findFirst(reports, ({ dependency }) => dependency === "effect")
          );

          assert.strictEqual(effectReport?.latest, "4.0.6");
        })
    );

    it.effect(
      "keeps a reviewed hold that was reviewed before its release passed the gate",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig();
          const reports = yield* makeBumpDependenciesProgram(
            config,
            makeRunner({
              effect: releaseTimes({
                "4.0.5": PAST_RELEASE,
                "4.0.6": GATED_RELEASE,
              }),
            })
          );
          const effectReport = Option.getOrUndefined(
            Arr.findFirst(reports, ({ dependency }) => dependency === "effect")
          );

          assert.strictEqual(effectReport?.latest, "4.0.5");
        })
    );

    it.effect(
      "fails when every stable release of a reviewed hold is inside the release-age gate",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig();
          const error = yield* makeBumpDependenciesProgram(
            config,
            makeRunner({
              effect: releaseTimes({ "4.0.6": GATED_RELEASE }),
            })
          ).pipe(Effect.flip);

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.strictEqual(
            error.message,
            "effect has no stable release older than the one-day release-age gate."
          );
        })
    );

    it.effect(
      "fails when the manifest no longer declares a reviewed hold",
      () =>
        Effect.gen(function* () {
          const config = yield* createConfig({
            manifest: approvedManifest({ omit: "ultracite" }),
          });
          const error = yield* makeBumpDependenciesProgram(
            config,
            makeRunner()
          ).pipe(Effect.flip);

          assert.strictEqual(error._tag, "DependencyPolicyError");
          assert.ok(
            error.message.includes(
              "ultracite declares missing; approved 8.0.2."
            )
          );
        })
    );
  }
);
