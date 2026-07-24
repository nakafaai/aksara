import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { Effect, Layer } from "effect";
import { QUESTION_SOURCE_FILES } from "#corpus/question-bank/path";

export const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");

const sourceRoot = "packages/corpus/question-bank/tryout";
const absoluteSourceRoot = resolve(corpusRoot, sourceRoot);
const QUESTION_DIRECTORY_PATTERN = /\/question-[1-9]\d*$/u;
const entries = globSync("**/*", { cwd: absoluteSourceRoot });
const sources = new Map<string, string>();
for (const sourcePath of globSync("packages/corpus/**/*.ts", {
  cwd: corpusRoot,
})) {
  const absolutePath = resolve(corpusRoot, sourcePath);
  sources.set(absolutePath, readFileSync(absolutePath, "utf8"));
}

/** One observed directory read made through the controlled corpus test layer. */
export interface QuestionDirectoryRead {
  readonly path: string;
  readonly recursive: boolean;
}

/** Creates a path-faithful question filesystem with optional read evidence. */
export function makeQuestionLayer(
  directoryReads: QuestionDirectoryRead[] = []
) {
  return FileSystem.layerNoop({
    readDirectory: (path, options) => {
      const recursive = options?.recursive === true;
      directoryReads.push({ path, recursive });
      if (path === absoluteSourceRoot && recursive) {
        return Effect.succeed(entries);
      }
      if (
        path.startsWith(`${absoluteSourceRoot}/`) &&
        !recursive &&
        QUESTION_DIRECTORY_PATTERN.test(path)
      ) {
        return Effect.succeed([...QUESTION_SOURCE_FILES]);
      }
      return Effect.fail(missing("readDirectory", path));
    },
    readFileString: (path) => {
      const source = sources.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(missing("readFileString", path));
    },
  });
}

/** Creates one stable missing-path error for the controlled filesystem. */
function missing(method: "readDirectory" | "readFileString", path: string) {
  return new PlatformError.SystemError({
    method,
    module: "FileSystem",
    pathOrDescriptor: path,
    reason: "NotFound",
  });
}

const fileLayer = makeQuestionLayer();

export const questionLayer = Layer.merge(fileLayer, Path.layer);
