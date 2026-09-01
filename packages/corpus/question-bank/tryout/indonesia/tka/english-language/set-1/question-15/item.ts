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
          label:
            "The notebook is damaged by an ordinary cause, and the characters recover only the evidence still available.",
        },
        {
          isCorrect: false,
          label:
            "The story is realistic because the surviving plants reveal the exact rainfall data missing from the notebook.",
        },
        {
          isCorrect: false,
          label:
            "The story becomes unrealistic because wet pages cannot be dried or photographed.",
        },
        {
          isCorrect: false,
          label:
            "The digital copy restores every blurred record, so the accident causes no loss of evidence.",
        },
        {
          isCorrect: false,
          label:
            "Mina's final observation turns the notebook into a character that can judge her accusation.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
