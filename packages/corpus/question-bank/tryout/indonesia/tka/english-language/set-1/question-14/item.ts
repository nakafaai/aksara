import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "She can reflect on a mistake and revise her judgment.",
        },
        {
          isCorrect: false,
          label: "She refuses to work with Arif again.",
        },
        {
          isCorrect: false,
          label: "She values speed more than fairness.",
        },
        {
          isCorrect: false,
          label: "She believes every first explanation is correct.",
        },
        {
          isCorrect: false,
          label: "She no longer cares about the garden.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
