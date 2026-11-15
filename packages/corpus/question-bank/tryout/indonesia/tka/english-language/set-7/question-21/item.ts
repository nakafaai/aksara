import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "market-street",
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
          label: "A street without engines is simply a pleasure to shop in.",
        },
        {
          column: 1,
          label:
            "Kota Lama opened a free parking lot at the same time as the trial.",
        },
        {
          column: 3,
          label:
            "The free parking lot caused the rise in shoppers at Kota Lama.",
        },
        {
          column: 1,
          label:
            "Nobody compared the rise in takings with the same Sundays of the year before.",
        },
        {
          column: 2,
          label: "Nothing else could bring so many shoppers back so cheaply.",
        },
        {
          column: 3,
          label: "The clinic opposes closing the street.",
        },
      ],
    },
  },
};

export default item;
