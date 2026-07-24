import { describe, expect, it } from "vitest";
import {
  assertContractPackageMetadata,
  assertPortableDependencies,
  createPublishedManifest,
  type PackageManifest,
  parseInstalledManifest,
  parsePackageManifest,
  parseWorkspaceManifest,
  textField,
} from "#scripts/manifest";

const packageManifest = {
  dependencies: { runtime: "1.0.0" },
  description: "Public contract package.",
  devDependencies: { tooling: "2.0.0" },
  engines: { node: ">=24 <25" },
  exports: { ".": { import: "./dist/index.js" } },
  homepage: "https://github.com/nakafaai/aksara#readme",
  imports: { "#contracts/*": "./dist/*.js" },
  license: "SEE LICENSE IN LICENSE",
  name: "@nakafa/aksara-contracts",
  optionalDependencies: { optional: "3.0.0" },
  peerDependencies: { effect: "3.22.0" },
  repository: {
    directory: "packages/contracts",
    type: "git",
    url: "git+https://github.com/nakafaai/aksara.git",
  },
} satisfies PackageManifest;

describe("manifest tooling", () => {
  it("decodes complete package and workspace manifests", () => {
    expect(parsePackageManifest(JSON.stringify(packageManifest))).toEqual(
      packageManifest
    );
    expect(parseWorkspaceManifest('{"packageManager":"pnpm@11.15.1"}')).toEqual(
      { packageManager: "pnpm@11.15.1" }
    );
  });

  it("removes repository-only source conditions from published manifests", () => {
    const published = JSON.parse(
      createPublishedManifest(
        JSON.stringify({
          ...packageManifest,
          exports: {
            "./content": {
              "aksara-source": "./src/content.ts",
              import: "./dist/content.js",
              types: "./dist/content.d.ts",
            },
          },
          imports: {
            "#contracts/*": {
              "aksara-source": "./src/*.ts",
              default: "./dist/*.js",
              types: ["./src/*.ts", "./dist/*.d.ts"],
            },
            "#scripts/*": "./scripts/*.ts",
          },
          scripts: { prepack: "pnpm build" },
        }),
        "3.22.0"
      )
    );

    expect(published).toMatchObject({
      exports: {
        "./content": {
          import: "./dist/content.js",
          types: "./dist/content.d.ts",
        },
      },
      imports: {
        "#contracts/*": {
          default: "./dist/*.js",
          types: "./dist/*.d.ts",
        },
      },
      peerDependencies: { effect: "3.22.0" },
    });
    expect(published).not.toHaveProperty("devDependencies");
    expect(published).not.toHaveProperty("scripts");
    expect(JSON.stringify(published)).not.toContain("aksara-source");
    expect(JSON.stringify(published)).not.toContain("./src/");
  });

  it("decodes absent optional dependency maps", () => {
    const minimal = {
      ...packageManifest,
      dependencies: undefined,
      devDependencies: undefined,
      optionalDependencies: undefined,
      peerDependencies: undefined,
    };

    expect(parsePackageManifest(JSON.stringify(minimal))).toMatchObject({
      dependencies: undefined,
      devDependencies: undefined,
      optionalDependencies: undefined,
      peerDependencies: undefined,
    });
  });

  it("validates identity metadata and portable dependency versions", () => {
    expect(() => assertContractPackageMetadata(packageManifest)).not.toThrow();
    expect(() => assertPortableDependencies(packageManifest)).not.toThrow();
    expect(() =>
      assertPortableDependencies({
        ...packageManifest,
        dependencies: { internal: "workspace:*" },
      })
    ).toThrow("Packed dependencies must use registry-installable versions");
    expect(() =>
      assertPortableDependencies({
        ...packageManifest,
        devDependencies: { internal: "catalog:" },
      })
    ).toThrow("Packed devDependencies must use registry-installable versions");
  });

  it("decodes exact installed export conditions", () => {
    expect(
      parseInstalledManifest(
        JSON.stringify({
          exports: {
            ".": {
              import: "./dist/index.js",
              types: "./dist/index.d.ts",
            },
          },
          name: "@nakafa/aksara-contracts",
        })
      )
    ).toEqual({
      exports: {
        ".": {
          import: "./dist/index.js",
          types: "./dist/index.d.ts",
        },
      },
      name: "@nakafa/aksara-contracts",
    });
  });

  it("rejects malformed package fields", () => {
    expect(() => textField(1, "text required")).toThrow("text required");
    expect(() => parsePackageManifest("[]")).toThrow(
      "The package manifest must be an object"
    );
    expect(() =>
      parsePackageManifest(
        JSON.stringify({ ...packageManifest, dependencies: [] })
      )
    ).toThrow("dependencies must be an object");
    expect(() =>
      parsePackageManifest(
        JSON.stringify({
          ...packageManifest,
          dependencies: { runtime: 1 },
        })
      )
    ).toThrow("runtime must use a text version");
    expect(() =>
      parsePackageManifest(JSON.stringify({ ...packageManifest, engines: [] }))
    ).toThrow("Package engines must be an object");
    expect(() =>
      parsePackageManifest(JSON.stringify({ ...packageManifest, exports: [] }))
    ).toThrow("Package exports must be an object");
    expect(() =>
      parsePackageManifest(JSON.stringify({ ...packageManifest, imports: [] }))
    ).toThrow("Package imports must be an object");
    expect(() =>
      parsePackageManifest(
        JSON.stringify({ ...packageManifest, repository: [] })
      )
    ).toThrow("Package repository must be an object");
    expect(() => createPublishedManifest("[]", "3.22.0")).toThrow(
      "The package manifest must be an object"
    );
    expect(() =>
      createPublishedManifest(
        JSON.stringify({ ...packageManifest, peerDependencies: [] }),
        "3.22.0"
      )
    ).toThrow("peerDependencies must exist");
    expect(() =>
      createPublishedManifest(
        JSON.stringify({ ...packageManifest, exports: { ".": "invalid" } }),
        "3.22.0"
      )
    ).toThrow("Export . must be an object");
  });

  it("rejects malformed installed and workspace manifests", () => {
    expect(() => parseInstalledManifest("[]")).toThrow(
      "The installed manifest must be an object"
    );
    expect(() =>
      parseInstalledManifest('{"name":"package","exports":[]}')
    ).toThrow("The package must declare exports");
    expect(() =>
      parseInstalledManifest(
        '{"name":"package","exports":{".":"./dist/index.js"}}'
      )
    ).toThrow("Export . must be an object");
    expect(() =>
      parseInstalledManifest('{"name":"package","exports":{".":{"import":1}}}')
    ).toThrow("Export . condition import must be text");
    expect(() => parseWorkspaceManifest("[]")).toThrow(
      "The workspace manifest must be an object"
    );
    expect(() => parseWorkspaceManifest("{}")).toThrow(
      "Workspace packageManager must be text"
    );
  });
});
