import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The notebook predicts every future storm by itself.",
        },
        {
          isCorrect: false,
          label: "The seedlings speak and request a cover.",
        },
        {
          isCorrect: false,
          label: "A cloud returns the missing pages to Mina.",
        },
        {
          isCorrect: false,
          label: "A drawing changes the direction of the wind.",
        },
        {
          isCorrect: true,
          label: "Rain damages a paper notebook left near a leaking pipe.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
