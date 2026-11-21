import { Array as Arr, Effect, pipe } from "effect";
import type { WorkflowJob } from "#scripts/workflow/decode";
import { executableSource, jobSource } from "#scripts/workflow/decode";
import { ensure } from "#scripts/workflow/requirement";
import { PNPM_SETUP_ACTION } from "#scripts/workflow/toolchain";

/** The pnpm release that publishes and reads npm metadata: the registry's `latest` pnpm when owner decision D22 pinned it. */
export const PINNED_PNPM = "12.21.0";
const PUBLISH_COMMAND = 'pnpm publish "$TARBALL"';
const VERSION_ASSERTION = [
  "pnpm_version=$(pnpm --version)",
  '"$pnpm_version" != "$PINNED_PNPM"',
];
const FOREIGN_PUBLISHER = /\bnpx\b|\b(?:bun|npm)\s+publish\b/u;

/** Requires one release job to set up the pinned pnpm once, through the reviewed action and without an install, and to assert that version before it runs pnpm. */
const requirePinnedPnpm = Effect.fn("AksaraScripts.requirePinnedPnpm")(
  function* (owner: string, job: WorkflowJob) {
    const setups = Arr.filter(
      job.steps,
      ({ uses }) => uses === PNPM_SETUP_ACTION
    );
    const [setup] = setups;
    yield* ensure(
      setups.length === 1 &&
        setup?.with?.version === PINNED_PNPM &&
        setup?.with?.install === false,
      `npm ${owner} must set up only the pinned pnpm ${PINNED_PNPM}`
    );
    const source = jobSource(job);
    yield* ensure(
      Arr.some(job.steps, ({ env }) => env?.PINNED_PNPM === PINNED_PNPM) &&
        Arr.every(VERSION_ASSERTION, (fragment) => source.includes(fragment)),
      `npm ${owner} must assert the pinned pnpm ${PINNED_PNPM}`
    );
  }
);

/** Verifies that both release jobs read npm with the pinned pnpm, and that publication runs one pnpm publish and no other publisher. */
export const verifyPnpmPublication = Effect.fn(
  "AksaraScripts.verifyPnpmPublication"
)(function* (publish: WorkflowJob, verify: WorkflowJob) {
  yield* requirePinnedPnpm("publication", publish);
  yield* requirePinnedPnpm("verification", verify);
  const commands = pipe(
    publish.steps,
    Arr.flatMap(({ run }) => (run === undefined ? [] : [run])),
    Arr.map(executableSource),
    Arr.join("\n")
  );
  yield* ensure(
    commands.split(PUBLISH_COMMAND).length === 2,
    "npm publication may execute only one publish command"
  );
  yield* ensure(
    !FOREIGN_PUBLISHER.test(commands),
    "npm publication must publish only through the pinned pnpm CLI"
  );
});
