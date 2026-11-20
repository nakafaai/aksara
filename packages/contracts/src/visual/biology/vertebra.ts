import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * The kinds of vertebra the column holds, from the neck down: cervical, the
 * first two cervical vertebrae (atlas and axis) on their own, thoracic,
 * lumbar, then the sacral and caudal vertebrae that fuse into the sacrum and
 * the coccyx. How many each region has and whether it fuses are facts the
 * renderer knows.
 */
const REGIONS = [
  "cervical",
  "atlas",
  "axis",
  "thoracic",
  "lumbar",
  "sacral",
  "caudal",
] as const;

/**
 * Props of `VertebraLab`: a human vertebral column with its curves. The
 * learner picks one of `regions` (each once, in the order the toggle lists
 * them) and turns the vertebra that lifts out of the column; the readouts give
 * how many the region has, whether they fuse into one bone and the region's
 * job, words from `labels.regions`, one entry for each region shown and no
 * other. The parts of a vertebra are labelled in the scene.
 */
function vertebraLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        count: rich,
        fused: rich,
        job: rich,
        no: rich,
        parts: byIds(
          [
            "body",
            "canal",
            "spinous",
            "transverse",
            "foramen",
            "facet",
            "dens",
            "disc",
          ],
          TextSchema
        ),
        region: TextSchema,
        regions: byPickedIds(
          REGIONS,
          Schema.Struct({ job: rich, name: TextSchema })
        ),
        view: TextSchema,
        yes: rich,
      }),
      regions: Schema.NonEmptyArray(Schema.Literals(REGIONS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, regions }) => namesEach(regions, labels.regions),
        {
          message:
            "Expected words for every region the lab shows, and no other.",
        }
      )
    )
  );
}

/** The vertebra lab. Every prop names what the learner explores; none is answer state. */
export function vertebraVisuals<E>(rich: RichSlot<E>) {
  return { VertebraLab: vertebraLab(rich) };
}
