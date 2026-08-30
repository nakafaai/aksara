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
          label: "earphone terbukti menjadi satu-satunya penyebab",
        },
        {
          isCorrect: false,
          label: "transkrip pasti tidak digunakan siapa pun",
        },
        {
          isCorrect: true,
          label:
            "kenaikan terjadi setelah paket perubahan, tetapi belum menunjukkan penyebab tertentu",
        },
        {
          isCorrect: false,
          label: "semua peserta minggu pertama kembali pada minggu kedua",
        },
        {
          isCorrect: false,
          label:
            "angka tersebut membuktikan museum lain akan mendapat hasil sama",
        },
      ],
    },
  },
  stimulusKey: "audio-labels",
};

export default item;
