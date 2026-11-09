import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "kantong",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Aturan pungutan kantong plastik gagal sepenuhnya.",
        },
        {
          correct: false,
          label: "Warga kota itu tidak peduli terhadap lingkungan.",
        },
        {
          correct: false,
          label:
            "Pemakaian plastik oleh warga naik $$40\\%$$ setelah aturan berlaku.",
        },
        {
          correct: false,
          label:
            "Pungutan kantong plastik perlu dinaikkan dan diberlakukan juga pada kantong sampah agar penjualan kantong sampah turun kembali seperti sebelum aturan berlaku.",
        },
        {
          correct: true,
          label:
            "Penurunan kantong plastik belanja belum tentu berarti pemakaian plastik warga turun sebanyak itu, karena sebagian warga tampaknya beralih membeli kantong sampah.",
        },
      ],
    },
  },
};

export default item;
