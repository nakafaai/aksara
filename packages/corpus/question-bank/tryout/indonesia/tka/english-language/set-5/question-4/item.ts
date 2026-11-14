import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  stimulus: "night-market",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The night market sells food, while the day market does not.",
        },
        {
          correct: false,
          label: "The night market is held inside the Sentosa Market building.",
        },
        {
          correct: false,
          label: "The night market gives shoppers free plastic bags.",
        },
        {
          correct: false,
          label: "The night market is open every evening of the week.",
        },
        {
          correct: true,
          label:
            "Only people who live in the district can sell at the night market.",
        },
      ],
    },
  },
};

export default item;
