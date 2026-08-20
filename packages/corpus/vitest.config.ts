import config from "@nakafa/testing";
import { mergeConfig } from "vitest/config";

export default mergeConfig(config, {
  test: {
    coverage: {
      include: [
        "articles/**/*.ts",
        "curriculum/**/*.ts",
        "locale/**/*.ts",
        "material/**/*.ts",
        "pages/**/*.ts",
        "preview/**/*.ts",
        "program/**/*.ts",
        "quran/**/*.ts",
        "question-bank/*.ts",
        "route/**/*.ts",
        "team/**/*.ts",
        "tryout/**/*.ts",
      ],
    },
  },
});
