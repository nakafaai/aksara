import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Dismissive" },
        {
          correct: false,
          label: "Unconditionally enthusiastic",
        },
        { correct: false, label: "Alarmist" },
        {
          correct: true,
          label: "Balanced and cautious",
        },
        { correct: false, label: "Indifferent" },
      ],
    },
  },
};

export default item;
