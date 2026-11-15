import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "choice-overload",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pertanyaan yang lebih tepat adalah dalam keadaan apa banyak pilihan merugikan, bukan apakah banyak pilihan itu buruk.",
        },
        {
          correct: false,
          label:
            "Toko sebaiknya selalu mengurangi pilihan barang agar pembeli tidak bingung.",
        },
        {
          correct: true,
          label:
            "Satu percobaan yang terkenal belum cukup untuk dijadikan aturan umum.",
        },
        {
          correct: false,
          label:
            "Percobaan selai terbukti keliru, sehingga sebaiknya tidak lagi dikutip.",
        },
        {
          correct: true,
          label:
            "Memudahkan pembeli membandingkan pilihan dapat mengurangi risiko kelebihan pilihan.",
        },
      ],
    },
  },
};

export default item;
