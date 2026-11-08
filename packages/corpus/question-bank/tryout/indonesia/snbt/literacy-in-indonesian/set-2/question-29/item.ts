import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "rice-field-drama",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Membujuk Bayu agar ikut kuliah pertanian.",
        },
        {
          correct: false,
          label:
            "Mendukung penjualan sawah dengan cara yang lebih menguntungkan.",
        },
        {
          correct: false,
          label:
            "Menyalahkan Pak Karta karena tidak lagi mampu mengolah sawah.",
        },
        {
          correct: true,
          label:
            "Menyelesaikan masalah tanpa menjual sawah dengan menggabungkan keahlian Bayu dan pengetahuan pertanian Ningsih.",
        },
        {
          correct: false,
          label: "Meminta dosennya membeli sawah keluarga.",
        },
      ],
    },
  },
};

export default item;
