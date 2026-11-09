import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  stimulus: "tea-terrace",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "to describe the features of a tea estate and how its parts are arranged",
        },
        {
          correct: false,
          label: "to explain how fresh leaves are processed into black tea",
        },
        {
          correct: false,
          label: "to persuade readers to buy tea grown on the estate",
        },
        {
          correct: false,
          label: "to tell the story of one picker's day on the estate",
        },
        {
          correct: false,
          label: "to compare tea estates in several different regions",
        },
      ],
    },
  },
};

export default item;
