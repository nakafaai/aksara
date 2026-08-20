import {
  Cause,
  Effect,
  Function as EffectFunction,
  Order,
  Pull,
  Stream,
  Tuple,
} from "effect";

type Keyed<Value> = readonly [key: string, value: Value];

interface MergeState<Left, Right> {
  readonly left: Keyed<Left> | undefined;
  readonly leftDone: boolean;
  readonly right: Keyed<Right> | undefined;
  readonly rightDone: boolean;
}

interface Pulled<Value> {
  readonly done: boolean;
  readonly value: Value | undefined;
}

interface SortedCatalogMerge<Left, Right, Output> {
  /** Merges rows that share one canonical key. */
  readonly onBoth: (left: Left, right: Right) => Output;
  /** Projects one row found only in the left stream. */
  readonly onLeft: (left: Left) => Output;
  /** Projects one row found only in the right stream. */
  readonly onRight: (right: Right) => Output;
  readonly right: Stream.Stream<Keyed<Right>, unknown, unknown>;
}

/** Reads one stream value while preserving normal completion and typed failure. */
function pullValue<Value, Error>(pull: Pull.Pull<Value, Error, void>) {
  return Pull.matchEffect(pull, {
    onDone: () =>
      Effect.succeed<Pulled<Value>>({ done: true, value: undefined }),
    onFailure: Effect.failCause,
    onSuccess: (value) => Effect.succeed<Pulled<Value>>({ done: false, value }),
  });
}

/** Reuses one buffered value or pulls the next value from its input stream. */
function pullStateValue<Value, Error>(
  value: Value | undefined,
  done: boolean,
  pull: Pull.Pull<Value, Error, void>
) {
  if (value !== undefined || done) {
    return Effect.succeed<Pulled<Value>>({ done, value });
  }
  return pullValue(pull);
}

/** Selects the next sorted output and the exact input values to retain. */
function nextMergeStep<Left, Right, Output>(
  leftResult: Pulled<Keyed<Left>>,
  rightResult: Pulled<Keyed<Right>>,
  options: Omit<SortedCatalogMerge<Left, Right, Output>, "right">
) {
  const leftValue = leftResult.value;
  const rightValue = rightResult.value;
  if (leftValue === undefined) {
    if (rightValue === undefined) {
      return Cause.done();
    }
    return Effect.succeed(
      Tuple.make(options.onRight(rightValue[1]), {
        left: undefined,
        leftDone: leftResult.done,
        right: undefined,
        rightDone: rightResult.done,
      })
    );
  }
  if (rightValue === undefined) {
    return Effect.succeed(
      Tuple.make(options.onLeft(leftValue[1]), {
        left: undefined,
        leftDone: leftResult.done,
        right: undefined,
        rightDone: rightResult.done,
      })
    );
  }

  const ordering = Order.String(leftValue[0], rightValue[0]);
  if (ordering < 0) {
    return Effect.succeed(
      Tuple.make(options.onLeft(leftValue[1]), {
        left: undefined,
        leftDone: leftResult.done,
        right: rightValue,
        rightDone: rightResult.done,
      })
    );
  }
  if (ordering > 0) {
    return Effect.succeed(
      Tuple.make(options.onRight(rightValue[1]), {
        left: leftValue,
        leftDone: leftResult.done,
        right: undefined,
        rightDone: rightResult.done,
      })
    );
  }
  return Effect.succeed(
    Tuple.make(options.onBoth(leftValue[1], rightValue[1]), {
      left: undefined,
      leftDone: leftResult.done,
      right: undefined,
      rightDone: rightResult.done,
    })
  );
}

/** Merges two sorted catalog streams without buffering either complete input. */
export function mergeSortedCatalogStreams<
  Left,
  LeftError,
  LeftServices,
  Right,
  RightError,
  RightServices,
  Output,
>(
  left: Stream.Stream<Keyed<Left>, LeftError, LeftServices>,
  options: Omit<SortedCatalogMerge<Left, Right, Output>, "right"> & {
    readonly right: Stream.Stream<Keyed<Right>, RightError, RightServices>;
  }
): Stream.Stream<Output, LeftError | RightError, LeftServices | RightServices> {
  const merged = Stream.combine(
    left,
    options.right,
    (): MergeState<Left, Right> => ({
      left: undefined,
      leftDone: false,
      right: undefined,
      rightDone: false,
    }),
    (state, pullLeft, pullRight) =>
      Effect.gen(function* () {
        const leftResult = yield* pullStateValue(
          state.left,
          state.leftDone,
          pullLeft
        );
        const rightResult = yield* pullStateValue(
          state.right,
          state.rightDone,
          pullRight
        );
        return yield* nextMergeStep(leftResult, rightResult, options);
      })
  );

  return merged.pipe(
    Stream.catchIf(Cause.isDone, EffectFunction.constant(Stream.empty))
  );
}
