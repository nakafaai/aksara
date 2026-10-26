import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "earphone terbukti menjadi satu-satunya penyebab",
        },
        {
          correct: false,
          label:
            "transkrip mungkin tidak memengaruhi hasil karena peserta tidak diminta melaporkan penggunaannya",
        },
        {
          correct: false,
          label:
            "jumlah peserta yang sama menunjukkan kelompok minggu pertama dan kedua identik",
        },
        {
          correct: false,
          label:
            "angka tersebut membuktikan museum lain akan mendapat hasil sama",
        },
        {
          correct: true,
          label:
            "kenaikan terjadi setelah paket perubahan, tetapi belum menunjukkan penyebab tertentu",
        },
      ],
    },
  },
  stimulus: "audio-labels",
};

export default item;
