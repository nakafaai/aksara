import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Stay where he is until the electricity comes back on",
        },
        {
          isCorrect: false,
          label: "Wait in the kitchen for his grandmother to bring a candle",
        },
        {
          isCorrect: false,
          label: "Search the dark house for the matches and the candles",
        },
        {
          isCorrect: false,
          label: "Call his parents to ask where the candles are kept",
        },
        {
          isCorrect: true,
          label:
            "Take the flashlight from the drawer and go to his grandmother",
        },
      ],
    },
  },
  stimulusKey: "power-cut",
};

export default item;
