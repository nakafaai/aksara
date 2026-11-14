import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "eye-screening",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hampir semua siswa SMP di Lembah Hijau berpenglihatan buruk.",
        },
        { correct: false, label: "Sebanyak 162 siswa membutuhkan kacamata." },
        {
          correct: false,
          label: "Siswa yang sering salah menyalin terbukti malas.",
        },
        { correct: false, label: "Sebanyak 75 siswa sudah memiliki kacamata." },
        {
          correct: true,
          label:
            "Dari 900 siswa yang diperiksa, 120 membutuhkan kacamata, tetapi baru 45 yang memilikinya.",
        },
      ],
    },
  },
};

export default item;
