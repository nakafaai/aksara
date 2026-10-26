import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hanya $$62$$ mililiter yang keluar, jadi $$88$$ mililiter lainnya pasti gagal memasuki permukaan campuran organik.",
        },
        {
          correct: false,
          label:
            "Seluruh air telah masuk setelah $$15$$ menit, jadi campuran organik dan pasir memiliki perkolasi yang sama.",
        },
        {
          correct: true,
          label:
            "Hampir seluruh air sudah masuk setelah lima menit dan seluruhnya masuk setelah $$15$$ menit, tetapi keluaran yang lebih kecil menunjukkan banyak air masih tersimpan dalam kolom.",
        },
        {
          correct: false,
          label:
            "Campuran organik memiliki infiltrasi lebih lambat daripada lempung karena air di permukaannya tersisa lebih sedikit setelah lima menit.",
        },
        {
          correct: false,
          label:
            "Keluaran kecil membuktikan penguapan tinggi meskipun bacaan menyatakan penguapan dapat diabaikan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
