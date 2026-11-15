import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "survivorship-bias",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menyimpulkan bahwa sepeda motor buatan dulu lebih awet karena motor tua yang masih dipakai di jalan kondisinya baik.",
        },
        {
          correct: true,
          label:
            "Menilai keunggulan reksa dana dari reksa dana yang masih ada sekarang, tanpa menghitung yang sudah ditutup karena merugi.",
        },
        {
          correct: false,
          label:
            "Membandingkan nilai siswa yang dibagi secara acak ke dalam dua metode belajar yang berbeda.",
        },
        {
          correct: true,
          label:
            "Menyimpulkan bahwa lagu-lagu zaman dulu lebih bagus karena lagu lama yang masih sering diputar sekarang semuanya bagus.",
        },
        {
          correct: false,
          label:
            "Menyurvei secara acak semua lulusan SMA di sebuah kota, termasuk yang tidak melanjutkan kuliah.",
        },
      ],
    },
  },
};

export default item;
