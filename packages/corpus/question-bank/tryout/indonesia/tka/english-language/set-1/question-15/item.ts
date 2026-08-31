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
            "A rain gauge reconstructs the previous week's records after the notebook gets wet.",
        },
        {
          isCorrect: false,
          label:
            "A loose drainage pipe carries the notebook safely back to Mina's backpack.",
        },
        {
          isCorrect: false,
          label:
            "A shared digital copy appears before anyone photographs the readable pages.",
        },
        {
          isCorrect: false,
          label:
            "The seedlings change color to reveal the exact time of the next storm.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
