import { FileSystem, Path } from "@effect/platform";
import type { PreviewDocument } from "@nakafa/aksara-contracts/preview/spec";
import { PreviewDocumentSchema } from "@nakafa/aksara-contracts/preview/spec";
import {
  decodeMaterialRegistry,
  type MaterialEntry,
} from "@nakafa/aksara-corpus/material/registry";
import { Effect, Predicate, Schema } from "effect";

/** A requested checkout or document failed exact source validation. */
export class PreviewRepositoryError extends Schema.TaggedError<PreviewRepositoryError>()(
  "PreviewRepositoryError",
  {
    kind: Schema.Literal("aksara", "document", "nakafa"),
    path: Schema.String,
    reason: Schema.Literal("identity", "missing", "registry", "symlink"),
  }
) {}

/** Exact selected registry row plus its real filesystem identity. */
export interface SelectedDocument {
  readonly absolutePath: string;
  readonly document: PreviewDocument;
  readonly entry: MaterialEntry;
}

/** Revalidates a selected source before each read to reject path replacement. */
export const verifySelectedDocument = Effect.fn(
  "AksaraCli.verifySelectedDocument"
)(function* (selected: SelectedDocument) {
  const fileSystem = yield* FileSystem.FileSystem;
  const actualPath = yield* fileSystem.realPath(selected.absolutePath).pipe(
    Effect.mapError(
      () =>
        new PreviewRepositoryError({
          kind: "document",
          path: selected.entry.sourcePath,
          reason: "missing",
        })
    )
  );
  if (actualPath !== selected.absolutePath) {
    return yield* new PreviewRepositoryError({
      kind: "document",
      path: selected.entry.sourcePath,
      reason: "symlink",
    });
  }
});

/** Reads one package identity without accepting malformed JSON as evidence. */
const readPackageName = Effect.fn("AksaraCli.readPackageName")(function* (
  root: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const manifestPath = path.join(root, "package.json");
  const source = yield* fileSystem.readFileString(manifestPath, "utf8");
  return yield* Effect.try({
    catch: () => undefined,
    try: () => {
      const parsed: unknown = JSON.parse(source);
      return Predicate.isRecord(parsed) && typeof parsed.name === "string"
        ? parsed.name
        : undefined;
    },
  });
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
      const name = yield* readPackageName(candidate).pipe(
        Effect.catchAll(() => Effect.succeed(undefined))
      );
      if (name === "aksara") {
        return yield* fileSystem.realPath(candidate).pipe(
          Effect.mapError(
            () =>
              new PreviewRepositoryError({
                kind: "aksara",
                path: candidate,
                reason: "symlink",
              })
          )
        );
      }
    }
  }
  return yield* new PreviewRepositoryError({
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
          new PreviewRepositoryError({
            kind: "nakafa",
            path: candidate,
            reason: "missing",
          })
      )
    );
    const packageName = yield* readPackageName(root).pipe(
      Effect.mapError(
        () =>
          new PreviewRepositoryError({
            kind: "nakafa",
            path: root,
            reason: "identity",
          })
      )
    );
    const appName = yield* readPackageName(path.join(root, "apps", "www")).pipe(
      Effect.mapError(
        () =>
          new PreviewRepositoryError({
            kind: "nakafa",
            path: root,
            reason: "identity",
          })
      )
    );
    if (packageName !== "nakafa" || appName !== "www") {
      return yield* new PreviewRepositoryError({
        kind: "nakafa",
        path: root,
        reason: "identity",
      });
    }
    return root;
  }
);

/** Selects only an exact realpath-backed document in the canonical registry. */
export const selectPreviewDocument = Effect.fn(
  "AksaraCli.selectPreviewDocument"
)(function* (aksaraRoot: string, requestedPath: string) {
  const path = yield* Path.Path;
  const absolutePath = path.resolve(aksaraRoot, requestedPath);
  const relativePath = path
    .relative(aksaraRoot, absolutePath)
    .split(path.sep)
    .join("/");
  if (path.normalize(requestedPath) !== requestedPath) {
    return yield* new PreviewRepositoryError({
      kind: "document",
      path: requestedPath,
      reason: "registry",
    });
  }
  const entries = yield* decodeMaterialRegistry().pipe(
    Effect.mapError(
      () =>
        new PreviewRepositoryError({
          kind: "document",
          path: requestedPath,
          reason: "registry",
        })
    )
  );
  const entry = entries.find(({ sourcePath }) => sourcePath === relativePath);
  if (!entry) {
    return yield* new PreviewRepositoryError({
      kind: "document",
      path: requestedPath,
      reason: "registry",
    });
  }
  const document = PreviewDocumentSchema.make({
    delivery: entry.delivery,
    rendererDomain: entry.rendererDomain,
    route: entry.route,
    sourcePath: entry.sourcePath,
  });
  const selected = { absolutePath, document, entry } satisfies SelectedDocument;
  yield* verifySelectedDocument(selected);
  return selected;
});
