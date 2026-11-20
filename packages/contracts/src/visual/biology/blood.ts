import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The ABO blood groups. */
const GROUPS = ["A", "B", "AB", "O"] as const;

/**
 * How many samples one grouping tile tests: its twelve cavities hold four
 * rows of anti-A, anti-B and anti-D.
 */
const TILE_ROWS = 4;

/**
 * One blood sample on the tile: its name, its ABO group, and whether its red
 * cells carry the Rhesus D antigen. The tile shows only how each drop reacts
 * with each antiserum, never the group by name.
 */
const SampleSchema = Schema.Struct({
  group: Schema.Literals(GROUPS),
  name: TextSchema,
  rhesus: Schema.Literals(["positive", "negative"]),
});

/**
 * The samples on one tile: one to four, each in its own row and named once,
 * since the name labels its row and its choice in the toolbar.
 */
const SamplesSchema = Schema.NonEmptyArray(SampleSchema).check(
  Schema.isMaxLength(TILE_ROWS),
  Schema.makeFilter(
    (samples) =>
      Arr.dedupe(Arr.map(samples, (sample) => sample.name)).length ===
      samples.length,
    { message: "Expected every sample to have its own name." }
  )
);

/**
 * Props of `BloodTypingLab`: each sample tested with anti-A, anti-B and
 * anti-D sera on a white porcelain tile, the slide test read a minute after
 * mixing. `labels.time` names that minute's clock. Naming the group the drops
 * point to is the result a question asks for, so `labels.group` and
 * `labels.groups` are answer state.
 */
function bloodTypingLab<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    ...cardFields(rich),
    labels: Schema.Struct({
      clumped: rich,
      group: Schema.optionalKey(rich),
      groups: Schema.optionalKey(byIds(GROUPS, rich)),
      sample: TextSchema,
      sera: byIds(["a", "b", "d"], rich),
      smooth: rich,
      time: rich,
      view: TextSchema,
    }),
    samples: SamplesSchema,
  });
}

/** The blood labs. The named group is answer state. */
export function bloodVisuals<E>(rich: RichSlot<E>) {
  return {
    BloodTypingLab: figure(
      bloodTypingLab(rich),
      answerAt(["labels", "group"], ["labels", "groups"])
    ),
  };
}
