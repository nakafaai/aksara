import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "memperparah." },
        { correct: false, label: "menyebabkan." },
        { correct: true, label: "mengurangi." },
        { correct: false, label: "menumbuhkan." },
        { correct: false, label: "menghilangkan." },
      ],
    },
  },
};

export default item;
