import { ArticleHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Schema } from "effect";

const HeadOrderStateSchema = Schema.Struct({
  previous: Schema.UndefinedOr(ArticleHeadSchema),
});

/** The previous article head in the streamed order, or undefined before the first one. */
export type HeadOrderState = typeof HeadOrderStateSchema.Type;

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
