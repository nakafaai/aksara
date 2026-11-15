import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "late-start",
  versions: {
    en: {
      columns: [
        "Stated as a fact",
        "Stated as an opinion",
        "Not stated in either text",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Two of the three schools also opened a canteen breakfast in the same semester.",
        },
        {
          column: 2,
          label:
            "Asking teenagers to think clearly before seven in the morning wastes the first lesson.",
        },
        {
          column: 3,
          label: "The later start alone cut lateness at the three schools.",
        },
        {
          column: 1,
          label: "7:30 is the latest start time the buses allow.",
        },
        {
          column: 2,
          label: "No other change could do as much for so little cost.",
        },
        {
          column: 3,
          label: "More than $$14\\%$$ of SMA Cahaya's students arrive late.",
        },
      ],
    },
  },
};

export default item;
