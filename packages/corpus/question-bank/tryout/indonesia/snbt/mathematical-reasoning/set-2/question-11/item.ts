import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "exam-scoring",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Peserta yang menjawab semua soal dapat memperoleh skor total 102.",
        },
        {
          column: 1,
          label: "Skor total 159 tidak mungkin diperoleh peserta mana pun.",
        },
        {
          column: 1,
          label: "Skor total yang negatif mungkin diperoleh seorang peserta.",
        },
        {
          column: 2,
          label:
            "Skor total 0 hanya mungkin diperoleh jika peserta tidak menjawab satu soal pun.",
        },
      ],
    },
  },
};

export default item;
