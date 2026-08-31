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
          isCorrect: false,
          label: "She refuses to work with Arif again.",
        },
        {
          isCorrect: false,
          label: "She values speed more than fairness.",
        },
        {
          isCorrect: false,
          label:
            "She remains confident that her first explanation was reasonable despite the later evidence.",
        },
        {
          isCorrect: true,
          label: "She can reflect on a mistake and revise her judgment.",
        },
        {
          isCorrect: false,
          label:
            "She values preserving the recovered notebook more than revising her first judgment.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
