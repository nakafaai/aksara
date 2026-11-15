import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "rainfall-harvest",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ia menyamakan turunnya produksi total dengan turunnya hasil per hektare, padahal sebagian besar penurunan berasal dari luas panen yang menyusut.",
        },
        {
          correct: false,
          label:
            "Ia salah menghitung penurunan produksi, karena produksi ketiga kabupaten sebenarnya turun kurang dari sepersepuluh.",
        },
        {
          correct: false,
          label:
            "Ia benar soal hasil per hektare, tetapi keliru menganggap El Nino sebagai penyebab kemarau tahun itu.",
        },
        {
          correct: false,
          label:
            "Ia menyamakan turunnya produksi total dengan turunnya hasil per hektare, padahal hasil per hektare di ketiga kabupaten justru naik pada tahun itu.",
        },
        {
          correct: false,
          label:
            "Ia hanya memakai data dua tahun, padahal dampak El Nino baru terlihat setelah lima tahun.",
        },
      ],
    },
  },
};

export default item;
