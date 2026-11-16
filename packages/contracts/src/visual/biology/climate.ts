import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `CarbonBudgetLab`: the air as a bathtub. */
function carbonBudgetLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        above: Schema.optionalKey(rich),
        chooseRegions: Schema.optionalKey(TextSchema),
        cut: Schema.optionalKey(TextSchema),
        emissions: Schema.optionalKey(rich),
        forest: Schema.optionalKey(TextSchema),
        level: rich,
        peak: Schema.optionalKey(rich),
        perYear: Schema.optionalKey(TextSchema),
        rate: Schema.optionalKey(rich),
        regions: Schema.optionalKey(
          byIds(["china", "usa", "india", "europe", "rest"], rich)
        ),
        rise: Schema.optionalKey(rich),
        viewLabel: TextSchema,
        warming: Schema.optionalKey(rich),
        year: Schema.optionalKey(TextSchema),
      }),
      mode: Schema.Literals(["cooperate", "mitigate", "record"]),
    })
  );
}

/**
 * Props of `CoralBleachLab`: a reef tank on a lab bench with corals from a reef
 * whose warmest month averages 29 °C.
 */
function coralBleachLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        alert: rich,
        alerts: byIds(["calm", "watch", "warning", "bleaching", "dying"], rich),
        dhw: rich,
        hotspot: rich,
        temperature: TextSchema,
        viewLabel: TextSchema,
        weeks: TextSchema,
      }),
    })
  );
}

/**
 * Props of `SeaLevelRiseLab`: a coastal village on a beach that climbs 1 m
 * every 20 m inland, at real scale, with a tide gauge at today's high-tide
 * line.
 */
function seaLevelRiseLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        choose: Schema.optionalKey(TextSchema),
        defences: Schema.optionalKey(
          Schema.Struct({
            wall: Schema.optionalKey(rich),
            mangrove: Schema.optionalKey(rich),
            storm: Schema.optionalKey(rich),
          })
        ),
        flooded: Schema.optionalKey(rich),
        level: rich,
        perYear: Schema.optionalKey(TextSchema),
        range: Schema.optionalKey(rich),
        rate: Schema.optionalKey(rich),
        retreat: rich,
        rise: Schema.optionalKey(TextSchema),
        scenarios: Schema.optionalKey(
          Schema.Struct({
            ssp119: Schema.optionalKey(rich),
            ssp126: Schema.optionalKey(rich),
            ssp245: Schema.optionalKey(rich),
            ssp370: Schema.optionalKey(rich),
            ssp585: Schema.optionalKey(rich),
          })
        ),
        span: Schema.optionalKey(rich),
        viewLabel: TextSchema,
        warming: Schema.optionalKey(rich),
        wave: Schema.optionalKey(rich),
        year: Schema.optionalKey(TextSchema),
      }),
      mode: Schema.Literals(["adapt", "flood", "record", "scenario"]),
      scenarios: Schema.optionalKey(
        Schema.Array(
          Schema.Literals(["ssp119", "ssp126", "ssp245", "ssp370", "ssp585"])
        )
      ),
    })
  );
}

/**
 * The props of the climate labs. No prop states the conclusion a lab leads to,
 * so none holds answer state.
 */
export function climateVisuals<E>(rich: RichSlot<E>) {
  return {
    CarbonBudgetLab: carbonBudgetLab(rich),
    CoralBleachLab: coralBleachLab(rich),
    SeaLevelRiseLab: seaLevelRiseLab(rich),
  };
}
