import { describe, expect, it } from "vitest";

import { teams } from "#corpus/team/source";

describe("team source", () => {
  it("preserves the exact three source-controlled contributors", () => {
    expect([...teams]).toEqual([
      "Shifna Zihdatal Haq",
      "Nabil Akbarazzima Fatih",
      "Nur Sita Utami",
    ]);
  });
});
