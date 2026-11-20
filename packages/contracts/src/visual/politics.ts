import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** The card, the source footnote, and the words of a sourced politics chart. */
function sourcedChart<Labels extends Schema.Struct.Fields, E>(
  rich: RichSlot<E>,
  labels: Labels
) {
  return Schema.Struct({
    ...cardFields(rich),
    footnote: rich,
    labels: Schema.Struct(labels),
  });
}

/** Props of a sourced chart whose value axis has a plain label. */
function axisChart<Labels extends Schema.Struct.Fields, E>(
  rich: RichSlot<E>,
  labels: Labels
) {
  return Schema.Struct({
    ...sourcedChart(rich, labels).fields,
    yLabel: TextSchema,
  });
}

/** Props of `NepotismStage`: the three stages of a good democratic process. */
function nepotismStage<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      description: rich,
      labels: Schema.Struct({
        delivery: rich,
        election: rich,
        selection: rich,
      }),
      title: rich,
    })
  );
}

/** Props of `NepotismStateTable`: governance indices of several countries. */
function nepotismStateTable<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      caption: rich,
      labels: Schema.Struct({
        corruptionIndex: rich,
        country: rich,
        good: rich,
        goodGovernanceIndex: rich,
        governanceQualityCategory: rich,
        judicialEfficiencyIndex: rich,
        low: rich,
        medium: rich,
      }),
    })
  );
}

/**
 * The politics charts and tables. Each draws sourced data that the component
 * holds, and its labels name the series, so no prop holds answer state.
 */
export function politicsVisuals<E>(rich: RichSlot<E>) {
  return {
    KimPlusElectabilityChart: figure(
      sourcedChart(rich, { electability: rich, notAnswering: TextSchema })
    ),
    MerahPutihCabinetChart: figure(sourcedChart(rich, { cabinet: rich })),
    MerahPutihCompositionChart: figure(
      sourcedChart(rich, {
        female: rich,
        gender: TextSchema,
        incumbent: rich,
        male: rich,
        minister: TextSchema,
        new: rich,
        nonPoliticians: rich,
        politicalStatus: TextSchema,
        politicians: rich,
      })
    ),
    NepotismStage: nepotismStage(rich),
    NepotismStateTable: nepotismStateTable(rich),
    PorkBarrelBudgetChart: figure(axisChart(rich, { budget: rich })),
    PorkBarrelElectabilityChart: figure(
      axisChart(rich, {
        aniesMuhaimin: rich,
        ganjarMahfud: rich,
        prabowoGibran: rich,
      })
    ),
    PorkBarrelFundChart: figure(axisChart(rich, { fund: rich })),
  };
}
