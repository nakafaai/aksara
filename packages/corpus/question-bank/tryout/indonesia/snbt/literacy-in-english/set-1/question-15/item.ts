import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "wind-curtailment",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Brackenmoor delivered more than twice as much energy to the grid as Fellside and Gullrock delivered together.",
        },
        {
          column: 2,
          label:
            "Saltmarsh's small loss shows that the South line was never full during 2025.",
        },
        {
          column: 1,
          label:
            "For each megawatt of installed capacity, Fellside had more energy curtailed than Brackenmoor did.",
        },
        {
          column: 2,
          label:
            "Gullrock lost a larger share of the energy it could have produced than any North farm did.",
        },
        {
          column: 1,
          label:
            "Had Brackenmoor lost the same share of its potential energy as Fellside, its curtailed energy would have exceeded that of the other three farms together.",
        },
      ],
    },
  },
};

export default item;
