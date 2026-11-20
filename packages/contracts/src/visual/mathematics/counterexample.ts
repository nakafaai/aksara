import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The shapes and paints a shape tile can carry. */
const TILE_SHAPES = ["circle", "square", "triangle"] as const;
const TILE_COLORS = ["red", "blue", "yellow", "green"] as const;

/** The most tiles the table holds, and the widest whole number a tile prints. */
const TILE_LIMIT = 20;
const TILE_VALUE = { maximum: 9999, minimum: -999 } as const;

/** The most claims the toolbar offers, and the longest claim text the card prints. */
const CLAIM_LIMIT = 3;
const CLAIM_TEXT_LIMIT = 90;

/** What one tile shows: a whole number printed on it, or a painted shape standing on it. */
const TileSchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("number"), value: Schema.Int }),
  Schema.Struct({
    color: Schema.Literals(TILE_COLORS),
    kind: Schema.Literal("shape"),
    shape: Schema.Literals(TILE_SHAPES),
  }),
]);

/**
 * A test a tile passes or fails. The number tests read a number tile: odd,
 * even, prime, a square number, a multiple of `of`, a factor of `of`, more
 * than `than` or less than `than`. The shape tests read a shape tile: its
 * shape or its color.
 */
const TileTestSchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("odd") }),
  Schema.Struct({ kind: Schema.Literal("even") }),
  Schema.Struct({ kind: Schema.Literal("prime") }),
  Schema.Struct({ kind: Schema.Literal("square-number") }),
  Schema.Struct({ kind: Schema.Literal("multiple"), of: Schema.Int }),
  Schema.Struct({ kind: Schema.Literal("factor"), of: Schema.Int }),
  Schema.Struct({ kind: Schema.Literal("above"), than: Schema.Finite }),
  Schema.Struct({ kind: Schema.Literal("below"), than: Schema.Finite }),
  Schema.Struct({
    kind: Schema.Literal("shape"),
    shape: Schema.Literals(TILE_SHAPES),
  }),
  Schema.Struct({
    color: Schema.Literals(TILE_COLORS),
    kind: Schema.Literal("color"),
  }),
]);

type TileTest = typeof TileTestSchema.Type;

/** A test with the words the footer names it by, such as "Odd number". */
const NamedTestSchema = Schema.Struct({
  name: TextSchema,
  test: TileTestSchema,
});

/**
 * A claim about the tiles. `all` says every tile that passes `subject` (every
 * tile, without one) passes `predicate`, and `some` says at least one does.
 * `if` says every tile that passes `p` passes `q`.
 */
const TileClaimSchema = Schema.Union([
  Schema.Struct({
    kind: Schema.Literal("all"),
    predicate: NamedTestSchema,
    subject: Schema.optionalKey(NamedTestSchema),
  }),
  Schema.Struct({
    kind: Schema.Literal("some"),
    predicate: NamedTestSchema,
    subject: Schema.optionalKey(NamedTestSchema),
  }),
  Schema.Struct({
    kind: Schema.Literal("if"),
    p: NamedTestSchema,
    q: NamedTestSchema,
  }),
]);

type TileClaim = typeof TileClaimSchema.Type;

/**
 * What one tile does to a claim, each named in the footer's key: a tile that
 * `breaks` or `fits` a claim about all or an implication, `proves` or
 * `misses` a claim about some, is `outside` a claim's subject, or is `safe`
 * because its condition is false.
 */
const TILE_VERDICTS = [
  "breaks",
  "fits",
  "outside",
  "proves",
  "misses",
  "safe",
] as const;

/** The tests a claim makes: its subject or condition, when it has one, then its predicate or conclusion. */
function testsOf(claim: TileClaim): readonly TileTest[] {
  if (claim.kind === "if") {
    return [claim.p.test, claim.q.test];
  }
  return claim.subject === undefined
    ? [claim.predicate.test]
    : [claim.subject.test, claim.predicate.test];
}

/** Whether a test reads a shape tile; every other test reads a number tile. */
function readsShape(test: TileTest) {
  return test.kind === "shape" || test.kind === "color";
}

/** The tiles on the table and the claims made about them. */
const TileTableSchema = Schema.Struct({
  claims: Schema.NonEmptyArray(
    Schema.Struct({
      claim: TileClaimSchema,
      name: TextSchema,
      text: TextSchema.check(Schema.isMaxLength(CLAIM_TEXT_LIMIT)),
    })
  ).check(Schema.isMaxLength(CLAIM_LIMIT)),
  tiles: Schema.NonEmptyArray(
    Schema.Struct({ name: TextSchema, tile: TileSchema })
  ).check(Schema.isMaxLength(TILE_LIMIT)),
});

/**
 * Whether the table is one kind of tile, every number prints on its tile,
 * every test of every claim reads that kind, and each claim has its own name.
 */
function isTileTable({ claims, tiles }: typeof TileTableSchema.Type) {
  const shapes = Arr.every(tiles, ({ tile }) => tile.kind === "shape");
  const numbers = Arr.every(
    tiles,
    ({ tile }) =>
      tile.kind === "number" &&
      tile.value >= TILE_VALUE.minimum &&
      tile.value <= TILE_VALUE.maximum
  );
  const names = Arr.map(claims, ({ name }) => name);
  return (
    (shapes || numbers) &&
    Arr.dedupe(names).length === names.length &&
    Arr.every(claims, ({ claim }) =>
      Arr.every(testsOf(claim), (test) => readsShape(test) === shapes)
    )
  );
}

/**
 * Props of `CounterexampleGridLab`: the `tiles` of a set lie in a grid, and
 * a card stands behind them with one of the `claims` about them, such as
 * "All odd numbers here are prime". Play checks the tiles one at a time, and
 * the learner can pick any tile to check it. A claim about all or an
 * implication falls at its first counterexample, and a claim about some
 * stands at its first example; with an implication, the tiles are carried
 * into a board of the four cases of p and q. With `showAnswer`, each checked
 * tile shows its verdict, the card is stamped true or false at the tile that
 * settles it, and the footer reads the claim's truth, so it is answer state.
 */
function counterexampleGridLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ...TileTableSchema.fields,
      labels: Schema.Struct({
        claim: rich,
        claims: TextSchema,
        false: TextSchema,
        none: rich,
        picked: rich,
        tile: TextSchema,
        true: TextSchema,
        verdicts: byIds(TILE_VERDICTS, rich),
        viewLabel: TextSchema,
      }),
      showAnswer: Schema.optionalKey(Schema.Boolean),
    }).check(
      Schema.makeFilter(isTileTable, {
        message:
          "Expected tiles of one kind with printable numbers, claims whose tests read that kind of tile, and a different name for each claim.",
      })
    ),
    answerAt(["showAnswer"])
  );
}

/** The counterexample labs, where a claim is tested on every case. */
export function counterexampleVisuals<E>(rich: RichSlot<E>) {
  return { CounterexampleGridLab: counterexampleGridLab(rich) };
}
