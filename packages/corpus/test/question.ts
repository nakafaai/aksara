import { NodeServices } from "@effect/platform-node";
import { DeliveryLanguageSchema } from "@nakafa/aksara-contracts/locale";
import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  HashMap,
  Layer,
  MutableHashMap,
  MutableList,
  Option,
  Order,
  Path,
  PlatformError,
  pipe,
  Schema,
} from "effect";
import {
  indexQuestionBanks,
  type QuestionBankIndex,
  questionSourceFiles,
} from "#corpus/question-bank/path";
import { discoverQuestionSources } from "#corpus/question-bank/source";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

export const questionTestSourceRoot = "packages/corpus/question-bank/tryout";
/** Headroom for integrity tests that decode the complete physical question bank. */
export const physicalQuestionBankTestTimeout = 30_000;
const QUESTION_DIRECTORY_PATTERN = /\/question-[1-9]\d*$/u;
const QUESTION_PROMPT_PATTERN = /^question\..*\.mdx$/u;

const QuestionDirectoryReadSchema = Schema.Struct({
  path: Schema.String,
  recursive: Schema.Boolean,
});
/** One observed directory read made through the controlled corpus test layer. */
export type QuestionDirectoryRead = typeof QuestionDirectoryReadSchema.Type;

const QuestionLayerOverridesSchema = Schema.Struct({
  directories: Schema.optionalKey(
    Schema.HashMap(Schema.String, Schema.Array(Schema.String))
  ),
  sources: Schema.optionalKey(Schema.HashMap(Schema.String, Schema.String)),
});
/** Optional virtual question files layered over the real corpus test tree. */
export type QuestionLayerOverrides = typeof QuestionLayerOverridesSchema.Type;

/** Resolves the repository root, three folders above this test helper. */
export const corpusRoot = Effect.gen(function* () {
  const path = yield* Path.Path;
  return path.resolve(import.meta.dirname, "..", "..", "..");
});

/** Resolves the absolute folder of the physical question bank that the tests read. */
export const absoluteQuestionTestSourceRoot = Effect.gen(function* () {
  const path = yield* Path.Path;
  return path.resolve(yield* corpusRoot, questionTestSourceRoot);
});

/** The real question bank, read once for each test suite and shared by its tests. */
class RealQuestionCorpus extends Context.Service<
  RealQuestionCorpus,
  {
    /** Every entry of the physical question tree, sorted by code unit. */
    readonly entries: readonly string[];
    /** Every real item source keyed by absolute path, sorted by path. */
    readonly items: MutableHashMap.MutableHashMap<string, string>;
    /** Every real question prompt keyed by absolute path, sorted by path. */
    readonly prompts: MutableHashMap.MutableHashMap<string, string>;
    /** Every corpus TypeScript source and question prompt keyed by absolute path. */
    readonly sources: MutableHashMap.MutableHashMap<string, string>;
    /** The decoded real try-out registry. */
    readonly tryoutSources: Effect.Success<
      ReturnType<typeof decodeTryoutRegistry>
    >;
    /** The question-bank index of the decoded real try-out registry. */
    readonly banks: QuestionBankIndex;
  }
>()("@nakafa/aksara-corpus/test/question/RealQuestionCorpus") {}

/** Tells whether a path lies inside installed dependencies, whose symlinked folders a recursive read would follow. */
const isInstalledFile = (file: string) =>
  Arr.contains(file.split("/"), "node_modules");

/** Reads the corpus sources and the physical question tree, then decodes the real try-out registry. */
const loadRealQuestionCorpus = Effect.gen(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  /** Reads the text of each path, keeping the order of the paths. */
  const readTexts = (paths: readonly string[]) =>
    Effect.forEach(
      paths,
      (filePath) =>
        fileSystem
          .readFileString(filePath)
          .pipe(Effect.map((text) => [filePath, text] as const)),
      { concurrency: 16 }
    );
  const packageRoot = path.resolve(yield* corpusRoot, "packages/corpus");
  const questionRoot = yield* absoluteQuestionTestSourceRoot;
  const entries = Arr.sort(
    yield* fileSystem.readDirectory(questionRoot, { recursive: true }),
    Order.String
  );
  const sourcePaths = pipe(
    yield* fileSystem.readDirectory(packageRoot, { recursive: true }),
    Arr.filter((file) => file.endsWith(".ts") && !isInstalledFile(file)),
    Arr.map((file) => path.resolve(packageRoot, file)),
    Arr.sort(Order.String)
  );
  const promptPaths = pipe(
    entries,
    Arr.filter((entry) => QUESTION_PROMPT_PATTERN.test(path.basename(entry))),
    Arr.map((entry) => path.resolve(questionRoot, entry)),
    Arr.sort(Order.String)
  );
  const sourceTexts = yield* readTexts(sourcePaths);
  const promptTexts = yield* readTexts(promptPaths);
  const tryoutSources = yield* decodeTryoutRegistry();
  return {
    banks: yield* indexQuestionBanks(tryoutSources),
    entries,
    items: MutableHashMap.fromIterable(
      Arr.filter(sourceTexts, ([sourcePath]) => sourcePath.endsWith("/item.ts"))
    ),
    prompts: MutableHashMap.fromIterable(promptTexts),
    sources: MutableHashMap.fromIterable([...sourceTexts, ...promptTexts]),
    tryoutSources,
  };
});

/** Loads the real question bank once for the tests that share it, with the Node services they use. */
export const realQuestionCorpusLayer = Layer.effect(
  RealQuestionCorpus,
  loadRealQuestionCorpus
).pipe(Layer.provideMerge(NodeServices.layer));

/** Every entry of the physical question tree, sorted by code unit. */
export const realQuestionEntries = RealQuestionCorpus.pipe(
  Effect.map(({ entries }) => entries)
);
/** Every real item source keyed by absolute path, sorted by path. */
export const realQuestionItems = RealQuestionCorpus.pipe(
  Effect.map(({ items }) => items)
);
/** The decoded real try-out registry. */
export const realTryoutSources = RealQuestionCorpus.pipe(
  Effect.map(({ tryoutSources }) => tryoutSources)
);
/** The question-bank index of the decoded real try-out registry. */
export const realQuestionBanks = RealQuestionCorpus.pipe(
  Effect.map(({ banks }) => banks)
);

/** Discovers synthetic question sources through the controlled test layer over the real question banks. */
export const discoverSyntheticQuestionSources = Effect.fn(
  "AksaraCorpus.test.discoverSyntheticQuestionSources"
)(function* (
  directoryEntries: readonly string[],
  sourceFiles: Iterable<readonly [string, string]>,
  failDirectory = false
) {
  const root = yield* corpusRoot;
  const banks = yield* realQuestionBanks;
  return yield* Effect.provide(
    discoverQuestionSources(root, banks),
    makeQuestionSourceLayer(directoryEntries, sourceFiles, failDirectory)
  );
});

/** Flips one typed synthetic discovery failure into the success channel. */
export function rejectSyntheticQuestionSources(
  ...arguments_: Parameters<typeof discoverSyntheticQuestionSources>
) {
  return Effect.flip(discoverSyntheticQuestionSources(...arguments_));
}

export const validQuestionItemSource = `import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }, { isCorrect: false, label: "B" }] },
  },
};

export default item;`;
export const generalQuestionSourceFiles = questionSourceFiles({
  kind: "fixed",
  language: DeliveryLanguageSchema.make("id"),
});
export const invalidQuestionItemSources = [
  "export default item;",
  "const item = { broken: };",
  `const item = {
    responses: {
      en: { kind: "single-choice", options: [{ isCorrect: false, label: "A" }] },
      id: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }] },
    },
  };`,
];
export const questionRendererCounts = [
  { count: 300, rendererDomain: "snbt-general" },
  { count: 200, rendererDomain: "snbt-math" },
  { count: 1075, rendererDomain: "snbt-plain" },
  { count: 200, rendererDomain: "snbt-quant" },
  { count: 75, rendererDomain: "tka-math" },
];

/** Creates recursive directory output for one synthetic question directory. */
export function questionEntries(root: string, files: readonly string[]) {
  return [root, ...Arr.map(files, (file) => `${root}/${file}`)];
}

/** Maps a physical synthetic question root to its absolute item source. */
export const itemForQuestion = Effect.fn("AksaraCorpus.test.itemForQuestion")(
  function* (root: string, source = validQuestionItemSource) {
    const path = yield* Path.Path;
    const questionRoot = yield* absoluteQuestionTestSourceRoot;
    return [[path.resolve(questionRoot, root, "item.ts"), source]] as const;
  }
);

/** Creates a deterministic synthetic question filesystem for source tests. */
export function makeQuestionSourceLayer(
  directoryEntries: readonly string[],
  sourceFiles: Iterable<readonly [string, string]>,
  failDirectory = false
) {
  const files = HashMap.fromIterable(sourceFiles);
  return FileSystem.layerNoop({
    readDirectory: (path) => {
      if (failDirectory) {
        return Effect.fail(missing("readDirectory", path));
      }
      return Effect.succeed([...directoryEntries]);
    },
    readFileString: (path) => {
      const source = Option.getOrUndefined(HashMap.get(files, path));
      if (source === undefined) {
        return Effect.fail(missing("readFileString", path));
      }
      return Effect.succeed(source);
    },
  });
}

/** Serves synthetic discovery beside the real prompts a whole-bank load reads. */
export function makeQuestionRegistryLayer(
  directoryEntries: readonly string[],
  sourceFiles: Iterable<readonly [string, string]>
) {
  return Layer.unwrap(
    Effect.map(RealQuestionCorpus, ({ prompts }) =>
      Layer.merge(
        makeQuestionSourceLayer(directoryEntries, [...prompts, ...sourceFiles]),
        Path.layer
      )
    )
  );
}

/** Creates a path-faithful question filesystem over the real corpus with optional read evidence. */
export function makeQuestionLayer(
  directoryReads: MutableList.MutableList<QuestionDirectoryRead> = MutableList.make(),
  overrides: QuestionLayerOverrides = {}
) {
  return Layer.unwrap(
    Effect.gen(function* () {
      const realFileSystem = yield* FileSystem.FileSystem;
      const corpus = yield* RealQuestionCorpus;
      const questionRoot = yield* absoluteQuestionTestSourceRoot;
      return FileSystem.layerNoop({
        readDirectory: (path, options) => {
          const recursive = options?.recursive === true;
          MutableList.append(directoryReads, { path, recursive });
          const directory = Option.getOrUndefined(
            HashMap.get(overrides.directories ?? HashMap.empty(), path)
          );
          if (directory !== undefined) {
            return Effect.succeed([...directory]);
          }
          if (path === questionRoot && recursive) {
            return Effect.succeed([...corpus.entries]);
          }
          if (
            path.startsWith(`${questionRoot}/`) &&
            !recursive &&
            QUESTION_DIRECTORY_PATTERN.test(path)
          ) {
            return realFileSystem
              .readDirectory(path)
              .pipe(Effect.map((names) => Arr.sort(names, Order.String)));
          }
          return Effect.fail(missing("readDirectory", path));
        },
        readFileString: (path) => {
          const source =
            Option.getOrUndefined(
              HashMap.get(overrides.sources ?? HashMap.empty(), path)
            ) ??
            Option.getOrUndefined(MutableHashMap.get(corpus.sources, path));
          if (source !== undefined) {
            return Effect.succeed(source);
          }
          return Effect.fail(missing("readFileString", path));
        },
      });
    })
  );
}

/** Creates one stable missing-path error for the controlled filesystem. */
function missing(method: "readDirectory" | "readFileString", path: string) {
  return PlatformError.systemError({
    _tag: "NotFound",
    method,
    module: "FileSystem",
    pathOrDescriptor: path,
  });
}

export const questionLayer = Layer.merge(makeQuestionLayer(), Path.layer);

/** Serves the real question tree through the controlled filesystem, with the real corpus it reads provided once. */
export const questionTestLayer = Layer.provide(
  Layer.merge(makeQuestionLayer(), Path.layer),
  realQuestionCorpusLayer
);
