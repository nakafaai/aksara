import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "wind-curtailment",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "It will bring the North farms' curtailment down to about the share that Saltmarsh lost.",
        },
        {
          column: 2,
          label: "It will add about $$210$$ GWh a year to the energy that the North farms deliver.",
        },
        {
          column: 2,
          label: "It will remove the North farms' losses on windy evenings.",
        },
        {
          column: 1,
          label: "Its likely gain cannot be read straight off the North farms' 2025 figures.",
        },
        {
          column: 1,
          label: "It will not reduce losses on nights when demand across the whole region is too low.",
        },
      ],
    },
  },
};

export default item;
