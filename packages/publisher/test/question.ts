import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeQuestionRegistry } from "@nakafa/aksara-corpus/question-bank/registry";
import { Effect, Stream } from "effect";
import { prepareQuestionPublication } from "#publisher/question/publication";
import { testFileLayer } from "#test/files";

export const checkoutRoot = resolve(process.cwd(), "..", "..");
const questionKey =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const completeRegistry = await Effect.runPromise(
  decodeQuestionRegistry(checkoutRoot).pipe(Effect.provide(NodeContext.layer))
);
export const questionEntries = completeRegistry.filter(
  (entry) => entry.questionKey === questionKey
);
const [firstEntry] = questionEntries;
if (firstEntry === undefined) {
  throw new Error("Expected the real question-bank slice.");
}
const choicePath = `${firstEntry.sourcePath.slice(
  0,
  firstEntry.sourcePath.lastIndexOf("/")
)}/choices.ts`;
export const questionPaths = [
  ...questionEntries.map(({ sourcePath }) => sourcePath),
  choicePath,
];
export const sourceByPath = new Map(
  questionPaths.map((sourcePath) => {
    const absolutePath = resolve(checkoutRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);

const baseComponents = ["InlineMath"].map((name) => ({ name, version: 1 }));
export const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: baseComponents,
      supportedComponents: baseComponents,
    },
    domains: rendererDomains({}),
  })
);

/** Collects question transitions through exact registry and platform layers. */
export function collectQuestionPublication(input: {
  readonly heads: readonly QuestionHead[];
  readonly renderer?: unknown;
  readonly sources?: ReadonlyMap<string, string>;
}) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareQuestionPublication({
          checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? rendererManifest,
        });
        return yield* publication.records().pipe(
          Stream.runCollect,
          Effect.map((records) => [...records])
        );
      })
    ).pipe(
      Effect.provide(testFileLayer(input.sources ?? sourceByPath)),
      Effect.provide(Path.layer)
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
        return yield* publication.routes().pipe(
          Stream.runCollect,
          Effect.map((routes) => [...routes])
        );
      })
    ).pipe(
      Effect.provide(testFileLayer(sourceByPath)),
      Effect.provide(Path.layer)
    )
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
      Effect.provide(testFileLayer(sourceByPath)),
      Effect.provide(Path.layer),
      Effect.flip
    )
  );
}

/** Derives authoritative compact heads from the selected real question pair. */
export async function publishedQuestionHeads() {
  const records = await collectQuestionPublication({ heads: [] });
  return records.flatMap(({ record }) => {
    if (!("payload" in record)) {
      return [];
    }
    return [
      QuestionHeadSchema.make({
        artifactHash: record.change.artifactHash,
        compilerConfigHash: record.payload.compilerConfigHash,
        contentKey: record.change.contentKey,
        delivery: record.change.delivery,
        family: "question",
        locale: record.change.locale,
        projectionHash: hashContentProjection(record.projection),
        rendererDomain: record.change.rendererDomain,
        sourceHash: record.payload.sourceHash,
        sourcePath: record.change.sourcePath,
      }),
    ];
  });
}
