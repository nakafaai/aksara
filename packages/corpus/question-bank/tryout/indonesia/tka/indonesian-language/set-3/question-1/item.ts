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
          label:
            "transkrip mungkin tidak memengaruhi hasil karena peserta tidak diminta melaporkan penggunaannya",
        },
        {
          isCorrect: false,
          label:
            "jumlah peserta yang sama menunjukkan kelompok minggu pertama dan kedua identik",
        },
        {
          isCorrect: false,
          label:
            "angka tersebut membuktikan museum lain akan mendapat hasil sama",
        },
        {
          isCorrect: true,
          label:
            "kenaikan terjadi setelah paket perubahan, tetapi belum menunjukkan penyebab tertentu",
        },
      ],
    },
  },
  stimulusKey: "audio-labels",
};

export default item;
