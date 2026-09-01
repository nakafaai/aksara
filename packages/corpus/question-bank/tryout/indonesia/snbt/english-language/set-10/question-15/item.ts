import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Turning uncertain quotes into a workable concert budget",
        },
        {
          isCorrect: false,
          label: "Waiting for every price before making a decision",
        },
        {
          isCorrect: false,
          label: "A balanced total with no unanswered questions",
        },
        {
          isCorrect: false,
          label: "Why contingency means adding money without a reason",
        },
        {
          isCorrect: false,
          label: "Removing projection equipment from every youth concert",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
