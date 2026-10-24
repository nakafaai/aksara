import { describe, expect, it } from "@effect/vitest";

import {
  declaredVersion,
  expectedIgnoredDependencies,
} from "#scripts/dependencies/policy";

describe("dependency hold policy", () => {
  it("extracts exact direct, aliased, and package-manager versions", () => {
    expect(declaredVersion("4.0.0-rc.112")).toBe("4.0.0-rc.112");
    expect(declaredVersion("npm:typescript@7.0.2")).toBe("7.0.2");
    expect(declaredVersion("bun@1.4.4")).toBe("1.4.4");
    expect(declaredVersion("workspace:*")).toBeUndefined();
  });

  it("excludes only package-manager metadata from routine updates", () => {
    expect(expectedIgnoredDependencies()).toContain("effect");
    expect(expectedIgnoredDependencies()).toContain(
      "@effect/platform-node-shared"
    );
    expect(expectedIgnoredDependencies()).not.toContain("bun");
  });
});
