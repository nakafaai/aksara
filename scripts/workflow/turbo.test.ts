import { layer } from "@effect/vitest";
import { expectRefusal } from "#scripts/workflow/test/failure";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";
import { verifyTurboEnvironment } from "#scripts/workflow/turbo";

layer(workflowSourcesLayer)("turbo environment", (it) => {
  const sourceTest = sourceEffectTestsOf(it);

  sourceTest(
    "lets every variable the release and recovery steps pass reach their command",
    ({ release, turbo }) => verifyTurboEnvironment(release, turbo)
  );

  sourceTest(
    "refuses a task that drops the deploy output its step exports",
    ({ release, turbo }) =>
      expectRefusal(
        verifyTurboEnvironment(
          release,
          turbo.replaceAll('"NAKAFA_DEPLOY_OUTPUT"', '"NAKAFA_UNRELATED"')
        ),
        'The turbo task "release" must declare NAKAFA_DEPLOY_OUTPUT'
      )
  );

  sourceTest(
    "refuses a task that drops a variable its step sets",
    ({ release, turbo }) =>
      expectRefusal(
        verifyTurboEnvironment(
          release,
          turbo.replaceAll('"AKSARA_SIGNING_KEY_ID",', "")
        ),
        'The turbo task "release" must declare AKSARA_SIGNING_KEY_ID'
      )
  );

  sourceTest("refuses a turbo.json without its tasks", ({ release }) =>
    expectRefusal(
      verifyTurboEnvironment(release, "{}"),
      "turbo.json must declare its tasks"
    )
  );

  sourceTest("refuses a workflow without operation steps", ({ turbo }) =>
    expectRefusal(
      verifyTurboEnvironment("jobs: {}", turbo),
      "Publication must declare its operation steps"
    )
  );

  it.effect("checks only the steps that run a turbo task", () =>
    expectRefusal(
      verifyTurboEnvironment(
        [
          "jobs:",
          "  operate:",
          "    steps:",
          "      - uses: actions/checkout@v6",
          "      - run: bun run missing",
          "      - run: bun run other",
          "        env:",
          "          NAKAFA_OTHER: x",
          "      - run: |",
          "          export NAKAFA_ONLY=1",
          "          bun run release",
        ].join("\n"),
        JSON.stringify({
          tasks: { other: { passThroughEnv: ["NAKAFA_OTHER"] }, release: {} },
        })
      ),
      'The turbo task "release" must declare NAKAFA_ONLY'
    )
  );
});
