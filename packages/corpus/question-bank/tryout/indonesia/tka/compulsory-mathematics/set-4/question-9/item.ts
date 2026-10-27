import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pada minggu ke-$$6$$ ia berenang $$15$$ bolak-balik.",
        },
        {
          correct: true,
          label:
            "Dari minggu ke-$$4$$ ke minggu ke-$$5$$, banyak bolak-balik bertambah $$4$$.",
        },
        {
          correct: false,
          label:
            "Untuk setiap bilangan asli $$n$$, banyak bolak-balik pada minggu ke-$$n$$ sama dengan $$2n$$.",
        },
        {
          correct: true,
          label:
            "Untuk setiap bilangan asli $$n$$, banyak bolak-balik pada minggu ke-$$n$$ sama dengan $$\\frac{n^2-n+4}{2}$$.",
        },
        {
          correct: true,
          label:
            "Mulai minggu ke-$$7$$, banyak bolak-balik dalam satu minggu lebih dari $$20$$.",
        },
      ],
    },
  },
};

export default item;
