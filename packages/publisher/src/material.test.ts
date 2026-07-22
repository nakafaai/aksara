import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { prepareMaterialCheckout } from "#publisher/material";

const checkoutRoot = resolve(process.cwd(), "..", "..");
const englishPath =
  "packages/corpus/material/mathematics/function/concept/en.mdx";
const indonesianPath =
  "packages/corpus/material/mathematics/function/concept/id.mdx";
const sourceByPath = new Map(
  [englishPath, indonesianPath].map((sourcePath) => {
    const absolutePath = resolve(checkoutRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);
const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "InlineMath", version: 1 }],
      supportedComponents: [{ name: "InlineMath", version: 1 }],
    },
    domains: [
      {
        authoringComponents: [{ name: "AtomShellLab", version: 1 }],
        name: "material-chemistry",
        supportedComponents: [{ name: "AtomShellLab", version: 1 }],
      },
      {
        authoringComponents: [{ name: "FunctionMachine", version: 1 }],
        name: "material-mathematics",
        supportedComponents: [{ name: "FunctionMachine", version: 1 }],
      },
    ],
  })
);

/** Provides deterministic reads for the two checked-in real MDX sources. */
function fileLayer(sources: ReadonlyMap<string, string>) {
  return FileSystem.layerNoop({
    readFileString: (path) => {
      const source = sources.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        new PlatformError.SystemError({
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
          reason: "NotFound",
        })
      );
    },
  });
}

/** Runs exact-checkout preparation only at the Vitest boundary. */
function prepare(sources: ReadonlyMap<string, string>) {
  return Effect.runPromise(
    prepareMaterialCheckout(checkoutRoot, rendererManifest).pipe(
      Stream.runCollect,
      Effect.map((chunk) => [...chunk]),
      Effect.provide(fileLayer(sources)),
      Effect.provide(Path.layer)
    )
  );
}

describe("material preparation", () => {
  it("derives signed changes and projections from real MDX metadata", async () => {
    const prepared = await prepare(sourceByPath);
    expect(prepared.map(({ change }) => change.sourcePath)).toEqual([
      englishPath,
      indonesianPath,
    ]);
    expect(prepared.map(({ change }) => change.publicPath)).toEqual([
      "subjects/mathematics/function-composition-inverse-function/function-concept",
      "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
    ]);
    expect(prepared.map(({ projection }) => projection.metadata)).toEqual([
      {
        authors: [{ name: "Nabil Akbarazzima Fatih" }],
        date: "2025-04-27",
        description:
          "Understand functions as magic machines with interactive examples. Learn f(x) notation, input-output relationships, and the one-to-one rule.",
        subject: "Function Composition and Inverse Function",
        title: "Function Concept",
      },
      {
        authors: [{ name: "Nabil Akbarazzima Fatih" }],
        date: "2025-04-27",
        description:
          "Pahami fungsi sebagai mesin ajaib dengan contoh interaktif. Pelajari notasi f(x), hubungan input-output, dan aturan tepat satu.",
        subject: "Fungsi Komposisi dan Fungsi Invers",
        title: "Konsep Fungsi",
      },
    ]);
    expect(
      prepared.every(
        ({ change, payload }) =>
          change.rendererDomain === payload.rendererDomain &&
          change.artifactHash.startsWith("sha256:") &&
          !payload.compiledCode.includes("metadata")
      )
    ).toBe(true);
  });

  it("fails closed when real authored metadata violates the material schema", async () => {
    const invalid = new Map(sourceByPath);
    const english = invalid.get(resolve(checkoutRoot, englishPath));
    expect(english).toBeDefined();
    if (english === undefined) {
      return;
    }
    invalid.set(
      resolve(checkoutRoot, englishPath),
      english.replace('  title: "Function Concept",\n', "")
    );
    const error = await Effect.runPromise(
      prepareMaterialCheckout(checkoutRoot, rendererManifest).pipe(
        Stream.runDrain,
        Effect.provide(fileLayer(invalid)),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );
    expect(error).toMatchObject({
      _tag: "MaterialMetadataError",
      sourcePath: englishPath,
    });
  });

  it("maps checkout read failures to the publisher source error", async () => {
    const error = await Effect.runPromise(
      prepareMaterialCheckout(checkoutRoot, rendererManifest).pipe(
        Stream.runDrain,
        Effect.provide(fileLayer(new Map())),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "MaterialSourceError",
      checkoutRoot,
    });
  });
});
