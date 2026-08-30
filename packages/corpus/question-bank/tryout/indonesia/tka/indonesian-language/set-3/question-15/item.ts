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
          label: "program pasti menghapus semua kemasan",
        },
        {
          isCorrect: false,
          label: "tidak ada lagi faktor yang perlu diperiksa",
        },
        {
          isCorrect: false,
          label: "setiap siswa selalu memakai stasiun",
        },
        {
          isCorrect: true,
          label:
            "data awal menunjukkan penggunaan meningkat dan botol terlihat menurun",
        },
        {
          isCorrect: false,
          label: "hasil tiga minggu berlaku untuk semua sekolah",
        },
      ],
    },
  },
  stimulusKey: "refill-station",
};

export default item;
