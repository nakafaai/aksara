import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "framing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kelompok pertama memilih P dan kelompok kedua memilih S, walaupun P sama dengan R dan Q sama dengan S.",
        },
        {
          correct: false,
          label:
            "Kelompok pertama memilih Q dan kelompok kedua memilih R, karena dalam bingkai keuntungan orang berani mengambil risiko.",
        },
        {
          correct: false,
          label:
            "Kedua kelompok memilih rencana yang pasti, karena rata-rata semua rencana sama.",
        },
        {
          correct: false,
          label:
            "Kelompok pertama memilih P dan kelompok kedua memilih R, karena keduanya rencana yang pasti dan isinya sama.",
        },
        {
          correct: false,
          label:
            "Kelompok pertama memilih P dan kelompok kedua memilih S, karena rata-rata rencana S merusak lebih sedikit rumah daripada rencana R.",
        },
      ],
    },
  },
};

export default item;
