import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "program dapat dinilai mengurangi kemasan terutama dari jumlah botol yang terlihat",
        },
        {
          isCorrect: false,
          label:
            "pola tiga minggu sudah cukup untuk menutup kemungkinan penjelasan lain",
        },
        {
          isCorrect: false,
          label:
            "kenaikan volume isi ulang menunjukkan sebagian besar siswa menggunakan stasiun secara rutin",
        },
        {
          isCorrect: false,
          label:
            "hasil tiga minggu cukup untuk memprediksi dampak program pada sekolah dengan kondisi serupa",
        },
        {
          isCorrect: true,
          label:
            "data awal menunjukkan penggunaan meningkat dan botol terlihat menurun",
        },
      ],
    },
  },
  stimulusKey: "refill-station",
};

export default item;
