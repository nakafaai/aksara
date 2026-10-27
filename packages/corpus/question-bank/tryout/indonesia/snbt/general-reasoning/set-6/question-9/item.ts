import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "SUSAHNYA" },
        { correct: false, label: "MENANGIS" },
        { correct: false, label: "SEMANGAT" },
        { correct: true, label: "UTBKSERU" },
        { correct: false, label: "BERSEDIH" },
      ],
    },
  },
};

export default item;
