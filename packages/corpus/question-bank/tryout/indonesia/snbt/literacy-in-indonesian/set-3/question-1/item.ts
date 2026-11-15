import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "wolbachia-mosquito",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Hasil itu layak dipercaya untuk Yogyakarta karena pembandingnya diamati pada periode yang sama, tetapi belum menjawab soal kota lain dan soal pengganti cara lama.",
        },
        {
          correct: false,
          label:
            "Hasil itu perlu diuji ulang di Yogyakarta karena kasus demam berdarah naik turun dari tahun ke tahun, sehingga penurunannya bisa jatuh pada tahun yang sepi.",
        },
        {
          correct: false,
          label:
            "Hasil itu membuktikan bahwa Wolbachia dapat menggantikan pemberantasan sarang, karena nyamuk ber-Wolbachia mampu bertahan tanpa pelepasan ulang.",
        },
        {
          correct: false,
          label:
            "Hasil itu kemungkinan melebih-lebihkan manfaat Wolbachia, karena nyamuk ber-Wolbachia dapat terbang melewati batas klaster ke klaster pembanding.",
        },
        {
          correct: false,
          label:
            "Hasil itu kuat karena pengacakan dilakukan per wilayah, sehingga dapat langsung diterapkan di kota lain yang memiliki nyamuk Aedes aegypti.",
        },
      ],
    },
  },
};

export default item;
