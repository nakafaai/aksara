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
          label:
            "Membujuk Bayu agar meninggalkan bengkel dan ikut kuliah pertanian.",
        },
        {
          correct: false,
          label:
            "Mendukung penjualan sawah kepada pembeli dari kota dengan cara yang lebih menguntungkan.",
        },
        {
          correct: false,
          label:
            "Menyalahkan Pak Karta karena tidak lagi mampu mengolah sawah.",
        },
        {
          correct: true,
          label:
            "Menyelamatkan sawah dengan menggabungkan keahlian Bayu dan ilmu pertanian Ningsih.",
        },
        {
          correct: false,
          label:
            "Meminta dosennya membeli sawah keluarga untuk lahan percobaan kampus.",
        },
      ],
    },
  },
};

export default item;
