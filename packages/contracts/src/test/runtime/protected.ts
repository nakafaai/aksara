import { Effect } from "effect";
import { ContentKeySchema, CorpusSourcePathSchema } from "#contracts/ids";
import { verifyProtectedContentRuntimeExchange } from "#contracts/runtime/protected/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { rendererManifest } from "#contracts/test/request";
import {
  createSignedArtifact,
  protectedSnapshotId,
  runtimeBundle,
  trustedResolver,
} from "#contracts/test/runtime/fixture";

const protectedQuestionKey =
  "question-bank/tryout/test/runtime/protected/set-1/question-1";
export const protectedContentKey = ContentKeySchema.make(
  `${protectedQuestionKey}/question`
);
export const protectedArtifact = createSignedArtifact(protectedContentKey);
export const protectedAnswerContentKey = ContentKeySchema.make(
  `${protectedQuestionKey}/answer`
);
export const protectedAnswerArtifact = createSignedArtifact(
  protectedAnswerContentKey
);
export const protectedExpandedArtifact = createSignedArtifact(
  protectedContentKey,
  [{ name: "InlineMath", version: 1 }]
);
export const protectedSelector = {
  artifactHash: protectedArtifact.artifactHash,
  contentKey: protectedContentKey,
  delivery: "authenticated",
} as const;
export const protectedAnswerSelector = {
  artifactHash: protectedAnswerArtifact.artifactHash,
  contentKey: protectedAnswerContentKey,
  delivery: "entitled",
} as const;
export const protectedRequest = {
  bundleHash: runtimeBundle.bundleHash,
  selectors: [protectedSelector],
  snapshotId: protectedSnapshotId,
} as const;
export const protectedAnswerRequest = {
  ...protectedRequest,
  selectors: [protectedAnswerSelector],
} as const;
export const protectedFound = {
  bundle: runtimeBundle,
  items: [
    {
      artifact: protectedArtifact,
      delivery: "authenticated",
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/${protectedQuestionKey}/question.en.mdx`
      ),
    },
  ],
  kind: "found",
  rendererManifest,
} as const;

/** Builds one protected runtime exchange with the fixture verification key. */
function exchangeProgram(input: {
  readonly rendererManifest?: unknown;
  readonly request?: unknown;
  readonly response: unknown;
}) {
  return verifyProtectedContentRuntimeExchange({
    rendererManifest: input.rendererManifest ?? rendererManifest,
    request: input.request ?? protectedRequest,
    response: input.response,
  }).pipe(
    Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
  );
}

/** Runs one protected batch expected to authenticate successfully. */
export function verifyProtectedExchange(
  input: Parameters<typeof exchangeProgram>[0]
) {
  return Effect.runPromise(exchangeProgram(input));
}

/** Runs one protected batch while preserving typed success and failure values. */
export function verifyProtectedExchangeResult(
  input: Parameters<typeof exchangeProgram>[0]
) {
  return Effect.runPromise(exchangeProgram(input).pipe(Effect.result));
}

/** Runs one protected batch expected to return a typed verification failure. */
export function rejectProtectedExchange(
  input: Parameters<typeof exchangeProgram>[0]
) {
  return Effect.runPromise(exchangeProgram(input).pipe(Effect.flip));
}
