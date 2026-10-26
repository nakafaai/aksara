import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Why fixed costs never change",
        },
        {
          correct: true,
          label: "Testing a clearer budget sheet before a real event",
        },
        {
          correct: false,
          label: "From one workshop to permanent adoption",
        },
        {
          correct: false,
          label: "Accurate supplier totals from estimated prices",
        },
        {
          correct: false,
          label: "Three rounds that settled every budgeting question",
        },
      ],
    },
  },
};

export default item;
