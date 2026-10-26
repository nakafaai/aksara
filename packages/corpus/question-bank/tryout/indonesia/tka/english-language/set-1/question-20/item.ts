import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "A guess about a hidden pipe without observations",
        },
        {
          correct: false,
          label:
            "A list of room colors and furniture placed near visible pipes",
        },
        {
          correct: false,
          label:
            "A list of electricity use recorded during the same test period",
        },
        {
          correct: true,
          label:
            "The two readings, exact times, and any visible signs of water",
        },
        {
          correct: false,
          label:
            "An assurance that the observer did not notice other water use",
        },
      ],
    },
  },
  stimulus: "leak-test",
};

export default item;
