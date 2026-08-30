import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "supporting-detail",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The notebook was blue.",
        },
        {
          isCorrect: false,
          label: "Mina searched her backpack twice.",
        },
        {
          isCorrect: true,
          label:
            "Gardeners used its records to decide when to cover young plants.",
        },
        {
          isCorrect: false,
          label: "Arif copied a diagram on Friday.",
        },
        {
          isCorrect: false,
          label: "A storage box stood near the stairs.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
