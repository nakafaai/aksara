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
          label: "The packet speaks directly to Lea.",
        },
        {
          isCorrect: true,
          label:
            "Stored seeds are tested at scheduled intervals by different classes.",
        },
        {
          isCorrect: false,
          label: "A seed travels backward from 2040.",
        },
        {
          isCorrect: false,
          label: "The greenhouse predicts all future harvests.",
        },
        {
          isCorrect: false,
          label: "The archive changes the date by magic.",
        },
      ],
    },
  },
  stimulusKey: "future-seeds",
};

export default item;
