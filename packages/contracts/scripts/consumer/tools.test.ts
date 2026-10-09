import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";
import {
  createConsumerManifest,
  createConsumerSource,
  createConsumerTsconfig,
  createInstallRunner,
  selectPackedArchive,
} from "#scripts/consumer/tools";
import { JsonTextSchema } from "#scripts/text/json";

describe("consumer tooling", () => {
  it("selects exactly one tarball", () => {
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
    const manifest = Schema.decodeSync(JsonTextSchema)(
      createConsumerManifest({
        effectVersion: "4.0.0-rc.112",
        packageManager: "pnpm@11.25.0",
        packageName: "@nakafa/aksara-contracts",
        tarballPath: "/tmp/contracts.tgz",
      })
    );

    expect(manifest).toMatchObject({
      dependencies: {
        "@nakafa/aksara-contracts": "file:/tmp/contracts.tgz",
        effect: "4.0.0-rc.112",
      },
      packageManager: "pnpm@11.25.0",
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
    expect(
      Schema.decodeSync(JsonTextSchema)(createConsumerTsconfig())
    ).toMatchObject({
      compilerOptions: {
        lib: ["ES2022", "DOM", "ESNext.Disposable"],
        module: "NodeNext",
        moduleResolution: "NodeNext",
        strict: true,
      },
      files: ["consumer.ts"],
    });
    expect(createInstallRunner()).toContain("await Effect.runPromise(");
    expect(createInstallRunner()).toContain("verifyInstalledPackage({");
    expect(createInstallRunner()).toContain(
      "try: () => import.meta.resolve(specifier)"
    );
  });
});
