import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$P>Q$$" },
        { correct: true, label: "$$Q>P$$" },
        { correct: false, label: "$$P=Q$$" },
        {
          correct: false,
          label:
            "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari tiga pilihan di atas",
        },
      ],
    },
  },
};

export default item;
