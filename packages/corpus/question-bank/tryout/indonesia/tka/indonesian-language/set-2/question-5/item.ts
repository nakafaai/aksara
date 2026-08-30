import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "membuktikan 28 persen semua benda dapat diperbaiki",
        },
        {
          isCorrect: true,
          label:
            "menggambarkan kegiatan peserta, tetapi tidak dapat digeneralisasi",
        },
        {
          isCorrect: false,
          label: "membuktikan perbaikan selalu lebih murah",
        },
        {
          isCorrect: false,
          label: "tidak memiliki arti karena bukan angka bulat",
        },
        {
          isCorrect: false,
          label: "menjamin hasil yang sama pada sekolah lain",
        },
      ],
    },
  },
  stimulusKey: "repair-clinic",
};

export default item;
