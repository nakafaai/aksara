import { pathToFileURL } from "node:url";
import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, Schema } from "effect";
import { encodeJsonText } from "#scripts/text/json";
import {
  type InstallInspection,
  type InstallVerificationInput,
  isInstalledPath,
  verifyInstalledPackage,
} from "#scripts/verify/install";

const packageName = "@nakafa/test-package";
const packageSubpath = `${packageName}/feature`;
const defaultExports = {
  ".": {
    browser: "./dist/index.js",
    import: "./dist/index.js",
    types: "./dist/index.d.ts",
  },
  "./feature": { node: "./dist/feature.js", types: "./dist/feature.d.ts" },
} satisfies Readonly<Record<string, unknown>>;

const InstallFixtureSchema = Schema.Struct({
  consumerRoot: Schema.String,
  packageRoot: Schema.String,
});

type InstallFixture = typeof InstallFixtureSchema.Type;

type Seams<E, R> = Partial<
  Pick<InstallVerificationInput<E, R>, "inspect" | "write">
>;

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
    const packageRoot = path.join(consumerRoot, "node_modules", packageName);
    const distRoot = path.join(packageRoot, "dist");
    yield* fileSystem.makeDirectory(distRoot, { recursive: true });
    yield* fileSystem.writeFileString(
      path.join(packageRoot, "package.json"),
      encodeJsonText({ exports, name: installedName })
    );
    yield* Effect.forEach(
      ["index.js", "index.d.ts", "feature.js", "feature.d.ts"],
      (file) =>
        fileSystem.writeFileString(path.join(distRoot, file), "export {};\n"),
      { discard: true }
    );
    return { consumerRoot, packageRoot } satisfies InstallFixture;
  }
);

/** Returns the file URL of one file in the dist directory of an installed package. */
function distUrl(packageRoot: string, file: string): URL {
  return pathToFileURL(`${packageRoot}/dist/${file}`);
}

/** Answers an inspection the way Node does: each public specifier resolves to its target. */
function defaultAnswers(
  fixture: InstallFixture
): Readonly<Record<string, URL>> {
  return {
    [packageName]: distUrl(fixture.packageRoot, "index.js"),
    [packageSubpath]: distUrl(fixture.packageRoot, "feature.js"),
  };
}

/** Builds one successful verification input with independently replaceable seams. */
function verificationInput<E = never, R = never>(
  fixture: InstallFixture,
  overrides: Seams<E, R> = {}
): InstallVerificationInput<E, R> {
  return {
    consumerRoot: fixture.consumerRoot,
    inspect: () => Effect.succeed(defaultAnswers(fixture)),
    packageName,
    write: () => Effect.void,
    ...overrides,
  };
}

/** Returns one typed verification failure to its asserting test. */
const verificationFailure = Effect.fn("InstallVerificationTest.failure")(
  (input: InstallVerificationInput<never, never>) =>
    verifyInstalledPackage(input).pipe(Effect.flip)
);

/** Fails verification of one fixture with the answers that one inspection gives. */
const failureWithAnswers = (
  fixture: InstallFixture,
  answers: Readonly<Record<string, URL>>
) =>
  verificationFailure(
    verificationInput(fixture, { inspect: () => Effect.succeed(answers) })
  );

/** Asserts that one typed failure names the expected text. */
const assertMessage = (error: { readonly message: string }, text: string) => {
  assert.ok(error.message.includes(text));
};

layer(NodeServices.layer)("installed package verification", (effectIt) => {
  effectIt.effect("recognizes only paths inside node_modules", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      assert.strictEqual(isInstalledPath(path, ""), false);
      assert.strictEqual(isInstalledPath(path, "../outside"), false);
      assert.strictEqual(isInstalledPath(path, "/absolute"), false);
      assert.strictEqual(isInstalledPath(path, "@nakafa/test-package"), true);
    })
  );

  effectIt.effect("imports every Node condition and public export", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const fixture = yield* createInstallFixture();
      const inspect = vi.fn((_inspection: InstallInspection) =>
        Effect.succeed(defaultAnswers(fixture))
      );
      const write = vi.fn();

      yield* verifyInstalledPackage(
        verificationInput(fixture, {
          inspect,
          write: (message) => Effect.sync(() => write(message)),
        })
      );

      const realRoot = yield* fileSystem.realPath(fixture.packageRoot);
      assert.deepStrictEqual(inspect.mock.calls, [
        [
          {
            imports: [
              distUrl(realRoot, "index.js").href,
              distUrl(realRoot, "feature.js").href,
              packageName,
              packageSubpath,
            ],
            resolutions: [packageName, packageSubpath],
          },
        ],
      ]);
      assert.deepStrictEqual(write.mock.calls, [
        [
          "Verified 2 exact exports and 2 Node-importable conditions from the installed tarball.\n",
        ],
      ]);
    })
  );

  effectIt.effect("rejects wildcard exports and missing conditions", () =>
    Effect.gen(function* () {
      const wildcard = yield* createInstallFixture({
        "./*": { import: "./dist/index.js", types: "./dist/index.d.ts" },
      });
      const missingTypes = yield* createInstallFixture({
        ".": { import: "./dist/index.js" },
      });
      const missingNode = yield* createInstallFixture({
        ".": { browser: "./dist/index.js", types: "./dist/index.d.ts" },
      });
      const [wildcardError, typesError, nodeError] = yield* Effect.all([
        verificationFailure(verificationInput(wildcard)),
        verificationFailure(verificationInput(missingTypes)),
        verificationFailure(verificationInput(missingNode)),
      ]);

      assertMessage(wildcardError, "Only exact package exports are supported");
      assertMessage(typesError, "must declare a types condition");
      assertMessage(nodeError, "must declare a Node-importable condition");
    })
  );

  effectIt.effect("rejects targets outside dist or missing", () =>
    Effect.gen(function* () {
      const outside = yield* createInstallFixture({
        ".": { import: "./dist/index.js", types: "./src/index.d.ts" },
      });
      const missing = yield* createInstallFixture({
        ".": { import: "./dist/missing.js", types: "./dist/index.d.ts" },
      });
      const [outsideError, missingError] = yield* Effect.all([
        verificationFailure(verificationInput(outside)),
        verificationFailure(verificationInput(missing)),
      ]);

      assertMessage(outsideError, "must target dist");
      assertMessage(missingError, "is missing ./dist/missing.js");
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
        failureWithAnswers(wrong, {
          [packageName]: distUrl(wrong.packageRoot, "feature.js"),
          [packageSubpath]: distUrl(wrong.packageRoot, "feature.js"),
        }),
      ]);

      assertMessage(changedError, "packed package name changed");
      assertMessage(wrongError, "selected the wrong condition");
    })
  );

  effectIt.effect("rejects a missing package or unreadable manifest", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const fixture = yield* createInstallFixture();
      const manifest = path.join(fixture.packageRoot, "package.json");

      yield* fileSystem.remove(manifest);
      const missingFile = yield* verificationFailure(
        verificationInput(fixture)
      );
      yield* fileSystem.writeFileString(manifest, "{");
      const invalidFile = yield* verificationFailure(
        verificationInput(fixture)
      );
      yield* fileSystem.remove(fixture.packageRoot, { recursive: true });
      const missingPackage = yield* verificationFailure(
        verificationInput(fixture)
      );

      assertMessage(missingFile, "Unable to read the installed manifest");
      assertMessage(invalidFile, "Unable to read the installed manifest");
      assertMessage(
        missingPackage,
        `Unable to resolve the installed ${packageName} directory.`
      );
    })
  );

  effectIt.effect("rejects unusable or unanswered resolutions", () =>
    Effect.gen(function* () {
      const fixture = yield* createInstallFixture();
      const errors = yield* Effect.all([
        failureWithAnswers(fixture, {
          [packageName]: new URL("node:fs"),
          [packageSubpath]: distUrl(fixture.packageRoot, "feature.js"),
        }),
        failureWithAnswers(fixture, {
          [packageName]: distUrl(fixture.packageRoot, "missing.js"),
          [packageSubpath]: distUrl(fixture.packageRoot, "feature.js"),
        }),
        failureWithAnswers(fixture, {
          [packageSubpath]: distUrl(fixture.packageRoot, "feature.js"),
        }),
      ]);

      for (const error of errors) {
        assertMessage(
          error,
          `Unable to inspect Node resolution for ${packageName}.`
        );
      }
    })
  );

  effectIt.effect("types missing package and injected boundary failures", () =>
    Effect.gen(function* () {
      const fixture = yield* createInstallFixture();
      const missingRoot = yield* verificationFailure({
        ...verificationInput(fixture),
        consumerRoot: `${fixture.consumerRoot}/missing`,
      });
      const inspectFailure = yield* verifyInstalledPackage(
        verificationInput(fixture, {
          inspect: () =>
            Effect.fail(new TestBoundaryError({ operation: "inspect" })),
        })
      ).pipe(Effect.flip);
      const writeFailure = yield* verifyInstalledPackage(
        verificationInput(fixture, {
          write: () =>
            Effect.fail(new TestBoundaryError({ operation: "write" })),
        })
      ).pipe(Effect.flip);

      assert.strictEqual(missingRoot._tag, "InstallVerificationError");
      assert.strictEqual(inspectFailure._tag, "TestBoundaryError");
      assert.strictEqual(writeFailure._tag, "TestBoundaryError");
    })
  );
});
