import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem, Path, Result } from "effect";
import { generateBundledNotice } from "#scripts/notice";

describe("bundled dependency notices", () => {
  it.effect("deduplicates and renders exact package license evidence", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-cli-notice-",
      });
      const dependency = path.join(root, "node_modules", "example");
      const input = path.join(dependency, "dist", "main.js");
      yield* fileSystem.makeDirectory(path.dirname(input), { recursive: true });
      yield* fileSystem.writeFileString(
        path.join(dependency, "package.json"),
        '{"license":"MIT","name":"example","version":"1.2.3"}'
      );
      yield* fileSystem.writeFileString(
        path.join(dependency, "LICENSE"),
        "Example license text\n"
      );

      const notice = yield* generateBundledNotice(
        [input, input, path.join(root, "src", "local.ts")],
        root
      );

      expect(notice).toContain("example 1.2.3");
      expect(notice).toContain("License: MIT");
      expect(notice).toContain("Example license text");
      expect(notice.match(/example 1\.2\.3/gu)).toHaveLength(1);
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("rejects missing or mismatched license evidence", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-cli-notice-error-",
      });
      const dependency = path.join(root, "node_modules", "expected");
      const input = path.join(dependency, "index.js");
      yield* fileSystem.makeDirectory(dependency, { recursive: true });
      yield* fileSystem.writeFileString(
        path.join(dependency, "package.json"),
        '{"license":"MIT","name":"different","version":"1.0.0"}'
      );
      const mismatch = yield* generateBundledNotice([input], root).pipe(
        Effect.result
      );
      yield* fileSystem.writeFileString(
        path.join(dependency, "package.json"),
        '{"license":"MIT","name":"expected","version":"1.0.0"}'
      );
      const missing = yield* generateBundledNotice([input], root).pipe(
        Effect.result
      );

      expect(Result.isFailure(mismatch) && mismatch.failure).toMatchObject({
        _tag: "NoticeError",
        stage: "manifest",
      });
      expect(Result.isFailure(missing) && missing.failure).toMatchObject({
        _tag: "NoticeError",
        stage: "license",
      });
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
