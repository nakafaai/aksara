import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: false,
          label: "Pada minggu ke-$$6$$ ia berenang $$15$$ bolak-balik.",
        },
        {
          isCorrect: true,
          label:
            "Dari minggu ke-$$4$$ ke minggu ke-$$5$$, banyak bolak-balik bertambah $$4$$.",
        },
        {
          isCorrect: false,
          label:
            "Untuk setiap bilangan asli $$n$$, banyak bolak-balik pada minggu ke-$$n$$ sama dengan $$2n$$.",
        },
        {
          isCorrect: true,
          label:
            "Untuk setiap bilangan asli $$n$$, banyak bolak-balik pada minggu ke-$$n$$ sama dengan $$\\frac{n^2-n+4}{2}$$.",
        },
        {
          isCorrect: true,
          label:
            "Mulai minggu ke-$$7$$, banyak bolak-balik dalam satu minggu lebih dari $$20$$.",
        },
      ],
    },
  },
};

export default item;
