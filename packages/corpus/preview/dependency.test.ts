import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { discoverSourceDependencies } from "#corpus/preview/dependency";
import { corpusRoot } from "#corpus/test/question-layer";

const corpusSources = new Map(
  globSync("packages/corpus/**/*.ts", { cwd: corpusRoot }).map((sourcePath) => [
    resolve(corpusRoot, sourcePath),
    readFileSync(resolve(corpusRoot, sourcePath), "utf8"),
  ])
);

/** Runs a real source-closure discovery at the Vitest boundary. */
function discoverReal(sourcePath: CorpusSourcePath) {
  return Effect.runPromise(
    discoverSourceDependencies(corpusRoot, sourcePath).pipe(
      Effect.provide([sourceLayer(corpusSources), Path.layer])
    )
  );
}

/** Creates an in-memory source filesystem for dependency failure tests. */
function sourceLayer(sources: ReadonlyMap<string, string>) {
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

/** Runs one source-closure discovery through a controlled filesystem. */
function discover(
  sourcePath: CorpusSourcePath,
  sources: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    discoverSourceDependencies(corpusRoot, sourcePath).pipe(
      Effect.provide([sourceLayer(sources), Path.layer])
    )
  );
}

/** Returns a typed source-closure failure through a controlled filesystem. */
function reject(
  sourcePath: CorpusSourcePath,
  sources: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    discoverSourceDependencies(corpusRoot, sourcePath).pipe(
      Effect.provide([sourceLayer(sources), Path.layer]),
      Effect.flip
    )
  );
}

/** Maps one canonical corpus path onto its controlled absolute test path. */
function sourceEntry(
  sourcePath: CorpusSourcePath,
  source: string
): readonly [string, string] {
  return [resolve(corpusRoot, sourcePath), source];
}

describe("source dependencies", () => {
  it("discovers exact real article and transitive material source closures", async () => {
    const articleSource = CorpusSourcePathSchema.make(
      "packages/corpus/articles/politics/dynastic-politics/asian-values/source.ts"
    );
    const materialSource = CorpusSourcePathSchema.make(
      "packages/corpus/material/lesson/ai-ds/ai-programming/source.ts"
    );
    const [article, material] = await Promise.all([
      discoverReal(articleSource),
      discoverReal(materialSource),
    ]);

    expect(article).toEqual([
      articleSource,
      "packages/corpus/articles/politics/category.ts",
      "packages/corpus/articles/politics/dynastic-politics/asian-values/ref.ts",
      "packages/corpus/articles/schema.ts",
    ]);
    expect(material).toEqual(
      expect.arrayContaining([
        materialSource,
        "packages/corpus/material/lesson/ai-ds/ai-programming/data.ts",
        "packages/corpus/material/lesson/ai-ds/ai-programming/numpy.ts",
        "packages/corpus/material/lesson/ai-ds/ai-programming/syntax.ts",
        "packages/corpus/material/lesson/ai-ds/ai-programming/tools.ts",
        "packages/corpus/material/schema.ts",
        "packages/corpus/material/description.ts",
        "packages/corpus/route/schema.ts",
      ])
    );
    expect(
      material.some(
        (path) =>
          path.includes("/ai-programming/") && !path.endsWith("source.ts")
      )
    ).toBe(true);
  });

  it("ignores external imports and terminates repeated corpus imports", async () => {
    const sourcePath = CorpusSourcePathSchema.make(
      "packages/corpus/test/source.ts"
    );
    const dependencyPath = CorpusSourcePathSchema.make(
      "packages/corpus/test/data.ts"
    );
    const sources = new Map([
      sourceEntry(
        sourcePath,
        'import "effect";\nimport "#corpus/test/data";\nexport { value } from "#corpus/test/data";\ntype External = import("typescript").Node;'
      ),
      sourceEntry(dependencyPath, 'import "#corpus/test/source";'),
    ]);

    await expect(discover(sourcePath, sources)).resolves.toEqual([
      sourcePath,
      dependencyPath,
    ]);
  });

  it("discovers corpus dependencies declared through import types", async () => {
    const sourcePath = CorpusSourcePathSchema.make(
      "packages/corpus/test/source.ts"
    );
    const dependencyPath = CorpusSourcePathSchema.make(
      "packages/corpus/test/data.ts"
    );
    const sources = new Map([
      sourceEntry(
        sourcePath,
        'export type Value = import("#corpus/test/data").Value;'
      ),
      sourceEntry(dependencyPath, "export type Value = string;"),
    ]);

    await expect(discover(sourcePath, sources)).resolves.toEqual([
      sourcePath,
      dependencyPath,
    ]);
  });

  it("rejects missing, invalid, dynamic, and relative source modules", async () => {
    const sourcePath = CorpusSourcePathSchema.make(
      "packages/corpus/test/source.ts"
    );
    const failures = await Promise.all([
      reject(sourcePath, new Map()),
      reject(
        sourcePath,
        new Map([sourceEntry(sourcePath, "const broken = {;")])
      ),
      reject(
        sourcePath,
        new Map([sourceEntry(sourcePath, 'import("./data");')])
      ),
      reject(
        sourcePath,
        new Map([sourceEntry(sourcePath, 'import value = require("data");')])
      ),
      reject(
        sourcePath,
        new Map([sourceEntry(sourcePath, 'import value from "./data";')])
      ),
      reject(
        sourcePath,
        new Map([
          sourceEntry(sourcePath, 'type Value = import("./data").Value;'),
        ])
      ),
      reject(
        sourcePath,
        new Map([sourceEntry(sourcePath, "type Value = import(data).Value;")])
      ),
      reject(
        sourcePath,
        new Map([sourceEntry(sourcePath, 'import "#corpus/../data";')])
      ),
    ]);

    expect(failures.map(({ reason }) => reason)).toEqual([
      "missing",
      "syntax",
      "module",
      "module",
      "module",
      "module",
      "module",
      "module",
    ]);
  });

  it("bounds transitive source discovery", async () => {
    const sourcePath = CorpusSourcePathSchema.make(
      "packages/corpus/test/source-0.ts"
    );
    const lastSource = CorpusSourcePathSchema.make(
      "packages/corpus/test/source-128.ts"
    );
    const sourcePaths = [
      sourcePath,
      ...Array.from({ length: 128 }, (_, index) =>
        CorpusSourcePathSchema.make(
          `packages/corpus/test/source-${index + 1}.ts`
        )
      ),
    ];
    const sources = new Map(
      sourcePaths.map((currentPath, index) =>
        sourceEntry(
          currentPath,
          index === sourcePaths.length - 1
            ? "export {};"
            : `import "#corpus/test/source-${index + 1}";`
        )
      )
    );
    const error = await reject(sourcePath, sources);

    expect(error).toMatchObject({
      reason: "limit",
      sourcePath: lastSource,
    });
  });
});
