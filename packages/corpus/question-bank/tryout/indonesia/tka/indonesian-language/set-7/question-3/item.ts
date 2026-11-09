import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "braille-signs",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua penyandang tunanetra kini dapat bepergian sendiri tanpa kesulitan.",
        },
        {
          correct: true,
          label:
            "Dalam uji coba dengan enam peserta, waktu rata-rata menemukan jalur turun dari sebelas menjadi sekitar empat menit setelah sebagian papan dipindahkan.",
        },
        {
          correct: false,
          label:
            "Papan braille terbukti menghapus seluruh masalah di terminal.",
        },
        {
          correct: false,
          label: "Waktu pencarian turun tujuh menit menjadi sebelas menit.",
        },
        {
          correct: false,
          label:
            "Terminal itu adalah terminal paling ramah tunanetra di Indonesia.",
        },
      ],
    },
  },
};

export default item;
