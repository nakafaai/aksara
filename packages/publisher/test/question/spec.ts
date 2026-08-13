import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { loadQuestionContent } from "@nakafa/aksara-corpus/question-bank/content";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import { Effect, Stream } from "effect";
import { prepareQuestionPublication } from "#publisher/question/publication";
import { testFileLayer } from "#test/files";
import { testRendererDomains } from "#test/renderer";

export const checkoutRoot = resolve(process.cwd(), "..", "..");
const questionKey =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const tryoutSources = await Effect.runPromise(decodeTryoutRegistry());
const completeContent = await Effect.runPromise(
  loadQuestionContent(checkoutRoot, tryoutSources).pipe(
    Effect.provide(NodeContext.layer)
  )
);
export const questionEntries = completeContent.entries.filter(
  (entry) => entry.questionKey === questionKey
);
export const questionSources = completeContent.sources.filter(
  (source) => source.questionKey === questionKey
);
const [firstEntry] = questionEntries;
const [firstSource] = questionSources;
if (!(firstEntry && firstSource)) {
  throw new Error("Expected the real question-bank source and body slice.");
}
export const questionChoices = firstSource.choices;
const choicePath = `${firstEntry.sourceRoot}/choices.ts`;
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
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
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
        return yield* publication.routes().pipe(
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
  return records.flatMap(({ record }) => {
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
