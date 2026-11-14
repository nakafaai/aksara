import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Harga satu buku tulis $$\\text{Rp}500$$ lebih mahal daripada harga satu pensil.",
        },
        {
          correct: false,
          label: "Harga satu buku tulis adalah $$\\text{Rp}500$$.",
        },
        {
          correct: false,
          label: "Harga satu buku tulis dua kali harga satu pensil.",
        },
        {
          correct: false,
          label:
            "Harga satu pensil $$\\text{Rp}500$$ lebih mahal daripada harga satu buku tulis.",
        },
        {
          correct: false,
          label:
            "Harga $$1$$ buku tulis dan $$1$$ pensil adalah $$\\text{Rp}2{.}500$$.",
        },
      ],
    },
  },
};

export default item;
