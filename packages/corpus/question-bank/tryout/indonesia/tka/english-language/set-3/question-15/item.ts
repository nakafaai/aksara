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
          label:
            "The packet's written instructions answer Lea's questions without later interpretation.",
        },
        {
          isCorrect: false,
          label: "A seed travels backward from 2040.",
        },
        {
          isCorrect: true,
          label:
            "Stored seeds are tested at scheduled intervals by different classes.",
        },
        {
          isCorrect: false,
          label:
            "The storage date alone makes the result of each later seed test predictable.",
        },
        {
          isCorrect: false,
          label:
            "The archive record determines when stored seeds will become viable.",
        },
      ],
    },
  },
  stimulusKey: "future-seeds",
};

export default item;
