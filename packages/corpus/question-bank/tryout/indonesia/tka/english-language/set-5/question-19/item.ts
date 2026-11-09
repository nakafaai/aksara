import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "sequence",
  },
  stimulus: "water-filter",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "pouring the muddy water onto the gravel" },
        { correct: false, label: "adding the coarse sand" },
        {
          correct: false,
          label: "cutting the bottle about 10 centimeters from the bottom",
        },
        {
          correct: true,
          label: "placing the cotton cloth inside, just above the cap",
        },
        {
          correct: false,
          label: "comparing the filtered water with the muddy water in the jar",
        },
      ],
    },
  },
};

export default item;
