import { describe, expect, it } from "vitest";

import {
  declaredVersion,
  expectedIgnoredDependencies,
} from "#scripts/dependency-policy";

describe("dependency hold policy", () => {
  it("extracts exact direct, aliased, and package-manager versions", () => {
    expect(declaredVersion("4.0.0-rc.110")).toBe("4.0.0-rc.110");
    expect(declaredVersion("npm:typescript@7.0.2")).toBe("7.0.2");
    expect(declaredVersion("pnpm@11.22.0")).toBe("11.22.0");
    expect(declaredVersion("workspace:*")).toBeUndefined();
  });

  it("excludes only package-manager metadata from pnpm update holds", () => {
    expect(expectedIgnoredDependencies()).toContain("effect");
    expect(expectedIgnoredDependencies()).not.toContain("pnpm");
  });
});
