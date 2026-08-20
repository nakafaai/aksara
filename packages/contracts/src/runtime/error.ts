import { Schema } from "effect";

/** A decoded runtime response does not belong to its initiating request. */
export class ContentRuntimeMismatchError extends Schema.TaggedError<ContentRuntimeMismatchError>()(
  "ContentRuntimeMismatchError",
  {
    reason: Schema.Literals([
      "activeManifestHash",
      "activeReleaseId",
      "artifactHash",
      "contentKey",
      "delivery",
      "locale",
      "projectionHash",
      "publicPath",
      "rendererManifest",
      "selectorCount",
      "snapshotId",
      "snapshotManifestHash",
      "snapshotReleaseId",
      "sourcePath",
    ]),
  }
) {}
