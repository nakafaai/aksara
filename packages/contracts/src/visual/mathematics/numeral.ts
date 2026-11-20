import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** How many places the spike abacus has: b^3, b^2, b and 1. */
const ABACUS_PLACES = 4;

/** A base the spike abacus can count in: at most nine beads fit a spike. */
const AbacusBaseSchema = Schema.Int.check(
  Schema.isBetween({ maximum: 10, minimum: 2 })
);

/** The bases a spike abacus offers and the number it starts from, in the first base. */
const AbacusStartSchema = Schema.Struct({
  bases: Schema.NonEmptyArray(AbacusBaseSchema),
  value: Schema.Int.check(Schema.isGreaterThanOrEqualTo(0)),
});

/** Whether each base is offered once and the first base's spikes hold the number. */
function fitsAbacus({ bases, value }: typeof AbacusStartSchema.Type) {
  const [first] = bases;
  return (
    Arr.dedupe(bases).length === bases.length &&
    value <= first ** ABACUS_PLACES - 1
  );
}

/**
 * Props of `AbacusBaseLab`: a classroom spike abacus whose four spikes hold
 * the digits of a number in the base the learner picks, starting from
 * `value` in the first of `bases`. With `showReadout`, the slider shows the
 * number and the footer reads its numeral, its expanded form and its value
 * in base ten, so it is answer state.
 */
function abacusBaseLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ...AbacusStartSchema.fields,
      labels: Schema.Struct({
        base: TextSchema,
        decimal: rich,
        digits: rich,
        expanded: rich,
        value: TextSchema,
        viewLabel: TextSchema,
      }),
      showReadout: Schema.optionalKey(Schema.Boolean),
    }).check(
      Schema.makeFilter(fitsAbacus, {
        message:
          "Expected each base once and a number the first base's four spikes can hold.",
      })
    ),
    answerAt(["showReadout"])
  );
}

/** How a row of bits can be read: one by one, in pairs for base four, in threes for base eight. */
const BIT_GROUPINGS = ["none", "pairs", "triples"] as const;

/** The lamps of a binary lamp panel and the number it starts from. */
const LampStartSchema = Schema.Struct({
  bits: Schema.Int.check(Schema.isBetween({ maximum: 8, minimum: 4 })),
  value: Schema.Int.check(Schema.isGreaterThanOrEqualTo(0)),
});

/** Whether the lamps can show the number. */
function fitsLamps({ bits, value }: typeof LampStartSchema.Type) {
  return value <= 2 ** bits - 1;
}

/**
 * Props of `BinaryLampLab`: a counting panel whose row of `bits` lamps shows
 * `value` in base two, read one by one, in pairs for base four, or in threes
 * for base eight. With `showReadout`, the slider shows the number, each group
 * shows its digit, and the footer reads the numeral in base two, the grouped
 * reading and the value in base ten, so it is answer state.
 */
function binaryLampLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ...LampStartSchema.fields,
      labels: Schema.Struct({
        binary: rich,
        decimal: rich,
        grouped: rich,
        grouping: TextSchema,
        groups: byIds(BIT_GROUPINGS, TextSchema),
        value: TextSchema,
        viewLabel: TextSchema,
      }),
      showReadout: Schema.optionalKey(Schema.Boolean),
    }).check(
      Schema.makeFilter(fitsLamps, {
        message: "Expected a number the row of lamps can show.",
      })
    ),
    answerAt(["showReadout"])
  );
}

/** The places the bundling desk fills: loose sticks, bundles, boxes and trays. */
const BUNDLE_PLACES = 4;

/** The most sticks one heap on the bundling desk holds. */
const HEAP_STICKS = 300;

/** A base the desk can bundle in: two to nine sticks to a bundle, as the KSSM bases are. */
const BundleBaseSchema = Schema.Int.check(
  Schema.isBetween({ maximum: 9, minimum: 2 })
);

/** The bases a bundling desk offers and the count of sticks it starts from. */
const BundleStartSchema = Schema.Struct({
  bases: Schema.NonEmptyArray(BundleBaseSchema),
  value: Schema.Int.check(
    Schema.isBetween({ maximum: HEAP_STICKS, minimum: 1 })
  ),
});

/** Whether each base is offered once and the first base's four places hold the count. */
function fitsDesk({ bases, value }: typeof BundleStartSchema.Type) {
  const [first] = bases;
  return (
    Arr.dedupe(bases).length === bases.length &&
    value <= first ** BUNDLE_PLACES - 1
  );
}

/**
 * Props of `BundleCountLab`: a desk where a heap of `value` sticks is tied
 * into bundles of b, the bundles boxed b to a box and the boxes set b to a
 * tray, one division by b per round, in the base the learner picks from
 * `bases`. With `showReadout`, the slider shows the count, each place shows
 * its digit, a caption reads each division, and the footer reads the
 * division ladder and the numeral, so it is answer state.
 */
function bundleCountLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ...BundleStartSchema.fields,
      labels: Schema.Struct({
        base: TextSchema,
        count: TextSchema,
        ladder: rich,
        numeral: rich,
        viewLabel: TextSchema,
      }),
      showReadout: Schema.optionalKey(Schema.Boolean),
    }).check(
      Schema.makeFilter(fitsDesk, {
        message:
          "Expected each base once and a count the first base's four places can hold.",
      })
    ),
    answerAt(["showReadout"])
  );
}

/** The place-value labs, where a number is written in a base. */
export function numeralVisuals<E>(rich: RichSlot<E>) {
  return {
    AbacusBaseLab: abacusBaseLab(rich),
    BinaryLampLab: binaryLampLab(rich),
    BundleCountLab: bundleCountLab(rich),
  };
}
