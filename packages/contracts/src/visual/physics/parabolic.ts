import { Schema } from "effect";

import {
  byIds,
  cardFields,
  DecimalSeparatorSchema,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** The launches the parabolic movement lab compares. */
const LAUNCHES = ["low-angle", "balanced-angle", "high-angle"] as const;

/** The projectiles the analysis lab follows. */
const PROJECTILES = ["sixty-degree", "long-drive", "high-arc"] as const;

/** Props of `ParabolicMovementLab`: one launch speed at three angles. */
function parabolicLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      decimalSeparator: Schema.optionalKey(DecimalSeparatorSchema),
      defaultLaunchId: Schema.optionalKey(Schema.Literals(LAUNCHES)),
      description: Schema.optionalKey(rich),
      labels: Schema.Struct({
        chooseLaunch: TextSchema,
        factLabels: Schema.Struct({
          flightTime: rich,
          initialSpeed: rich,
          peakHeight: rich,
          range: rich,
        }),
        viewLabel: TextSchema,
      }),
      title: Schema.optionalKey(rich),
    })
  );
}

/** Props of `ParabolicMovementAnalysisLab`: the components of a projectile's velocity. */
function analysisLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      decimalSeparator: Schema.optionalKey(DecimalSeparatorSchema),
      labels: Schema.Struct({
        chooseScenario: TextSchema,
        factLabels: Schema.Struct({
          flightTime: rich,
          horizontalComponent: rich,
          instantaneousVelocity: rich,
          peakTime: rich,
          range: rich,
          verticalComponent: rich,
        }),
        scenarioNames: byIds(PROJECTILES, rich),
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * The projectile labs. Their labels name the quantities the lab computes for
 * the launch the reader picks, so no prop holds answer state.
 */
export function parabolicVisuals<E>(rich: RichSlot<E>) {
  return {
    ParabolicMovementAnalysisLab: analysisLab(rich),
    ParabolicMovementLab: parabolicLab(rich),
  };
}
