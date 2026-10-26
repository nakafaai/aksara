import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "sus" },
        { correct: false, label: "biskuit" },
        { correct: false, label: "molen" },
        { correct: false, label: "pia" },
        { correct: false, label: "tart" },
      ],
    },
  },
};

export default item;
