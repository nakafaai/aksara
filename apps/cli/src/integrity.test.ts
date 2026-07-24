import { realpathSync, unlinkSync, writeFileSync } from "node:fs";
import { relative } from "node:path";
import { FileSystem, Error as PlatformError } from "@effect/platform";
import { Effect } from "effect";
import { afterEach, describe, expect, it } from "vitest";
import {
  fingerprintSelectedDocument,
  verifySelectedDirectory,
  verifySelectedFingerprint,
} from "#cli/integrity";
import { selectPreviewDocument } from "#cli/repository";
import { runNode } from "#test/effect";
import { makeRepositoryTracker, REPOSITORY_ROOT } from "#test/real";

const repositories = makeRepositoryTracker();
const QUESTION_PATH =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/question.en.mdx";

afterEach(() => {
  repositories.clear();
});

describe("preview source integrity", () => {
  it("rejects missing or changed files across one compilation closure", async () => {
    const repository = repositories.create();
    const aksaraRoot = realpathSync(repository.aksaraRoot);
    const documentPath = realpathSync(repository.documentPath);
    const requested = relative(aksaraRoot, documentPath);
    const selected = await runNode(
      selectPreviewDocument(aksaraRoot, requested)
    );
    const fingerprint = await runNode(fingerprintSelectedDocument(selected));
    writeFileSync(repository.documentPath, "changed during compilation");
    const changed = await runNode(
      verifySelectedFingerprint(selected, fingerprint).pipe(Effect.flip)
    );
    unlinkSync(repository.documentPath);
    const missing = await runNode(
      fingerprintSelectedDocument(selected).pipe(Effect.flip)
    );

    expect(changed).toMatchObject({
      kind: "document",
      path: selected.document.sourcePath,
      reason: "changed",
    });
    expect(missing).toMatchObject({
      kind: "document",
      path: selected.document.sourcePath,
      reason: "missing",
    });
  });

  it("rejects missing, replaced, and unreadable selected directories", async () => {
    const selected = await runNode(
      selectPreviewDocument(realpathSync(REPOSITORY_ROOT), QUESTION_PATH)
    );
    const [directory] = selected.directories;
    expect(directory).toBeDefined();
    if (directory === undefined) {
      return;
    }
    const systemError = new PlatformError.SystemError({
      method: "realPath",
      module: "FileSystem",
      pathOrDescriptor: directory.absolutePath,
      reason: "NotFound",
    });
    const failures = await Promise.all([
      Effect.runPromise(
        verifySelectedDirectory(directory).pipe(
          Effect.provide(
            FileSystem.layerNoop({
              realPath: () => Effect.fail(systemError),
            })
          ),
          Effect.flip
        )
      ),
      Effect.runPromise(
        verifySelectedDirectory(directory).pipe(
          Effect.provide(
            FileSystem.layerNoop({
              realPath: () => Effect.succeed(`${directory.absolutePath}-moved`),
            })
          ),
          Effect.flip
        )
      ),
      Effect.runPromise(
        verifySelectedDirectory(directory).pipe(
          Effect.provide(
            FileSystem.layerNoop({
              readDirectory: () => Effect.fail(systemError),
              realPath: () => Effect.succeed(directory.absolutePath),
            })
          ),
          Effect.flip
        )
      ),
    ]);

    expect(failures).toEqual([
      expect.objectContaining({
        _tag: "PreviewRestartError",
        sourcePath: directory.sourcePath,
      }),
      expect.objectContaining({
        _tag: "PreviewRestartError",
        sourcePath: directory.sourcePath,
      }),
      expect.objectContaining({
        _tag: "PreviewRestartError",
        sourcePath: directory.sourcePath,
      }),
    ]);
  });
});
