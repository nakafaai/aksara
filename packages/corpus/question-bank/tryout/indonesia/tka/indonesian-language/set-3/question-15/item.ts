import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "program dapat dinilai mengurangi kemasan terutama dari jumlah botol yang terlihat",
        },
        {
          correct: false,
          label:
            "pola tiga minggu sudah cukup untuk menutup kemungkinan penjelasan lain",
        },
        {
          correct: false,
          label:
            "kenaikan volume isi ulang menunjukkan sebagian besar siswa menggunakan stasiun secara rutin",
        },
        {
          correct: false,
          label:
            "hasil tiga minggu cukup untuk memprediksi dampak program pada sekolah dengan kondisi serupa",
        },
        {
          correct: true,
          label:
            "data awal menunjukkan penggunaan meningkat dan jumlah botol yang terlihat menurun",
        },
      ],
    },
  },
  stimulus: "refill-station",
};

export default item;
