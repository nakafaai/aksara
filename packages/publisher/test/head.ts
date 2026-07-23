import {
  type PublicationHeadPageRequest,
  PublicationHeadPageRequestSchema,
} from "@nakafa/aksara-contracts/transport/request";
import { PublicationHeadPageSuccessSchema } from "@nakafa/aksara-contracts/transport/response";
import { Schema } from "effect";

const artifactHash = `sha256:${"a".repeat(64)}`;
const activeManifestHash = `sha256:${"b".repeat(64)}`;
const projectionHash = `sha256:${"c".repeat(64)}`;

/** Canonical material-head request shared by target transport tests. */
export const headRequest = Schema.decodeUnknownSync(
  PublicationHeadPageRequestSchema
)({
  activeManifestHash,
  activeReleaseId: "test-http-release",
  cursor: null,
  family: "material",
  limit: 500,
  operation: "headPage",
});

/** Builds exact authoritative head evidence for one page request. */
export function headSuccess(request: PublicationHeadPageRequest) {
  return Schema.decodeUnknownSync(PublicationHeadPageSuccessSchema)({
    ok: true,
    operation: request.operation,
    value: {
      activeManifestHash: request.activeManifestHash,
      activeReleaseId: request.activeReleaseId,
      cursor: request.cursor,
      done: true,
      family: request.family,
      heads: [
        {
          artifactHash,
          compilerConfigHash: artifactHash,
          contentKey: "test:http",
          delivery: "public",
          family: "material",
          locale: "en",
          projectionHash,
          publicPath: "subjects/test/http",
          rendererDomain: "mathematics",
          sourceHash: artifactHash,
          sourcePath: "packages/corpus/test/http/en.mdx",
        },
      ],
      nextCursor: null,
    },
  });
}
