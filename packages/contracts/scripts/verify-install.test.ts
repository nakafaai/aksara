import { pathToFileURL } from "node:url";
import { NodeServices } from "@effect/platform-node";
import { assert, describe, it, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, Schema } from "effect";
import { vi } from "vitest";
import {
  type InstallVerificationInput,
  isInstalledPath,
  verifyInstalledPackage,
} from "#scripts/verify-install";

const packageName = "@nakafa/test-package";
const defaultExports = {
  ".": {
    browser: "./dist/index.js",
    import: "./dist/index.js",
    types: "./dist/index.d.ts",
  },
  "./feature": {
    node: "./dist/feature.js",
    types: "./dist/feature.d.ts",
  },
} satisfies Readonly<Record<string, unknown>>;

interface InstallFixture {
  readonly consumerRoot: string;
  readonly packageRoot: string;
}

class TestBoundaryError extends Schema.TaggedError<TestBoundaryError>()(
  "TestBoundaryError",
  { operation: Schema.String }
) {}

/** Creates one isolated installed package tree with exact export files. */
const createInstallFixture = Effect.fn("InstallVerificationTest.createFixture")(
  function* (
    exports: Readonly<Record<string, unknown>> = defaultExports,
    installedName = packageName
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const consumerRoot = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-install-test-",
    });
    const packageRoot = path.join(
      consumerRoot,
      "node_modules",
      "@nakafa",
      "test-package"
    );
    yield* fileSystem.makeDirectory(path.join(packageRoot, "dist"), {
      recursive: true,
    });
    yield* fileSystem.writeFileString(
      path.join(packageRoot, "package.json"),
      JSON.stringify({ exports, name: installedName })
    );
    yield* Effect.forEach(
      ["index.js", "index.d.ts", "feature.js", "feature.d.ts"],
      (file) =>
        fileSystem.writeFileString(
          path.join(packageRoot, "dist", file),
          "export {};\n"
        ),
      { discard: true }
    );
    return { consumerRoot, packageRoot } satisfies InstallFixture;
  }
);

/** Builds one successful verification input with independently replaceable seams. */
function verificationInput<E = never, R = never>(
  fixture: InstallFixture,
  overrides: Partial<
    Pick<
      InstallVerificationInput<E, R>,
      "importModule" | "resolveSpecifier" | "write"
    >
  > = {}
): InstallVerificationInput<E, R> {
  return {
    consumerRoot: fixture.consumerRoot,
    importModule: () => Effect.void,
    packageName,
    resolveSpecifier: (specifier) =>
      Effect.succeed(
        pathToFileURL(
          specifier === packageName
            ? `${fixture.packageRoot}/dist/index.js`
            : `${fixture.packageRoot}/dist/feature.js`
        ).href
      ),
    write: () => Effect.void,
    ...overrides,
  };
}

/** Returns one typed verification failure to its asserting test. */
const verificationFailure = Effect.fn("InstallVerificationTest.failure")(
  (input: InstallVerificationInput<never, never>) =>
    verifyInstalledPackage(input).pipe(Effect.flip)
);

describe("installed package verification paths", () => {
  it("recognizes only paths inside node_modules", () => {
    assert.strictEqual(isInstalledPath(""), false);
    assert.strictEqual(isInstalledPath("../outside"), false);
    assert.strictEqual(isInstalledPath("/absolute"), false);
    assert.strictEqual(isInstalledPath("@nakafa/test-package"), true);
  });
});

layer(NodeServices.layer)("installed package verification", (effectIt) => {
  effectIt.effect("imports every Node condition and public export", () =>
    Effect.gen(function* () {
      const fixture = yield* createInstallFixture();
      const imported: string[] = [];
      const write = vi.fn();

      yield* verifyInstalledPackage(
        verificationInput(fixture, {
          importModule: (specifier) =>
            Effect.sync(() => {
              imported.push(specifier);
            }),
          write: (message) =>
            Effect.sync(() => {
              write(message);
            }),
        })
      );

      assert.strictEqual(imported.length, 4);
      assert.ok(imported.includes(packageName));
      assert.ok(imported.includes(`${packageName}/feature`));
      assert.deepStrictEqual(write.mock.calls, [
        [
          "Verified 2 exact exports and 2 Node-importable conditions from the installed tarball.\n",
        ],
      ]);
    })
  );

  effectIt.effect(
    "rejects wildcard exports and missing required conditions",
    () =>
      Effect.gen(function* () {
        const wildcard = yield* createInstallFixture({
          "./*": {
            import: "./dist/index.js",
            types: "./dist/index.d.ts",
          },
        });
        const missingTypes = yield* createInstallFixture({
          ".": { import: "./dist/index.js" },
        });
        const missingNode = yield* createInstallFixture({
          ".": {
            browser: "./dist/index.js",
            types: "./dist/index.d.ts",
          },
        });
        const errors = yield* Effect.all([
          verificationFailure(verificationInput(wildcard)),
          verificationFailure(verificationInput(missingTypes)),
          verificationFailure(verificationInput(missingNode)),
        ]);

        assert.ok(
          errors[0].message.includes("Only exact package exports are supported")
        );
        assert.ok(errors[1].message.includes("must declare a types condition"));
        assert.ok(
          errors[2].message.includes("must declare a Node-importable condition")
        );
      })
  );

  effectIt.effect(
    "rejects targets outside dist or absent from the tarball",
    () =>
      Effect.gen(function* () {
        const outside = yield* createInstallFixture({
          ".": {
            import: "./dist/index.js",
            types: "./src/index.d.ts",
          },
        });
        const missing = yield* createInstallFixture({
          ".": {
            import: "./dist/missing.js",
            types: "./dist/index.d.ts",
          },
        });
        const [outsideError, missingError] = yield* Effect.all([
          verificationFailure(verificationInput(outside)),
          verificationFailure(verificationInput(missing)),
        ]);

        assert.ok(outsideError.message.includes("must target dist"));
        assert.ok(
          missingError.message.includes("is missing ./dist/missing.js")
        );
      })
  );

  effectIt.effect("rejects changed identity and wrong public resolution", () =>
    Effect.gen(function* () {
      const changed = yield* createInstallFixture(
        defaultExports,
        "@nakafa/changed"
      );
      const wrong = yield* createInstallFixture();
      const [changedError, wrongError] = yield* Effect.all([
        verificationFailure(verificationInput(changed)),
        verificationFailure(
          verificationInput(wrong, {
            resolveSpecifier: () =>
              Effect.succeed(
                pathToFileURL(`${wrong.packageRoot}/dist/feature.js`).href
              ),
          })
        ),
      ]);

      assert.ok(changedError.message.includes("packed package name changed"));
      assert.ok(wrongError.message.includes("selected the wrong condition"));
    })
  );

  effectIt.effect("types missing package and injected boundary failures", () =>
    Effect.gen(function* () {
      const fixture = yield* createInstallFixture();
      const missingRoot = yield* verificationFailure({
        ...verificationInput(fixture),
        consumerRoot: `${fixture.consumerRoot}/missing`,
      });
      const resolveFailure = yield* verifyInstalledPackage(
        verificationInput(fixture, {
          resolveSpecifier: () =>
            Effect.fail(new TestBoundaryError({ operation: "resolve" })),
        })
      ).pipe(Effect.flip);
      const importFailure = yield* verifyInstalledPackage(
        verificationInput(fixture, {
          importModule: () =>
            Effect.fail(new TestBoundaryError({ operation: "import" })),
        })
      ).pipe(Effect.flip);
      const writeFailure = yield* verifyInstalledPackage(
        verificationInput(fixture, {
          write: () =>
            Effect.fail(new TestBoundaryError({ operation: "write" })),
        })
      ).pipe(Effect.flip);

      assert.strictEqual(missingRoot._tag, "InstallVerificationError");
      assert.strictEqual(resolveFailure._tag, "TestBoundaryError");
      assert.strictEqual(importFailure._tag, "TestBoundaryError");
      assert.strictEqual(writeFailure._tag, "TestBoundaryError");
    })
  );
});
