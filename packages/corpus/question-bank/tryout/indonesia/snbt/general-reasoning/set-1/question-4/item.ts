import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "kantin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Lebih dari $$45$$ siswa yang berhenti membeli minuman tinggi gula masih membeli minuman lain di kantin pada minggu sesudah label.",
        },
        {
          correct: false,
          label:
            "Semua siswa yang membeli minuman pada minggu sesudah label juga membeli minuman pada minggu sebelum label.",
        },
        {
          correct: false,
          label:
            "Lebih dari $$60$$ siswa yang berhenti membeli minuman tinggi gula masih membeli minuman lain di kantin pada minggu sesudah label.",
        },
        {
          correct: false,
          label:
            "Siswa yang baru membeli minuman tinggi gula pada minggu sesudah label tidak memperhatikan label.",
        },
        {
          correct: false,
          label:
            "Setiap siswa yang berhenti membeli minuman tinggi gula membaca label sebelum memilih minuman.",
        },
      ],
    },
  },
};

export default item;
