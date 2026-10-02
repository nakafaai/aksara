import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A ledger passed between student treasurers",
        },
        {
          isCorrect: true,
          label: "The blank line after the balanced total",
        },
        {
          isCorrect: false,
          label: "The supplier reply that settled the concert budget",
        },
        {
          isCorrect: false,
          label: "Why every budget needs one final number",
        },
        {
          isCorrect: false,
          label: "A morning meeting with no unanswered questions",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
