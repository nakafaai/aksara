import { describe, expect, it } from "vitest";
import {
  createConsumerManifest,
  createConsumerSource,
  createConsumerTsconfig,
  createCredentialFreeEnvironment,
  createInstallRunner,
  executablePath,
  selectPackedArchive,
} from "#scripts/consumer";

describe("consumer tooling", () => {
  it("removes npm credentials and pins empty configuration", () => {
    expect(
      createCredentialFreeEnvironment(
        {
          HOME: "/home/test",
          NODE_AUTH_TOKEN: "secret",
          NPM_TOKEN: "secret",
          npm_config_registry: "private",
          PNPM_CONFIG_STORE_DIR: "private",
        },
        "/tmp/global",
        "/tmp/user"
      )
    ).toEqual({
      HOME: "/home/test",
      NPM_CONFIG_GLOBALCONFIG: "/tmp/global",
      NPM_CONFIG_USERCONFIG: "/tmp/user",
    });
  });

  it("selects platform executables and exactly one tarball", () => {
    expect(executablePath("pnpm", "darwin")).toBe("pnpm");
    expect(executablePath("pnpm", "win32")).toBe("pnpm.cmd");
    expect(selectPackedArchive(["readme.txt", "package.tgz"])).toBe(
      "package.tgz"
    );
    expect(() => selectPackedArchive([])).toThrow(
      "pnpm must produce exactly one tarball"
    );
    expect(() => selectPackedArchive(["one.tgz", "two.tgz"])).toThrow(
      "pnpm must produce exactly one tarball"
    );
  });

  it("serializes an isolated pnpm consumer manifest", () => {
    const manifest = JSON.parse(
      createConsumerManifest({
        effectVersion: "3.22.0",
        packageManager: "pnpm@11.15.1",
        packageName: "@nakafa/aksara-contracts",
        tarballPath: "/tmp/contracts.tgz",
      })
    );

    expect(manifest).toMatchObject({
      dependencies: {
        "@nakafa/aksara-contracts": "file:/tmp/contracts.tgz",
        effect: "3.22.0",
      },
      packageManager: "pnpm@11.15.1",
      private: true,
    });
  });

  it("serializes all public type imports and renderer proofs", () => {
    const source = createConsumerSource("@nakafa/aksara-contracts", [
      "@nakafa/aksara-contracts/content",
      "@nakafa/aksara-contracts/delivery",
    ]);

    expect(source).toContain(
      'import type * as Contract0 from "@nakafa/aksara-contracts/content";'
    );
    expect(source).toContain(
      'import type * as Contract1 from "@nakafa/aksara-contracts/delivery";'
    );
    expect(source).toContain(
      "export type InstalledContractSurface = [typeof Contract0, typeof Contract1];"
    );
  });

  it("serializes strict compiler and runtime verifier boundaries", () => {
    expect(JSON.parse(createConsumerTsconfig())).toMatchObject({
      compilerOptions: {
        module: "NodeNext",
        moduleResolution: "NodeNext",
        strict: true,
      },
      files: ["consumer.ts"],
    });
    expect(createInstallRunner()).toContain("await verifyInstalledPackage({");
    expect(createInstallRunner()).toContain(
      "resolveSpecifier: (specifier) => import.meta.resolve(specifier)"
    );
  });
});
