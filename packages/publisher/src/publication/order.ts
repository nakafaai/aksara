import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import {
  type ContentHead,
  ContentHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Effect, Schema, Stream, Tuple } from "effect";

const HeadOrderStateSchema = Schema.Struct({
  previous: Schema.UndefinedOr(ContentHeadSchema),
});

/** The previous head in the streamed order, or undefined before the first one. */
export type HeadOrderState = typeof HeadOrderStateSchema.Type;

/** One family's constructors for the three failures a published head can raise. */
export interface HeadOrderFailures<
  Head extends ContentHead,
  Field extends string,
  Family,
  Duplicate,
  Order,
> {
  /** Builds the family's error for a head that repeats the previous identity. */
  readonly duplicate: (head: Head) => Duplicate;
  /** Builds the family's error for one field that the head does not own. */
  readonly family: (head: Head, field: Field) => Family;
  /** Builds the family's error for a head outside canonical content-head order. */
  readonly order: (head: Head) => Order;
}

/**
 * Proves one published head is owned by its family and follows the previous
 * head in canonical order, then advances the stream state to this head.
 */
export function validateHeadOrder<
  Head extends ContentHead,
  Field extends string,
  Family,
  Duplicate,
  Order,
>(
  state: HeadOrderState,
  head: Head,
  ownership: (head: Head) => Field | undefined,
  failures: HeadOrderFailures<Head, Field, Family, Duplicate, Order>
): Effect.Effect<
  readonly [HeadOrderState, readonly Head[]],
  Duplicate | Family | Order
> {
  const field = ownership(head);
  if (field !== undefined) {
    return Effect.fail(failures.family(head, field));
  }
  const { previous } = state;
  if (previous !== undefined) {
    const comparison = compareContentHeads(previous, head);
    if (comparison === 0) {
      return Effect.fail(failures.duplicate(head));
    }
    if (comparison > 0) {
      return Effect.fail(failures.order(head));
    }
  }
  return Effect.succeed(Tuple.make({ previous: head }, [head]));
}

/**
 * Validates every published head of one family before the constant-space merge,
 * carrying the previous head through the stream.
 */
export function orderPublishedHeads<Head extends ContentHead, E, R, Failure>(
  published: Stream.Stream<Head, E, R>,
  validate: (
    state: HeadOrderState,
    head: Head
  ) => Effect.Effect<readonly [HeadOrderState, readonly Head[]], Failure>
) {
  const initial: HeadOrderState = { previous: undefined };
  return published.pipe(Stream.mapAccumEffect(() => initial, validate));
}
