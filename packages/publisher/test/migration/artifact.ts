import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";

import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { TryoutHistoryMigrationValueSchema } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Schema } from "effect";

import { transportSignature } from "#test/content";

const questionRoot =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const compiledCode = "return { default: () => null };";
export const answerArtifactHash = Sha256HashSchema.make(
  `sha256:${"a".repeat(64)}`
);
export const questionArtifactHash = Sha256HashSchema.make(
  `sha256:${"b".repeat(64)}`
);

/** Computes one test-only plain SHA-256 source identity. */
function sourceHash(rawMdx: string) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`
  );
}

/** Builds one structurally valid retained artifact for publisher boundaries. */
function artifact(
  role: "answer" | "question",
  artifactHash: typeof Sha256HashSchema.Type
) {
  const rawMdx = `export const metadata = { date: "2026-01-01" }\n\n## Retained ${role}`;
  return {
    artifactHash,
    keyId: "retained-migration-key",
    payload: {
      byteLength: Buffer.byteLength(compiledCode, "utf8"),
      compiledCode,
      compilerConfigHash: `sha256:${"1".repeat(64)}`,
      compilerVersion: "0.1.0",
      contentKey: `${questionRoot}/${role}`,
      format: "mdx-function-body-v1",
      locale: "en",
      mdxCompilerVersion: "3.1.1",
      plainText: `Retained ${role}`,
      rawMdx,
      rendererDomain: "snbt-general",
      requiredComponents: [{ name: "BlockMath", version: 1 }],
      sourceHash: sourceHash(rawMdx),
    },
    signature: transportSignature,
  };
}

const value = Schema.decodeUnknownSync(TryoutHistoryMigrationValueSchema)({
  artifacts: [
    artifact("answer", answerArtifactHash),
    artifact("question", questionArtifactHash),
  ],
  command: "artifactBatch",
  migrationId: "retained-tryout-history-v1",
});

/** Ordered retained artifact fixtures used by migration target responses. */
export const historicalArtifacts =
  value.command === "artifactBatch" ? value.artifacts : [];

/** Looks up one retained artifact by its immutable source hash. */
export function historicalArtifact(artifactHash: string) {
  return historicalArtifacts.find(
    (artifactValue) => artifactValue.artifactHash === artifactHash
  );
}

/** Replaces the answer source while retaining a self-consistent source hash. */
export function replaceAnswerSource(rawMdx: string) {
  return historicalArtifacts.map((retained) =>
    retained.artifactHash === answerArtifactHash
      ? {
          ...retained,
          payload: {
            ...retained.payload,
            rawMdx,
            sourceHash: sourceHash(rawMdx),
          },
        }
      : retained
  );
}
