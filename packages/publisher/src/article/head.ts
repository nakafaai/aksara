import { Schema } from "effect";

const ArticleHeadOwnerSchema = Schema.Struct({
  publicPath: Schema.String,
});

export type ArticleHeadOwner = typeof ArticleHeadOwnerSchema.Type;

/** Builds the stable key shared by one registry entry and published head. */
export function headOwnerKey(input: {
  readonly artifactLocale: string;
  readonly contentKey: string;
}) {
  return `${input.artifactLocale}\0${input.contentKey}`;
}
