import { Context, Effect, Layer, Schema, Semaphore } from "effect";
import type { SourceFile } from "typescript/unstable/ast";
import { API, type Diagnostic } from "typescript/unstable/sync";

const ROOT = "/aksara-typescript";

/** Exact source text inspected without resolving or executing its imports. */
export const TypeScriptSource = Schema.Struct({
  fileName: Schema.String,
  source: Schema.String,
});

/** Native compiler startup failed before any source could be inspected. */
export class TypeScriptCompilerError extends Schema.TaggedError<TypeScriptCompilerError>()(
  "TypeScriptCompilerError",
  { cause: Schema.Unknown }
) {}

/** The native compiler could not return one requested source snapshot. */
export class TypeScriptSourceError extends Schema.TaggedError<TypeScriptSourceError>()(
  "TypeScriptSourceError",
  { cause: Schema.Unknown, fileName: Schema.String }
) {}

/** Parsed syntax and diagnostics belonging to the same immutable snapshot. */
export interface ParsedTypeScript {
  readonly diagnostics: readonly Diagnostic[];
  readonly sourceFile: SourceFile;
}

/** Scoped native parser shared by one source-discovery or policy operation. */
export class TypeScriptParser extends Context.Service<
  TypeScriptParser,
  {
    /** Inspects source while its native snapshot and compiler remain open. */
    readonly inspect: <A>(
      input: typeof TypeScriptSource.Type,
      read: (parsed: ParsedTypeScript) => A
    ) => Effect.Effect<A, TypeScriptSourceError>;
  }
>()("AksaraUtilities.TypeScriptParser") {
  static readonly layer = Layer.effect(
    TypeScriptParser,
    Effect.gen(function* () {
      const files = new Map<string, string>();
      const permit = yield* Semaphore.make(1);
      const api = yield* Effect.acquireRelease(
        Effect.try({
          catch: (cause) => new TypeScriptCompilerError({ cause }),
          try: () =>
            new API({
              cwd: ROOT,
              fs: {
                directoryExists: (path) =>
                  path === "/" || path === ROOT || path.startsWith(`${ROOT}/`),
                fileExists: (path) => files.has(path),
                readFile: (path) => files.get(path) ?? null,
              },
            }),
        }),
        (resource) => Effect.sync(() => resource.close())
      );
      let revision = 0;
      let previousProject: string | undefined;

      /** Gives each source immutable identity and releases the previous project. */
      const inspect = Effect.fn("AksaraUtilities.inspectTypeScript")(
        function* <A>(
          input: typeof TypeScriptSource.Type,
          read: (parsed: ParsedTypeScript) => A
        ) {
          const directory = `${ROOT}/${revision}`;
          const configPath = `${directory}/tsconfig.json`;
          const filePath = `${directory}/${encodeURIComponent(input.fileName)}`;
          /** Associates native inspection failures with the requested source. */
          const failure = (cause: unknown) =>
            new TypeScriptSourceError({ cause, fileName: input.fileName });
          const snapshot = yield* Effect.acquireRelease(
            Effect.try({
              catch: failure,
              try: () => {
                files.clear();
                files.set(filePath, input.source);
                files.set(
                  configPath,
                  JSON.stringify({
                    compilerOptions: {
                      allowJs: true,
                      noLib: true,
                      noResolve: true,
                    },
                    files: [filePath],
                  })
                );
                const next = api.updateSnapshot({
                  closeProjects:
                    previousProject === undefined ? [] : [previousProject],
                  openProjects: [configPath],
                });
                previousProject = configPath;
                revision += 1;
                return next;
              },
            }),
            (resource) => Effect.sync(() => resource.dispose())
          );
          const parsed = yield* Effect.try({
            catch: failure,
            try: () => {
              const project = snapshot.getProject(configPath);
              return {
                project,
                sourceFile: project?.program.getSourceFile(filePath),
              };
            },
          });
          if (parsed.project === undefined || parsed.sourceFile === undefined) {
            return yield* failure("The requested native source is missing.");
          }
          const { project, sourceFile } = parsed;
          return yield* Effect.try({
            catch: failure,
            try: () =>
              read({
                diagnostics: project.program.getSyntacticDiagnostics(filePath),
                sourceFile,
              }),
          });
        },
        Effect.scoped,
        permit.withPermit
      );

      return TypeScriptParser.of({ inspect });
    })
  );
}
