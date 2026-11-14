import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "rate-comparison",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Setelah disusul mesin Y untuk pertama kalinya, mesin X tidak pernah lagi mencetak lebih banyak lembar daripada mesin Y.",
        },
        {
          column: 1,
          label:
            "Tepat $$30$$ menit setelah kedua mesin mulai, hasil mesin Y $$60$$ lembar lebih banyak daripada hasil mesin X.",
        },
        {
          column: 1,
          label:
            "Jika jeda mesin X dipersingkat menjadi $$1$$ menit dan lama kerjanya tetap $$8$$ menit, hasil mesin X tidak pernah kurang dari hasil mesin Y.",
        },
        {
          column: 2,
          label:
            "Untuk mencetak $$1{.}200$$ lembar, mesin X memerlukan waktu lebih singkat daripada mesin Y.",
        },
      ],
    },
  },
};

export default item;
