import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a night market",
        },
        {
          isCorrect: true,
          label: "Hana's next step in a night market",
        },
        {
          isCorrect: false,
          label: "Why all evidence in a night market should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of systems thinking",
        },
        {
          isCorrect: false,
          label: "One rule for every a night market",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
