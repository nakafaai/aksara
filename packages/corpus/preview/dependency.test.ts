import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, FileSystem, Path, PlatformError } from "effect";
import { discoverSourceDependencies } from "#corpus/preview/dependency";
import { corpusRoot } from "#corpus/test/question-layer";

/** Loads checked-in corpus TypeScript through the Node Effect services. */
const loadCorpusSources = Effect.fn("AksaraCorpus.test.loadCorpusSources")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const sourcePaths = yield* fileSystem.glob("packages/corpus/**/*.ts", {
      root: corpusRoot,
    });
    const sources = yield* Effect.forEach(sourcePaths, (sourcePath) => {
      const absolutePath = resolve(corpusRoot, sourcePath);
      return fileSystem
        .readFileString(absolutePath)
        .pipe(Effect.map((source) => [absolutePath, source] as const));
    });
    return new Map(sources);
  }
);

/** Discovers one real source closure through a captured corpus filesystem. */
function discoverReal(
  sourcePath: CorpusSourcePath,
  sources: ReadonlyMap<string, string>
) {
  return discoverSourceDependencies(corpusRoot, sourcePath).pipe(
    Effect.provide([sourceLayer(sources), Path.layer])
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
        PlatformError.systemError({
          _tag: "NotFound",
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
        })
      );
    },
  });
}

/** Discovers one source closure through a controlled filesystem. */
function discover(
  sourcePath: CorpusSourcePath,
  sources: ReadonlyMap<string, string>
) {
  return discoverSourceDependencies(corpusRoot, sourcePath).pipe(
    Effect.provide([sourceLayer(sources), Path.layer])
  );
}

/** Returns a typed source-closure failure through a controlled filesystem. */
function reject(
  sourcePath: CorpusSourcePath,
  sources: ReadonlyMap<string, string>
) {
  return discoverSourceDependencies(corpusRoot, sourcePath).pipe(
    Effect.provide([sourceLayer(sources), Path.layer]),
    Effect.flip
  );
}

/** Maps one canonical corpus path onto its controlled absolute test path. */
function sourceEntry(
  sourcePath: CorpusSourcePath,
  source: string
): readonly [string, string] {
  return [resolve(corpusRoot, sourcePath), source];
}

layer(NodeServices.layer)("source dependencies", (it) => {
  it.effect(
    "discovers exact real article and transitive material source closures",
    () =>
      Effect.gen(function* () {
        const articleSource = CorpusSourcePathSchema.make(
          "packages/corpus/articles/politics/dynastic-politics/asian-values/source.ts"
        );
        const materialSource = CorpusSourcePathSchema.make(
          "packages/corpus/material/lesson/ai-ds/ai-programming/source.ts"
        );
        const corpusSources = yield* loadCorpusSources();
        const [article, material] = yield* Effect.all([
          discoverReal(articleSource, corpusSources),
          discoverReal(materialSource, corpusSources),
        ]);

        expect(article).toEqual([
          articleSource,
          "packages/corpus/articles/politics/category.ts",
          "packages/corpus/articles/politics/dynastic-politics/asian-values/ref.ts",
          "packages/corpus/articles/schema.ts",
          "packages/corpus/locale/source.ts",
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
      })
  );

  it.effect(
    "ignores external imports and terminates repeated corpus imports",
    () =>
      Effect.gen(function* () {
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

        expect(yield* discover(sourcePath, sources)).toEqual([
          sourcePath,
          dependencyPath,
        ]);
      })
  );

  it.effect("discovers corpus dependencies declared through import types", () =>
    Effect.gen(function* () {
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

      expect(yield* discover(sourcePath, sources)).toEqual([
        sourcePath,
        dependencyPath,
      ]);
    })
  );

  it.effect(
    "rejects missing, invalid, dynamic, and relative source modules",
    () =>
      Effect.gen(function* () {
        const sourcePath = CorpusSourcePathSchema.make(
          "packages/corpus/test/source.ts"
        );
        const failures = yield* Effect.all([
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
            new Map([
              sourceEntry(sourcePath, 'import value = require("data");'),
            ])
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
            new Map([
              sourceEntry(sourcePath, "type Value = import(data).Value;"),
            ])
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
      })
  );

  it.effect("bounds transitive source discovery", () =>
    Effect.gen(function* () {
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
      const error = yield* reject(sourcePath, sources);

      expect(error).toMatchObject({
        reason: "limit",
        sourcePath: lastSource,
      });
    })
  );
});
