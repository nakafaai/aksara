import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import {
  type ContentHead,
  ContentHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Effect, Option, Schema, Stream, Tuple } from "effect";

const HeadOrderStateSchema = Schema.Struct({
  previous: Schema.UndefinedOr(ContentHeadSchema),
});

/** The previous head in the streamed order, or undefined before the first one. */
export type HeadOrderState = typeof HeadOrderStateSchema.Type;

/** One stream's constructors for a repeated head and a head out of order. */
interface HeadSequenceFailures<Head extends ContentHead, Duplicate, Order> {
  /** Builds the error for a head that repeats the previous identity. */
  readonly duplicate: (head: Head) => Duplicate;
  /** Builds the error for a head outside canonical content-head order. */
  readonly order: (head: Head) => Order;
}

/** One family's constructors for the three failures a published head can raise. */
interface HeadOrderFailures<
  Head extends ContentHead,
  Field extends string,
  Family,
  Duplicate,
  Order,
> extends HeadSequenceFailures<Head, Duplicate, Order> {
  /** Builds the family's error for one field that the head does not own. */
  readonly family: (head: Head, field: Field) => Family;
}

/**
 * Proves one head follows the previous head in canonical order, then advances
 * the stream state to this head.
 */
export function advanceHeadOrder<Head extends ContentHead, Duplicate, Order>(
  state: HeadOrderState,
  head: Head,
  failures: HeadSequenceFailures<Head, Duplicate, Order>
): Effect.Effect<
  readonly [HeadOrderState, readonly Head[]],
  Duplicate | Order
> {
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
 * Proves one published head is owned by its family, then proves its place in
 * canonical order with {@link advanceHeadOrder}.
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
  return advanceHeadOrder(state, head, failures);
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

/** Extends a finite stream with explicit absence for a constant-space full zip. */
export function withTrailingAbsence<A, E, R>(stream: Stream.Stream<A, E, R>) {
  return stream.pipe(
    Stream.map(Option.some),
    Stream.concat(Stream.fromEffectRepeat(Effect.succeed(Option.none<A>())))
  );
}
