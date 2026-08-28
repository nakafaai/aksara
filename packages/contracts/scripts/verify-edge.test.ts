import { NodeServices } from "@effect/platform-node";
import { describe, expect, it, layer } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";
import {
  EDGE_CONTRACT_EXPORTS,
  EdgeVerificationError,
  runEdgeVerification,
  runtimeImports,
  verifyEdgeContracts,
  verifyEdgeEntry,
} from "#scripts/verify-edge";

/** Writes one emitted module into a verifier-owned temporary dist tree. */
const writeModule = Effect.fn("ContractEdgeTest.writeModule")(function* (
  root: string,
  modulePath: string,
  source: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const file = path.join(root, `${modulePath}.js`);
  yield* fileSystem.makeDirectory(path.dirname(file), { recursive: true });
  yield* fileSystem.writeFileString(file, source);
});

/** Writes the exact import conditions required by the Edge verifier. */
const writePackageManifest = Effect.fn("ContractEdgeTest.writePackageManifest")(
  function* (root: string, canonicalCondition: "import" | "node" = "import") {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const exports = Object.fromEntries(
      EDGE_CONTRACT_EXPORTS.map((entry) => [
        `./${entry}`,
        {
          [entry === "release/canonical" ? canonicalCondition : "import"]:
            `./dist/${entry}.js`,
          types: `./dist/${entry}.d.ts`,
        },
      ])
    );
    yield* fileSystem.writeFileString(
      path.join(root, "package.json"),
      JSON.stringify({ exports, name: "@nakafa/aksara-contracts" })
    );
  }
);

describe("Edge import syntax", () => {
  it("collects static, re-exported, and literal dynamic imports", () => {
    expect(
      runtimeImports(
        "inline.js",
        'import "a"; export * from "b"; import("c"); import(variable);'
      )
    ).toEqual(["a", "b", "c"]);
  });
});

layer(NodeServices.layer)("Edge contract verification", (effectIt) => {
  effectIt.effect("runs only for the selected CLI entrypoint", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const packageRoot = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-edge-cli-",
      });
      const scriptDirectory = path.join(packageRoot, "scripts");
      const moduleFile = path.join(scriptDirectory, "verify-edge.ts");
      yield* writePackageManifest(packageRoot);
      for (const entry of EDGE_CONTRACT_EXPORTS) {
        yield* writeModule(path.join(packageRoot, "dist"), entry, "export {};");
      }

      expect(
        yield* runEdgeVerification({
          entry: undefined,
          moduleFile,
          scriptDirectory,
        })
      ).toBe(false);
      expect(
        yield* runEdgeVerification({
          entry: path.join(packageRoot, "other.ts"),
          moduleFile,
          scriptDirectory,
        })
      ).toBe(false);
      expect(
        yield* runEdgeVerification({
          entry: moduleFile,
          moduleFile,
          scriptDirectory,
        })
      ).toBe(true);
    })
  );

  effectIt.effect(
    "traces private, relative, re-exported, and dynamic imports",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-edge-pass-",
        });
        yield* writeModule(
          root,
          "entry",
          [
            'import "#contracts/private";',
            'export * from "./relative.js";',
            'export * from "./extensionless";',
            'const loaded = import("#contracts/dynamic");',
          ].join("\n")
        );
        yield* writeModule(
          root,
          "private",
          'import "./entry.js"; import "effect";'
        );
        yield* writeModule(root, "relative", 'export const value = "safe";');
        yield* writeModule(
          root,
          "extensionless",
          'export const value = "safe";'
        );
        yield* writeModule(root, "dynamic", 'export const value = "safe";');

        const visited = yield* verifyEdgeEntry(root, "entry");

        expect(visited.size).toBe(5);
      })
  );

  effectIt.effect("returns typed module failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-edge-module-failure-",
      });
      const nodeRoot = path.join(root, "node");
      yield* writeModule(nodeRoot, "entry", 'import "#contracts/crypto";');
      yield* writeModule(nodeRoot, "crypto", 'import "node:crypto";');

      const nodeError = yield* verifyEdgeEntry(nodeRoot, "entry").pipe(
        Effect.flip
      );
      expect(nodeError).toBeInstanceOf(EdgeVerificationError);
      expect(nodeError).toMatchObject({ reason: "module" });
      expect(nodeError.detail).toContain(
        "reaches Node-only import node:crypto"
      );

      const missingRoot = path.join(root, "missing");
      yield* writeModule(missingRoot, "entry", 'import "#contracts/missing";');
      const missingError = yield* verifyEdgeEntry(missingRoot, "entry").pipe(
        Effect.flip
      );
      expect(missingError).toBeInstanceOf(EdgeVerificationError);
      expect(missingError).toMatchObject({ reason: "module" });
      expect(missingError.detail).toContain(
        "Edge contract module could not be read"
      );
    })
  );

  effectIt.effect("returns typed filesystem and manifest failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-edge-contract-failure-",
      });

      const filesystemRoot = path.join(root, "filesystem");
      yield* fileSystem.makeDirectory(filesystemRoot);
      const filesystemError = yield* verifyEdgeContracts(filesystemRoot).pipe(
        Effect.flip
      );
      expect(filesystemError).toMatchObject({
        _tag: "EdgeVerificationError",
        reason: "filesystem",
      });

      const invalidRoot = path.join(root, "invalid");
      yield* fileSystem.makeDirectory(invalidRoot);
      yield* fileSystem.writeFileString(
        path.join(invalidRoot, "package.json"),
        "{"
      );
      const invalidError = yield* verifyEdgeContracts(invalidRoot).pipe(
        Effect.flip
      );
      expect(invalidError).toMatchObject({
        _tag: "EdgeVerificationError",
        reason: "manifest",
      });
      expect(invalidError.cause).toBeInstanceOf(SyntaxError);

      const missingRoot = path.join(root, "missing-export");
      yield* fileSystem.makeDirectory(missingRoot);
      yield* fileSystem.writeFileString(
        path.join(missingRoot, "package.json"),
        JSON.stringify({ exports: {}, name: "@nakafa/aksara-contracts" })
      );
      const missingError = yield* verifyEdgeContracts(missingRoot).pipe(
        Effect.flip
      );
      expect(missingError).toMatchObject({ reason: "manifest" });
      expect(missingError.detail).toContain("Edge contract export is missing");

      const conditionRoot = path.join(root, "condition");
      yield* fileSystem.makeDirectory(conditionRoot);
      yield* writePackageManifest(conditionRoot, "node");
      for (const entry of EDGE_CONTRACT_EXPORTS) {
        yield* writeModule(
          path.join(conditionRoot, "dist"),
          entry,
          "export {};"
        );
      }
      const conditionError = yield* verifyEdgeContracts(conditionRoot).pipe(
        Effect.flip
      );
      expect(conditionError).toMatchObject({ reason: "manifest" });
      expect(conditionError.detail).toContain(
        "Edge contract export must declare an import condition: release/canonical"
      );
    })
  );
});
