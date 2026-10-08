import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect, HashMap } from "effect";
import {
  enforceViolations,
  trackedFiles,
  typescriptFiles,
} from "#scripts/check/files";
import { runEntry } from "#scripts/entry";
import { importViolations } from "#scripts/imports/boundary";
import {
  sourceConditionFromConfig,
  sourceConditionViolations,
} from "#scripts/imports/conditions";
import { effectTestViolations } from "#scripts/imports/effect";
import {
  createWorkspaceIdentityResolver,
  WorkspaceIdentityError,
} from "#scripts/imports/workspace";
import { readSource } from "#scripts/source";

const WORKSPACE_MANIFEST_PATTERN = /^(?:apps|packages)\/[^/]+\/package\.json$/u;

/** Reads one authored TypeScript module, reporting a failed read as a source error. */
const readTypescriptSource = Effect.fn("AksaraPolicy.readSource")(function* (
  file: string
) {
  return yield* readSource(file).pipe(
    Effect.mapError(
      (cause) => new TypeScriptSourceError({ cause, fileName: file })
    )
  );
});

/** Runs every repository import, test, and source-condition policy and reports each group. */
export const checkRepository = Effect.gen(function* () {
  const files = yield* trackedFiles();
  const sources = yield* Effect.forEach(typescriptFiles(files), (file) =>
    readTypescriptSource(file).pipe(Effect.map((text) => ({ file, text })))
  );
  const manifests = yield* Effect.forEach(
    Arr.filter(files, (file) => WORKSPACE_MANIFEST_PATTERN.test(file)),
    (file) =>
      readSource(file).pipe(
        Effect.map((text): readonly [string, string] => [file, text])
      )
  );
  const manifestTexts = HashMap.fromIterable(manifests);
  const repositoryIdentity = createWorkspaceIdentityResolver((path) =>
    Effect.fromOption(HashMap.get(manifestTexts, path)).pipe(
      Effect.mapError(
        () =>
          new WorkspaceIdentityError({
            message: `${path} is not a tracked workspace manifest.`,
          })
      )
    )
  );
  const results = yield* Effect.forEach(sources, ({ file, text }) =>
    Effect.gen(function* () {
      return {
        imports: yield* importViolations(file, text, repositoryIdentity),
        tests: yield* effectTestViolations(file, text),
      };
    })
  );
  enforceViolations(
    "TypeScript imports must respect workspace aliases",
    Arr.flatMap(results, (result) => result.imports)
  );
  enforceViolations(
    "Effect tests must use native Effect Vitest execution",
    Arr.flatMap(results, (result) => result.tests)
  );
  const workspaceSourceCondition = yield* sourceConditionFromConfig(
    yield* readSource("packages/typescript-config/base.json")
  );
  enforceViolations(
    "Workspace source conditions must resolve before generated output",
    Arr.flatMap(manifests, ([file, text]) =>
      sourceConditionViolations(file, text, workspaceSourceCondition)
    )
  );
}).pipe(Effect.provide(TypeScriptParser.layer));

runEntry(import.meta.main, checkRepository);
