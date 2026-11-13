import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "wolbachia-mosquito",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Proporsi pasien demam yang positif dengue di klaster pembanding naik, sehingga efikasi tampak lebih besar daripada sebenarnya.",
        },
        {
          correct: true,
          label:
            "Perbandingan jumlah kasus tercatat akan melebih-lebihkan manfaat pelepasan, sedangkan perbandingan proporsi pasien positif relatif tidak terganggu.",
        },
        {
          correct: false,
          label:
            "Perbandingan jumlah kasus tercatat akan meremehkan manfaat pelepasan, karena klaster pembanding kini lebih cepat menangani pasien.",
        },
        {
          correct: false,
          label:
            "Perbandingan proporsi pasien positif menjadi tidak sah, karena pasien dari kedua kelompok klaster tidak lagi sebanding.",
        },
        {
          correct: false,
          label:
            "Perubahan itu tidak memengaruhi perbandingan apa pun, karena pengacakan klaster sudah menyamakan kedua kelompok sejak awal.",
        },
      ],
    },
  },
};

export default item;
