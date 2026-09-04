import { BigDecimal, Array as EffectArray } from "effect";

import {
  compareRatios,
  type ExactRatio,
  makeRatio,
} from "#contracts/math/rational";

/** One exact rational coordinate participating in a proximity comparison. */
export interface ExactProximityEntry {
  readonly error?: BigDecimal.BigDecimal;
  readonly value: ExactRatio;
}

interface ExactInterval {
  readonly lower: ExactRatio;
  readonly upper: ExactRatio;
}

interface RankedRatios {
  readonly ranks: readonly number[];
  readonly values: readonly ExactRatio[];
}

interface RatioTree {
  readonly base: number;
  readonly values: (ExactRatio | undefined)[];
}

type RatioSelector = (
  left: ExactRatio | undefined,
  right: ExactRatio | undefined
) => ExactRatio | undefined;

const ZERO = BigDecimal.fromBigInt(0n);

/** Translates one rational coordinate by an exact decimal measurement. */
function translate(
  value: ExactRatio,
  offset: BigDecimal.BigDecimal,
  direction: -1 | 1
) {
  const scaledOffset = BigDecimal.multiply(offset, value.denominator);
  return makeRatio(
    direction === -1
      ? BigDecimal.subtract(value.numerator, scaledOffset)
      : BigDecimal.sum(value.numerator, scaledOffset),
    value.denominator
  );
}

/** Returns the first sorted ratio at or after one exact boundary. */
function firstRank(
  values: readonly ExactRatio[],
  target: ExactRatio,
  afterEqual: boolean
) {
  let start = 0;
  let end = values.length;
  while (start < end) {
    const middle = Math.floor((start + end) / 2);
    const order = compareRatios(EffectArray.getUnsafe(values, middle), target);
    if (order < 0 || (afterEqual && order === 0)) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}

/** Assigns a stable exact rank to every source-ordered ratio. */
function rankRatios(values: readonly ExactRatio[]): RankedRatios {
  const ordered = values
    .map((value, sourceIndex) => ({ sourceIndex, value }))
    .sort((left, right) => compareRatios(left.value, right.value));
  const distinct: ExactRatio[] = [];
  const ranks = new Array<number>(values.length);
  for (const entry of ordered) {
    const previous = distinct.at(-1);
    if (previous && compareRatios(previous, entry.value) === 0) {
      ranks[entry.sourceIndex] = distinct.length - 1;
      continue;
    }
    ranks[entry.sourceIndex] = distinct.length;
    distinct.push(entry.value);
  }
  return { ranks, values: distinct };
}

/** Builds an empty segment tree over exact ratio ranks. */
function makeTree(size: number): RatioTree {
  let base = 1;
  while (base < size) {
    base *= 2;
  }
  return { base, values: new Array<ExactRatio | undefined>(base * 2) };
}

/** Selects the greater defined exact ratio. */
function greaterRatio(
  left: ExactRatio | undefined,
  right: ExactRatio | undefined
) {
  if (left === undefined) {
    return right;
  }
  if (right === undefined) {
    return left;
  }
  return compareRatios(left, right) < 0 ? right : left;
}

/** Selects the lesser defined exact ratio. */
function lesserRatio(
  left: ExactRatio | undefined,
  right: ExactRatio | undefined
) {
  if (left === undefined) {
    return right;
  }
  if (right === undefined) {
    return left;
  }
  return compareRatios(left, right) > 0 ? right : left;
}

/** Inserts one exact ratio at its compressed rank. */
function updateTree(
  tree: RatioTree,
  rank: number,
  value: ExactRatio,
  select: RatioSelector
) {
  const { values } = tree;
  let cursor = tree.base + rank;
  values[cursor] = select(values[cursor], value);
  while (cursor > 1) {
    cursor = Math.floor(cursor / 2);
    values[cursor] = select(
      EffectArray.getUnsafe(values, cursor * 2),
      EffectArray.getUnsafe(values, cursor * 2 + 1)
    );
  }
}

/** Selects one exact ratio across a half-open compressed-rank interval. */
function queryTree(
  tree: RatioTree,
  start: number,
  end: number,
  select: RatioSelector
) {
  let left = start + tree.base;
  let right = end + tree.base;
  let selected: ExactRatio | undefined;
  while (left < right) {
    if (left % 2 === 1) {
      selected = select(selected, EffectArray.getUnsafe(tree.values, left));
      left += 1;
    }
    if (right % 2 === 1) {
      right -= 1;
      selected = select(selected, EffectArray.getUnsafe(tree.values, right));
    }
    left = Math.floor(left / 2);
    right = Math.floor(right / 2);
  }
  return selected;
}

/** Expands one exact estimate into its explicit symmetric error interval. */
function exactInterval(entry: ExactProximityEntry): ExactInterval {
  const error = entry.error ?? ZERO;
  return {
    lower: translate(entry.value, error, -1),
    upper: translate(entry.value, error, 1),
  };
}

/**
 * Finds later-authored coordinates whose disjoint error intervals prove a
 * distinct gap below one threshold in O(n log n).
 */
export function unresolvedProximityIndexes(
  entries: readonly ExactProximityEntry[],
  threshold: BigDecimal.BigDecimal
) {
  const intervals = entries.map(exactInterval);
  const lower = rankRatios(intervals.map((entry) => entry.lower));
  const upper = rankRatios(intervals.map((entry) => entry.upper));
  const leftTree = makeTree(upper.values.length);
  const rightTree = makeTree(lower.values.length);
  const unresolved = new Set<number>();
  for (const [sourceIndex, interval] of intervals.entries()) {
    const leftEnd = firstRank(upper.values, interval.lower, false);
    const closestLeft = queryTree(leftTree, 0, leftEnd, greaterRatio);
    const rightStart = firstRank(lower.values, interval.upper, true);
    const closestRight = queryTree(
      rightTree,
      rightStart,
      lower.values.length,
      lesserRatio
    );
    const leftThreshold = translate(interval.upper, threshold, -1);
    const rightThreshold = translate(interval.lower, threshold, 1);
    if (
      (closestLeft !== undefined &&
        compareRatios(leftThreshold, closestLeft) < 0) ||
      (closestRight !== undefined &&
        compareRatios(closestRight, rightThreshold) < 0)
    ) {
      unresolved.add(sourceIndex);
    }
    updateTree(
      leftTree,
      EffectArray.getUnsafe(upper.ranks, sourceIndex),
      interval.lower,
      greaterRatio
    );
    updateTree(
      rightTree,
      EffectArray.getUnsafe(lower.ranks, sourceIndex),
      interval.upper,
      lesserRatio
    );
  }
  return unresolved;
}
