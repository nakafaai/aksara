import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** What a hoop can gather the objects by: a colour, a material, being a ball, or being a fruit. */
const VENN_ATTRIBUTES = [
  "red",
  "yellow",
  "blue",
  "green",
  "metal",
  "wood",
  "plastic",
  "ball",
  "fruit",
] as const;

/** The everyday objects the mat can hold, each at most once. */
const VENN_OBJECTS = [
  "apple",
  "lemon",
  "lime",
  "tennis-ball",
  "steel-ball",
  "red-ball",
  "blue-ball",
  "washer",
  "coin",
  "toy-car",
  "red-block",
  "green-block",
  "yellow-block",
  "blue-cup",
  "green-cup",
] as const;

/** The operations the toolbar can offer, from A ∩ B to A ∪ (B ∩ C). */
const VENN_OPERATIONS = [
  "intersection",
  "union",
  "complement",
  "outside-union",
  "difference",
  "triple-intersection",
  "union-with-pair",
] as const;

/** The operations that name the third set C, so they need three hoops. */
const THREE_SET_OPERATIONS: readonly string[] = [
  "triple-intersection",
  "union-with-pair",
];

/** The fewest and the most hoops the mat lays out. */
const HOOP_RANGE = { maximum: 3, minimum: 2 } as const;

/** The hoops, the objects and the operations a lab offers. */
const SortSchema = Schema.Struct({
  objects: Schema.NonEmptyArray(
    Schema.Struct({ name: TextSchema, object: Schema.Literals(VENN_OBJECTS) })
  ),
  operations: Schema.NonEmptyArray(Schema.Literals(VENN_OPERATIONS)),
  sets: Schema.Array(
    Schema.Struct({
      attribute: Schema.Literals(VENN_ATTRIBUTES),
      name: TextSchema,
    })
  ).check(
    Schema.isMinLength(HOOP_RANGE.minimum),
    Schema.isMaxLength(HOOP_RANGE.maximum)
  ),
});

/** Whether every list holds each entry once, and every operation has the hoops it names. */
function isSort({ objects, operations, sets }: typeof SortSchema.Type) {
  const kinds = Arr.map(objects, ({ object }) => object);
  const attributes = Arr.map(sets, ({ attribute }) => attribute);
  return (
    Arr.dedupe(kinds).length === kinds.length &&
    Arr.dedupe(attributes).length === attributes.length &&
    Arr.dedupe(operations).length === operations.length &&
    (sets.length === HOOP_RANGE.maximum ||
      !Arr.some(operations, (operation) =>
        Arr.contains(THREE_SET_OPERATIONS, operation)
      ))
  );
}

/**
 * Props of `VennSortLab`: a universal-set mat with two or three hoops, A, B
 * and C, each gathering the `objects` with one attribute. In Play the objects
 * roll from a tray into their regions; picking one of the `operations`
 * shades the region it selects. With `showCount`, the footer gives how many
 * objects the operation selects and lists them, so it is answer state.
 */
function vennSortLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ...SortSchema.fields,
      labels: Schema.Struct({
        count: rich,
        members: rich,
        operation: TextSchema,
        viewLabel: TextSchema,
      }),
      showCount: Schema.optionalKey(Schema.Boolean),
    }).check(
      Schema.makeFilter(isSort, {
        message:
          "Expected each object, attribute and operation once, two or three hoops, and three hoops for an operation that names C.",
      })
    ),
    answerAt(["showCount"])
  );
}

/** The set labs, where objects are sorted into sets and operations select regions. */
export function setVisuals<E>(rich: RichSlot<E>) {
  return { VennSortLab: vennSortLab(rich) };
}
