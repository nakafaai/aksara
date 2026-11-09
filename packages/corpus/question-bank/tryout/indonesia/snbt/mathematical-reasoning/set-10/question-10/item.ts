import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "class-photo",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "24 susunan" },
        { correct: true, label: "48 susunan" },
        { correct: false, label: "60 susunan" },
        { correct: false, label: "72 susunan" },
        { correct: false, label: "96 susunan" },
      ],
    },
  },
};

export default item;
