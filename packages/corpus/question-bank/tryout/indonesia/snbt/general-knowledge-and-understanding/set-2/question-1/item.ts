import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "polysemy",
  },
  stimulus: "gamelan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Keadaan serasi atau selaras antara dua hal.",
        },
        {
          correct: true,
          label: "Sistem nada yang dipakai dalam karawitan.",
        },
        {
          correct: false,
          label: "Bagian senapan yang berbentuk pipa panjang.",
        },
        {
          correct: false,
          label: "Tempo cepat atau lambatnya sebuah gending.",
        },
        {
          correct: false,
          label: "Syair yang dinyanyikan bersama gending.",
        },
      ],
    },
  },
};

export default item;
