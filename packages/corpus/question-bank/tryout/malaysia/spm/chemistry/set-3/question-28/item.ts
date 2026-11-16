import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_3\\text{H}_7\\text{OH}$$, two alcohol isomers, and $$0.23\\text{ g}$$ of sodium",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, two alcohol isomers, and $$0.23\\text{ g}$$ of sodium",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, four alcohol isomers, and $$0.23\\text{ g}$$ of sodium",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, four alcohol isomers, and $$0.12\\text{ g}$$ of sodium",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_3\\text{H}_7\\text{OH}$$, dua isomer alkohol, dan $$0.23\\text{ g}$$ natrium",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, dua isomer alkohol, dan $$0.23\\text{ g}$$ natrium",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, empat isomer alkohol, dan $$0.23\\text{ g}$$ natrium",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, empat isomer alkohol, dan $$0.12\\text{ g}$$ natrium",
        },
      ],
    },
  },
};

export default item;
