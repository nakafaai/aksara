import { Context, Effect, Layer, Schema, Semaphore } from "effect";
import type { SourceFile } from "tsrs/ast";
import { createFileSystem } from "tsrs/fs";
import { API, type Project } from "tsrs/sync";

const ROOT = "/aksara-typescript";
/** Plain JSON codec whose text is byte-identical to JSON.stringify. */
const JSON_TEXT = Schema.fromJsonString(Schema.Unknown);

/** Exact source text inspected without resolving or executing its imports. */
const TypeScriptSource = Schema.Struct({
  fileName: Schema.String,
  source: Schema.String,
});

/** Native compiler startup failed before any source could be inspected. */
export class TypeScriptCompilerError extends Schema.TaggedError<
  TypeScriptCompilerError,
  { readonly brand: unique symbol }
>()("TypeScriptCompilerError", { cause: Schema.Unknown }) {}

/** The native compiler could not return one requested source snapshot. */
export class TypeScriptSourceError extends Schema.TaggedError<
  TypeScriptSourceError,
  { readonly brand: unique symbol }
>()("TypeScriptSourceError", {
  cause: Schema.Unknown,
  fileName: Schema.String,
}) {}

/** Builds the parsed view of one native source that inspection callers receive. */
function parsedView(
  project: Project,
  filePath: string,
  sourceFile: SourceFile
) {
  return {
    diagnostics: project.program.getSyntacticDiagnostics(filePath),
    sourceFile,
  };
}

/** Parsed syntax and diagnostics belonging to the same immutable snapshot. */
type ParsedTypeScript = Readonly<ReturnType<typeof parsedView>>;

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
>()("@nakafa/aksara-utilities/typescript/parse/TypeScriptParser") {
  static readonly layer = Layer.effect(
    TypeScriptParser,
    Effect.gen(function* () {
      const permit = yield* Semaphore.make(1);
      const api = yield* Effect.acquireRelease(
        Effect.try({
          catch: (cause) => new TypeScriptCompilerError({ cause }),
          try: () => new API({ cwd: ROOT }),
        }),
        (resource) => Effect.sync(() => resource.close())
      );
      let revision = 0;

      /**
       * Gives each source immutable identity in a snapshot of its own files. A
       * full request filesystem is total, so no host file is visible to it.
       */
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
          const config = yield* Schema.encodeEffect(JSON_TEXT)({
            compilerOptions: {
              allowJs: true,
              noLib: true,
              noResolve: true,
            },
            files: [filePath],
          }).pipe(Effect.orDie);
          const snapshot = yield* Effect.acquireRelease(
            Effect.try({
              catch: failure,
              try: () => {
                const next = api.createSnapshot({
                  fileSystem: createFileSystem([
                    [filePath, input.source],
                    [configPath, config],
                  ]),
                  openProjects: [configPath],
                });
                revision += 1;
                return next;
              },
            }),
            (resource) => Effect.sync(() => resource.dispose())
          );
          const parsed = yield* Effect.try({
            catch: failure,
            try: () => {
              const project = snapshot.getConfiguredProject(configPath);
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
            try: () => read(parsedView(project, filePath, sourceFile)),
          });
        },
        Effect.scoped,
        permit.withPermit
      );

      return TypeScriptParser.of({ inspect });
    })
  );
}
