import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "class-photo",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "5 susunan" },
        { correct: false, label: "12 susunan" },
        { correct: true, label: "24 susunan" },
        { correct: false, label: "60 susunan" },
        { correct: false, label: "120 susunan" },
      ],
    },
  },
};

export default item;
