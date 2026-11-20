import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { encodeJsonText, JsonTextSchema } from "#contracts/text/json";
import type { ManifestError, PackageManifest } from "#scripts/manifest";
import {
  assertContractPackageMetadata,
  assertPortableDependencies,
  createReleaseManifest,
  parseInstalledManifest,
  parsePackageManifest,
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

/** The fixture manifest as JSON text with some fields replaced. */
const manifestWith = (fields: Readonly<Record<string, unknown>>) =>
  encodeJsonText({ ...packageManifest, ...fields });

/** The message one manifest reader fails with, or a note that it succeeded. */
const failureMessage = (
  effect: Effect.Effect<unknown, ManifestError | Schema.SchemaError>
) =>
  Effect.match(effect, {
    onFailure: (error) => error.message,
    onSuccess: () => "the reader succeeded",
  });

describe("manifest tooling", () => {
  it.effect("decodes complete package manifests", () =>
    Effect.gen(function* () {
      expect(
        yield* parsePackageManifest(encodeJsonText(packageManifest))
      ).toEqual(packageManifest);
    })
  );

  it.effect(
    "removes repository-only source conditions from release manifests",
    () =>
      Effect.gen(function* () {
        const released = yield* Schema.decodeEffect(JsonTextSchema)(
          yield* createReleaseManifest(
            encodeJsonText({
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
        expect(encodeJsonText(released)).not.toContain("aksara-source");
        expect(encodeJsonText(released)).not.toContain("./src/");
      })
  );

  it.effect("decodes absent optional dependency maps", () =>
    Effect.gen(function* () {
      const minimal = {
        ...packageManifest,
        dependencies: undefined,
        devDependencies: undefined,
        optionalDependencies: undefined,
        peerDependencies: undefined,
      };

      expect(
        yield* parsePackageManifest(encodeJsonText(minimal))
      ).toMatchObject({
        dependencies: undefined,
        devDependencies: undefined,
        optionalDependencies: undefined,
        peerDependencies: undefined,
      });
    })
  );

  it.effect(
    "validates identity metadata and portable dependency versions",
    () =>
      Effect.gen(function* () {
        yield* assertContractPackageMetadata(packageManifest);
        yield* assertPortableDependencies(packageManifest);
        const repository = { ...packageManifest.repository, directory: "." };
        const cases = [
          [
            assertPortableDependencies({
              ...packageManifest,
              dependencies: { internal: "workspace:*" },
            }),
            "Released dependencies must use portable versions",
          ],
          [
            assertPortableDependencies({
              ...packageManifest,
              devDependencies: { internal: "catalog:" },
            }),
            "Released devDependencies must use portable versions",
          ],
          [
            assertContractPackageMetadata({
              ...packageManifest,
              description: " ",
            }),
            "The contract package description must not be empty",
          ],
          [
            assertContractPackageMetadata({ ...packageManifest, homepage: "" }),
            "The contract package must link to the reviewed Aksara homepage",
          ],
          [
            assertContractPackageMetadata({ ...packageManifest, repository }),
            "The contract package must identify its exact source repository directory",
          ],
        ] as const;
        for (const [check, message] of cases) {
          expect(yield* failureMessage(check)).toBe(message);
        }
      })
  );

  it.effect("decodes exact installed export conditions", () =>
    Effect.gen(function* () {
      expect(
        yield* parseInstalledManifest(
          encodeJsonText({
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
    })
  );

  it.effect("rejects text that is not JSON in every manifest reader", () =>
    Effect.gen(function* () {
      expect((yield* Effect.flip(parsePackageManifest("{")))._tag).toBe(
        "SchemaError"
      );
      expect((yield* Effect.flip(parseInstalledManifest("{")))._tag).toBe(
        "SchemaError"
      );
      expect(
        (yield* Effect.flip(createReleaseManifest("{", "4.0.0-rc.112")))._tag
      ).toBe("SchemaError");
    })
  );

  it.effect("rejects malformed package fields", () =>
    Effect.gen(function* () {
      const cases = [
        [textField(1, "text required"), "text required"],
        [parsePackageManifest("[]"), "The package manifest must be an object"],
        [
          parsePackageManifest(manifestWith({ dependencies: [] })),
          "dependencies must be an object",
        ],
        [
          parsePackageManifest(manifestWith({ dependencies: { runtime: 1 } })),
          "runtime must use a text version",
        ],
        [
          parsePackageManifest(manifestWith({ engines: [] })),
          "Package engines must be an object",
        ],
        [
          parsePackageManifest(manifestWith({ exports: [] })),
          "Package exports must be an object",
        ],
        [
          parsePackageManifest(manifestWith({ imports: [] })),
          "Package imports must be an object",
        ],
        [
          parsePackageManifest(manifestWith({ repository: [] })),
          "Package repository must be an object",
        ],
        [
          createReleaseManifest("[]", "4.0.0-rc.112"),
          "The package manifest must be an object",
        ],
        [
          createReleaseManifest(
            manifestWith({ peerDependencies: [] }),
            "4.0.0-rc.112"
          ),
          "peerDependencies must exist",
        ],
        [
          createReleaseManifest(
            manifestWith({ exports: { ".": "invalid" } }),
            "4.0.0-rc.112"
          ),
          "Export . must be an object",
        ],
        [
          parseInstalledManifest("[]"),
          "The installed manifest must be an object",
        ],
        [
          parseInstalledManifest('{"name":"package","exports":[]}'),
          "The package must declare exports",
        ],
        [
          parseInstalledManifest(
            '{"name":"package","exports":{".":"./dist/index.js"}}'
          ),
          "Export . must be an object",
        ],
        [
          parseInstalledManifest(
            '{"name":"package","exports":{".":{"import":1}}}'
          ),
          "Export . condition import must be text",
        ],
      ] as const;
      for (const [reader, message] of cases) {
        expect(yield* failureMessage(reader)).toBe(message);
      }
    })
  );
});

describe("pinned release manifest text", () => {
  it.effect("pins the exact released manifest text for one fixed source", () =>
    Effect.gen(function* () {
      expect(
        yield* createReleaseManifest(
          '{"name":"@nakafa/aksara-contracts","version":"0.46.0","description":"Skema Ñandú untuk Nakafa 😀","homepage":"https://github.com/nakafaai/aksara#readme","license":"SEE LICENSE IN LICENSE","repository":{"type":"git","url":"git+https://github.com/nakafaai/aksara.git","directory":"packages/contracts"},"type":"module","engines":{"node":">=24.0.0 <25.0.0"},"peerDependencies":{"effect":"catalog:"},"exports":{"./ids":{"aksara-source":"./src/ids.ts","types":"./dist/ids.d.ts","import":"./dist/ids.js"},"./content":{"aksara-source":"./src/content.ts","types":"./dist/content.d.ts","import":"./dist/content.js"}},"imports":{"#contracts/*":{"aksara-source":"./src/*.ts","types":["./src/*.ts","./dist/*.d.ts"],"default":"./dist/*.js"}},"scripts":{"build":"tsc"},"devDependencies":{"vitest":"catalog:"}}',
          "4.0.0-rc.112"
        )
      ).toBe(
        '{\n  "name": "@nakafa/aksara-contracts",\n  "version": "0.46.0",\n  "description": "Skema Ñandú untuk Nakafa 😀",\n  "homepage": "https://github.com/nakafaai/aksara#readme",\n  "license": "SEE LICENSE IN LICENSE",\n  "repository": {\n    "type": "git",\n    "url": "git+https://github.com/nakafaai/aksara.git",\n    "directory": "packages/contracts"\n  },\n  "type": "module",\n  "engines": {\n    "node": ">=24.0.0 <25.0.0"\n  },\n  "peerDependencies": {\n    "effect": "4.0.0-rc.112"\n  },\n  "exports": {\n    "./ids": {\n      "types": "./dist/ids.d.ts",\n      "import": "./dist/ids.js"\n    },\n    "./content": {\n      "types": "./dist/content.d.ts",\n      "import": "./dist/content.js"\n    }\n  },\n  "imports": {\n    "#contracts/*": {\n      "default": "./dist/*.js",\n      "types": "./dist/*.d.ts"\n    }\n  }\n}\n'
      );
    })
  );
});
