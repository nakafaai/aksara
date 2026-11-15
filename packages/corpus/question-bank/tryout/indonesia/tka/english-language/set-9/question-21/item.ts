import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "sweet-drinks",
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
          column: 2,
          label: "Nothing changes habits like a price.",
        },
        {
          column: 1,
          label: "SMP Mutiara's trial ran through the rainy months.",
        },
        {
          column: 3,
          label:
            "The rainy months caused the fall in drink sales at SMP Mutiara.",
        },
        {
          column: 1,
          label: "Nobody counted the nurse's headache visits the year before.",
        },
        {
          column: 2,
          label: "A small charge is a fair price for healthier students.",
        },
        {
          column: 3,
          label: "The canteen's stallholders oppose the charge.",
        },
      ],
    },
  },
};

export default item;
