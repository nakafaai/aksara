import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "pottery-village",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Visitors often buy a small cup as a souvenir.",
        },
        {
          correct: false,
          label: "The river floods the rice fields every few years.",
        },
        {
          correct: false,
          label: "Some potters first learned their skills in the city.",
        },
        {
          correct: false,
          label: "Rice farmers in the village plant twice a year.",
        },
        {
          correct: true,
          label:
            "After cooling overnight, the pots are carried back to each family's workshop.",
        },
      ],
    },
  },
};

export default item;
