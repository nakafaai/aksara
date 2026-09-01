import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Hanya 62 mililiter yang keluar, jadi 88 mililiter lainnya pasti gagal memasuki permukaan campuran organik.",
        },
        {
          isCorrect: false,
          label:
            "Seluruh air telah masuk setelah 15 menit, jadi campuran organik dan pasir memiliki perkolasi yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Hampir seluruh air sudah masuk setelah lima menit dan seluruhnya masuk setelah 15 menit, tetapi keluaran yang lebih kecil menunjukkan banyak air masih tersimpan dalam kolom.",
        },
        {
          isCorrect: false,
          label:
            "Campuran organik memiliki infiltrasi lebih lambat daripada lempung karena air di permukaannya tersisa lebih sedikit setelah lima menit.",
        },
        {
          isCorrect: false,
          label:
            "Keluaran kecil membuktikan penguapan tinggi meskipun bacaan menyatakan penguapan dapat diabaikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
