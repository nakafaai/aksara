import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "water-turn",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "setiap petani di bagian hulu",
        },
        {
          correct: false,
          label: "setiap petani di bagian hilir",
        },
        {
          correct: true,
          label: "petugas yang ditunjuk kelompok tani",
        },
        {
          correct: false,
          label: "kepala Desa Sukadamai",
        },
        {
          correct: false,
          label: "petani yang sawahnya sedang kekeringan",
        },
      ],
    },
  },
};

export default item;
