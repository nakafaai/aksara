import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Increase" },
        { correct: false, label: "Ignore" },
        { correct: false, label: "Prevent" },
        { correct: true, label: "Relieve" },
        { correct: false, label: "Measure" },
      ],
    },
  },
};

export default item;
