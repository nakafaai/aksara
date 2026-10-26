import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "empat-puluh-delapan-koma-tiga-lima-persen.",
        },
        {
          correct: true,
          label: "$$48{,}35\\%$$.",
        },
        {
          correct: false,
          label: "$$48{,}35\\text{-}\\%$$.",
        },
        {
          correct: false,
          label: "$$48{,}35$$.",
        },
        {
          correct: false,
          label: "$$4835\\%$$.",
        },
      ],
    },
  },
};

export default item;
