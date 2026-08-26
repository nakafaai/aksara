import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseItem } from "@nakafa/aksara-contracts/release";
import { DEVELOPER_PAGE_KEY } from "@nakafa/aksara-corpus/pages/source";
import { Effect, Stream } from "effect";

const DEVELOPER_CONTENT_KEY = ContentKeySchema.make(
  `pages/${DEVELOPER_PAGE_KEY}`
);

/** Detects whether one authenticated publication upserts developer MDX. */
export const activatesDeveloperPage = Effect.fn(
  "AksaraCli.activatesDeveloperPage"
)(function* <E, R>(items: Stream.Stream<ContentReleaseItem, E, R>) {
  return yield* items.pipe(
    Stream.runFold(
      () => false,
      (activates, { change }) =>
        activates ||
        (change.operation === "upsert" &&
          change.contentKey === DEVELOPER_CONTENT_KEY)
    )
  );
});
