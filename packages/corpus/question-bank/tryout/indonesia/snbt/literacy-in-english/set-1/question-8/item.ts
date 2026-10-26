import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "objective" },
        { correct: false, label: "pessimistic" },
        { correct: false, label: "assertive" },
        { correct: false, label: "responsive" },
        { correct: false, label: "reactive" },
      ],
    },
  },
};

export default item;
