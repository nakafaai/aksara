import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Dismissive of all nutritional advice",
        },
        {
          correct: false,
          label: "Certain that one food can prevent every infection",
        },
        {
          correct: true,
          label: "Practical and evidence-based",
        },
        {
          correct: false,
          label: "Alarmist about eating any sugar",
        },
        {
          correct: false,
          label: "Indifferent to dietary habits",
        },
      ],
    },
  },
};

export default item;
