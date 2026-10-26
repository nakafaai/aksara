import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "namun." },
        { correct: true, label: "tetapi." },
        { correct: false, label: "meskipun." },
        { correct: false, label: "sedangkan." },
        { correct: false, label: "melainkan." },
      ],
    },
  },
};

export default item;
