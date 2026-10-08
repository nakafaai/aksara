import { Effect, Path } from "effect";

/** Resolves the repository files from this module's location for the script. */
export const defaultBumpConfig = Effect.gen(function* () {
  const path = yield* Path.Path;
  return {
    manifest: path.resolve(import.meta.dirname, "../../package.json"),
    root: path.resolve(import.meta.dirname, "../.."),
    workspace: path.resolve(import.meta.dirname, "../../pnpm-workspace.yaml"),
  };
});
