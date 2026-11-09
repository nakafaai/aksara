import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "recycling-rate",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The city collects far less waste each month than the report claims.",
        },
        {
          correct: false,
          label: "It includes waste from factories as well as from households.",
        },
        {
          correct: true,
          label:
            "It counts what goes into bins, not what is actually recycled.",
        },
        {
          correct: false,
          label:
            "The newspaper checked a month in which far more glass was collected.",
        },
        {
          correct: false,
          label:
            "It leaves out paper and cardboard, the largest recycled material.",
        },
      ],
    },
  },
};

export default item;
