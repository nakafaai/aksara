import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "loud-exhaust",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua sepeda motor di Jalan Cendana terlalu bising.",
        },
        {
          correct: true,
          label:
            "Pada dua malam hari kerja, 18 dari 80 sepeda motor yang diukur petugas menghasilkan suara di atas 90 dB.",
        },
        {
          correct: false,
          label: "Sebanyak 62 sepeda motor menghasilkan suara di atas 90 dB.",
        },
        {
          correct: false,
          label:
            "Pengukuran membuktikan bahwa jalan itu sama bisingnya setiap malam.",
        },
        {
          correct: false,
          label: "Warga Jalan Cendana tidak bisa tidur setiap malam.",
        },
      ],
    },
  },
};

export default item;
