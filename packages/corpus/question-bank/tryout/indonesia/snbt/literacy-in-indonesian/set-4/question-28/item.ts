import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "choice-overload",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Meminta pekerja baru yang belum paham asuransi memilih dari $$5$$ atau $$30$$ paket asuransi kesehatan yang berbeda dalam banyak syarat.",
        },
        {
          correct: false,
          label:
            "Mengulang percobaan selai di toko yang sama dengan $$6$$ dan $$24$$ rasa, agar hasilnya dapat dibandingkan langsung.",
        },
        {
          correct: false,
          label:
            "Meminta pembeli umum memilih kaus dari $$5$$ atau $$30$$ warna, dengan harga dan model yang sama.",
        },
        {
          correct: false,
          label:
            "Meminta agen asuransi berpengalaman memilih dari $$5$$ atau $$30$$ paket asuransi kesehatan yang berbeda dalam banyak syarat.",
        },
        {
          correct: false,
          label:
            "Meminta pembeli yang terburu-buru memilih dari $$5$$ atau $$30$$ merek air mineral yang hampir sama.",
        },
      ],
    },
  },
};

export default item;
