import { NodeServices } from "@effect/platform-node";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { loadQuestionContent } from "@nakafa/aksara-corpus/question-bank/content";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import {
  Array as Arr,
  Effect,
  FileSystem,
  MutableHashMap,
  Path,
  Stream,
} from "effect";
import { prepareQuestionPublication } from "#publisher/question/publication";
import { testFileLayer } from "#test/files";
import { testRendererDomains } from "#test/renderer";

export const checkoutRoot = await Effect.runPromise(
  Effect.map(Path.Path, (path) => path.resolve(process.cwd(), "..", "..")).pipe(
    Effect.provide(NodeServices.layer)
  )
);
const questionKey =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const tryoutSources = await Effect.runPromise(decodeTryoutRegistry());
const completeContent = await Effect.runPromise(
  loadQuestionContent(checkoutRoot, tryoutSources).pipe(
    Effect.provide(NodeServices.layer)
  )
);
export const questionEntries = Arr.filter(
  completeContent.entries,
  (entry) => entry.questionKey === questionKey
);
export const questionSources = Arr.filter(
  completeContent.sources,
  (source) => source.questionKey === questionKey
);
const [firstEntry] = questionEntries;
const [firstSource] = questionSources;
if (!(firstEntry && firstSource)) {
  throw new Error("Expected the real question-bank source and body slice.");
}
export const questionItem = firstSource.item;
export const questionPaths = Arr.map(
  firstSource.files,
  (file) => `${firstSource.sourceRoot}/${file}`
);
export const sourceByPath = MutableHashMap.fromIterable(
  await Effect.runPromise(
    Effect.forEach(questionPaths, (sourcePath) =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const fileSystem = yield* FileSystem.FileSystem;
        const absolutePath = path.resolve(checkoutRoot, sourcePath);
        const text = yield* fileSystem.readFileString(absolutePath);
        return [absolutePath, text] as const;
      })
    ).pipe(Effect.provide(NodeServices.layer))
  )
);

const baseComponents = ["InlineMath"];
export const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: baseComponents,
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
  })
);

/** Collects question transitions through exact registry and platform layers. */
export function collectQuestionPublication(input: {
  readonly heads: readonly QuestionHead[];
  readonly renderer?: unknown;
  readonly sources?: Iterable<readonly [string, string]>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareQuestionPublication({
          checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? rendererManifest,
        });
        return yield* publication.records.pipe(
          Stream.runCollect,
          Effect.map((records) => [...records])
        );
      })
    ).pipe(
      Effect.provide([testFileLayer(input.sources ?? sourceByPath), Path.layer])
    )
  );
}

/** Collects route-free transitions from one real question plan. */
export function collectQuestionRoutes(heads: readonly QuestionHead[]) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareQuestionPublication({
          checkoutRoot,
          published: Stream.fromIterable(heads),
          rendererManifest,
        });
        return yield* publication.routes.pipe(
          Stream.runCollect,
          Effect.map((routes) => [...routes])
        );
      })
    ).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]))
  );
}

/** Returns one authoritative question planning failure without FiberFailure. */
export function rejectQuestionPublication(heads: readonly QuestionHead[]) {
  return Effect.runPromise(
    Effect.scoped(
      prepareQuestionPublication({
        checkoutRoot,
        published: Stream.fromIterable(heads),
        rendererManifest,
      })
    ).pipe(
      Effect.provide([testFileLayer(sourceByPath), Path.layer]),
      Effect.flip
    )
  );
}

/** Derives authoritative compact heads from the selected real question pair. */
export async function publishedQuestionHeads() {
  const records = await collectQuestionPublication({ heads: [] });
  return Arr.flatMap(records, ({ record }) => {
    if (!("payload" in record)) {
      return [];
    }
    return [
      QuestionHeadSchema.make({
        artifactHash: record.change.artifactHash,
        artifactLocale: record.change.artifactLocale,
        compilerConfigHash: record.payload.compilerConfigHash,
        contentKey: record.change.contentKey,
        delivery: record.change.delivery,
        family: "question",
        projectionHash: hashContentProjection(record.projection),
        rendererDomain: record.change.rendererDomain,
        sourceHash: record.payload.sourceHash,
        sourcePath: record.change.sourcePath,
      }),
    ];
  });
}
