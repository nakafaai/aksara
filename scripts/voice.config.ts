import config from "@nakafa/testing";
import { mergeConfig } from "vitest/config";

export default mergeConfig(config, {
  test: {
    coverage: {
      enabled: false,
    },
    include: [".agents/skills/nakafa-content/scripts/**/*.test.ts"],
  },
});
