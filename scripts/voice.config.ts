import config from "@nakafa/testing";
import { mergeConfig } from "vitest/config";

export default mergeConfig(config, {
  test: {
    coverage: {
      include: [".agents/skills/nakafa-content/scripts/**/*.{ts,tsx,mts,cts}"],
      reportsDirectory: "coverage/voice",
    },
    include: [".agents/skills/nakafa-content/scripts/**/*.test.ts"],
  },
});
