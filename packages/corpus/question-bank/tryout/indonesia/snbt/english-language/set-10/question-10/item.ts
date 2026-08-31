import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Why fixed costs never change",
        },
        {
          isCorrect: true,
          label: "Testing a clearer budget sheet before a real event",
        },
        {
          isCorrect: false,
          label: "From one workshop to permanent adoption",
        },
        {
          isCorrect: false,
          label: "Accurate supplier totals from estimated prices",
        },
        {
          isCorrect: false,
          label: "Three rounds that settled every budgeting question",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
