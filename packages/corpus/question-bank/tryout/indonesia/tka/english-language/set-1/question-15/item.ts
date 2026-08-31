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
          isCorrect: true,
          label: "Rain damages a paper notebook left near a leaking pipe.",
        },
        {
          isCorrect: false,
          label:
            "Past garden notes make the timing and effects of the next storm fully predictable.",
        },
        {
          isCorrect: false,
          label:
            "The seedlings' condition directly tells volunteers the exact time the next storm will arrive.",
        },
        {
          isCorrect: false,
          label: "A cloud returns the missing pages to Mina.",
        },
        {
          isCorrect: false,
          label: "A drawing changes the direction of the wind.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
