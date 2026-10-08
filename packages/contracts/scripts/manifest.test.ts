import { describe, expect, it } from "@effect/vitest";
import {
  assertContractPackageMetadata,
  assertPortableDependencies,
  createReleaseManifest,
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
  peerDependencies: { effect: "4.0.0-rc.112" },
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
    expect(parseWorkspaceManifest('{"packageManager":"pnpm@11.25.0"}')).toEqual(
      { packageManager: "pnpm@11.25.0" }
    );
  });

  it("removes repository-only source conditions from release manifests", () => {
    const released = JSON.parse(
      createReleaseManifest(
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
        "4.0.0-rc.112"
      )
    );

    expect(released).toMatchObject({
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
      peerDependencies: { effect: "4.0.0-rc.112" },
    });
    expect(released).not.toHaveProperty("devDependencies");
    expect(released).not.toHaveProperty("scripts");
    expect(JSON.stringify(released)).not.toContain("aksara-source");
    expect(JSON.stringify(released)).not.toContain("./src/");
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
    ).toThrow("Released dependencies must use portable versions");
    expect(() =>
      assertPortableDependencies({
        ...packageManifest,
        devDependencies: { internal: "catalog:" },
      })
    ).toThrow("Released devDependencies must use portable versions");
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
    expect(() => createReleaseManifest("[]", "4.0.0-rc.112")).toThrow(
      "The package manifest must be an object"
    );
    expect(() =>
      createReleaseManifest(
        JSON.stringify({ ...packageManifest, peerDependencies: [] }),
        "4.0.0-rc.112"
      )
    ).toThrow("peerDependencies must exist");
    expect(() =>
      createReleaseManifest(
        JSON.stringify({ ...packageManifest, exports: { ".": "invalid" } }),
        "4.0.0-rc.112"
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

describe("pinned release manifest text", () => {
  it("pins the exact released manifest text for one fixed source", () => {
    expect(
      createReleaseManifest(
        '{"name":"@nakafa/aksara-contracts","version":"0.46.0","description":"Skema Ñandú untuk Nakafa 😀","homepage":"https://github.com/nakafaai/aksara#readme","license":"SEE LICENSE IN LICENSE","repository":{"type":"git","url":"git+https://github.com/nakafaai/aksara.git","directory":"packages/contracts"},"type":"module","engines":{"node":">=24.0.0 <25.0.0"},"peerDependencies":{"effect":"catalog:"},"exports":{"./ids":{"aksara-source":"./src/ids.ts","types":"./dist/ids.d.ts","import":"./dist/ids.js"},"./content":{"aksara-source":"./src/content.ts","types":"./dist/content.d.ts","import":"./dist/content.js"}},"imports":{"#contracts/*":{"aksara-source":"./src/*.ts","types":["./src/*.ts","./dist/*.d.ts"],"default":"./dist/*.js"}},"scripts":{"build":"tsc"},"devDependencies":{"vitest":"catalog:"}}',
        "4.0.0-rc.112"
      )
    ).toBe(
      '{\n  "name": "@nakafa/aksara-contracts",\n  "version": "0.46.0",\n  "description": "Skema Ñandú untuk Nakafa 😀",\n  "homepage": "https://github.com/nakafaai/aksara#readme",\n  "license": "SEE LICENSE IN LICENSE",\n  "repository": {\n    "type": "git",\n    "url": "git+https://github.com/nakafaai/aksara.git",\n    "directory": "packages/contracts"\n  },\n  "type": "module",\n  "engines": {\n    "node": ">=24.0.0 <25.0.0"\n  },\n  "peerDependencies": {\n    "effect": "4.0.0-rc.112"\n  },\n  "exports": {\n    "./ids": {\n      "types": "./dist/ids.d.ts",\n      "import": "./dist/ids.js"\n    },\n    "./content": {\n      "types": "./dist/content.d.ts",\n      "import": "./dist/content.js"\n    }\n  },\n  "imports": {\n    "#contracts/*": {\n      "default": "./dist/*.js",\n      "types": "./dist/*.d.ts"\n    }\n  }\n}\n'
    );
  });
});
