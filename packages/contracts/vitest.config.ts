import config from "@nakafa/testing";
import { mergeConfig } from "vitest/config";

export default mergeConfig(config, {
  test: {
    coverage: {
      include: ["scripts/**/*.ts", "src/**/*.{ts,tsx,mts,cts}"],
    },
  },
});
