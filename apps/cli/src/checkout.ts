import { Effect, FileSystem, Option, Path, Predicate, Schema } from "effect";

/** A required Aksara or Nakafa checkout failed exact identity validation. */
export class PreviewCheckoutError extends Schema.TaggedError<PreviewCheckoutError>()(
  "PreviewCheckoutError",
  {
    kind: Schema.Literals(["aksara", "nakafa"]),
    path: Schema.String,
    reason: Schema.Literals(["identity", "missing", "symlink"]),
  }
) {}

/** Reads one package identity without accepting malformed JSON as evidence. */
const readPackageName = Effect.fn("AksaraCli.readPackageName")(function* (
  root: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const manifestPath = path.join(root, "package.json");
  const source = yield* fileSystem
    .readFileString(manifestPath, "utf8")
    .pipe(Effect.option);
  return Option.flatMap(source, (manifest) =>
    Option.flatMap(
      Option.liftThrowable((value: string): unknown => JSON.parse(value))(
        manifest
      ),
      (value) =>
        Predicate.isObject(value) && typeof value.name === "string"
          ? Option.some(value.name)
          : Option.none()
    )
  );
});

/** Finds the nearest repository root with the exact Aksara package identity. */
export const findAksaraRoot = Effect.fn("AksaraCli.findAksaraRoot")(function* (
  start: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  let current = path.resolve(start);
  const ancestors = [current];
  let parent = path.dirname(current);
  while (parent !== current) {
    ancestors.push(parent);
    current = parent;
    parent = path.dirname(current);
  }
  for (const candidate of ancestors) {
    const manifest = path.join(candidate, "package.json");
    if (yield* fileSystem.exists(manifest)) {
      const name = yield* readPackageName(candidate);
      if (Option.contains(name, "aksara")) {
        return yield* fileSystem.realPath(candidate).pipe(
          Effect.mapError(
            () =>
              new PreviewCheckoutError({
                kind: "aksara",
                path: candidate,
                reason: "symlink",
              })
          )
        );
      }
    }
  }
  return yield* new PreviewCheckoutError({
    kind: "aksara",
    path: start,
    reason: "missing",
  });
});

/** Resolves and validates the one actual Nakafa sibling checkout. */
export const resolveNakafaRoot = Effect.fn("AksaraCli.resolveNakafaRoot")(
  function* (aksaraRoot: string, override: string | undefined) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const candidate = path.resolve(
      override ?? path.join(path.dirname(aksaraRoot), "nakafa.com")
    );
    const root = yield* fileSystem.realPath(candidate).pipe(
      Effect.mapError(
        () =>
          new PreviewCheckoutError({
            kind: "nakafa",
            path: candidate,
            reason: "missing",
          })
      )
    );
    const packageName = yield* readPackageName(root);
    const appName = yield* readPackageName(path.join(root, "apps", "www"));
    if (
      !(
        Option.contains(packageName, "nakafa") &&
        Option.contains(appName, "www")
      )
    ) {
      return yield* new PreviewCheckoutError({
        kind: "nakafa",
        path: root,
        reason: "identity",
      });
    }
    return root;
  }
);
