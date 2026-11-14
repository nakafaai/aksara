import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { Effect, type Scope } from "effect";

/** Creates a temporary lesson root and removes it afterwards. */
export const temporaryRoot = (
  entries: Record<string, string>,
  setup: (root: string) => void = () => undefined
): Effect.Effect<string, never, Scope.Scope> =>
  Effect.acquireRelease(
    Effect.sync(() => {
      const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-voice-"));
      for (const [path, source] of Object.entries(entries)) {
        const file = join(root, path);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, source);
      }
      setup(root);
      return root;
    }),
    (root) => Effect.sync(() => rmSync(root, { force: true, recursive: true }))
  );
