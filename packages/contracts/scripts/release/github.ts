import { Effect, Schema } from "effect";
import { releaseError } from "#scripts/release/identity";

const ReleaseSchema = Schema.fromJsonString(
  Schema.Struct({
    assets: Schema.Array(
      Schema.Struct({
        digest: Schema.String,
        name: Schema.String,
        size: Schema.Finite,
      })
    ),
    draft: Schema.Boolean,
    immutable: Schema.Boolean,
    prerelease: Schema.Boolean,
    tag_name: Schema.String,
    target_commitish: Schema.String,
  })
);

const TagSchema = Schema.fromJsonString(
  Schema.Struct({
    object: Schema.Struct({
      sha: Schema.String,
      type: Schema.String,
    }),
  })
);

/** Decodes the immutable release metadata returned by GitHub. */
export function decodeRelease(source: string) {
  return Schema.decodeEffect(ReleaseSchema)(source, {
    onExcessProperty: "ignore",
  }).pipe(
    Effect.mapError(() =>
      releaseError("release", "GitHub returned malformed release metadata")
    )
  );
}

/** Decodes the exact lightweight tag target returned by GitHub. */
export function decodeTag(source: string) {
  return Schema.decodeEffect(TagSchema)(source, {
    onExcessProperty: "ignore",
  }).pipe(
    Effect.mapError(() =>
      releaseError("release", "GitHub returned malformed tag metadata")
    )
  );
}
