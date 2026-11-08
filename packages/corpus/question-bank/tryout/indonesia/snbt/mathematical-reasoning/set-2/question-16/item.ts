import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "money-changer",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "657 ringgit" },
        { correct: false, label: "665 ringgit" },
        { correct: false, label: "669 ringgit" },
        { correct: false, label: "672 ringgit" },
        { correct: false, label: "677 ringgit" },
      ],
    },
  },
};

export default item;
