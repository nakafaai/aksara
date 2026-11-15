import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "household-spending",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah rupiah untuk makanan sama besar di semua kelompok pengeluaran, sehingga hanya porsinya yang dapat membedakan kesejahteraan kelompok.",
        },
        {
          correct: false,
          label:
            "Porsi makanan lebih mudah dihitung daripada jumlah rupiah, karena tidak memerlukan data pengeluaran.",
        },
        {
          correct: false,
          label:
            "Keluarga yang lebih sejahtera membelanjakan rupiah lebih sedikit untuk makanan daripada keluarga miskin, sehingga jumlah rupiah menyesatkan.",
        },
        {
          correct: false,
          label:
            "Porsi makanan menunjukkan berapa banyak jenis makanan yang dapat dibeli sebuah keluarga.",
        },
        {
          correct: true,
          label:
            "Keluarga sejahtera justru membelanjakan rupiah lebih banyak untuk makanan, tetapi bagian anggaran yang tersisa untuk kebutuhan lain lebih besar.",
        },
      ],
    },
  },
};

export default item;
