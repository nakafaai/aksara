import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sinta menerima peninjauan gaji dan mengikuti penilaian promosi.",
        },
        {
          correct: false,
          label:
            "Sinta menerima peninjauan gaji, tetapi tidak mengikuti penilaian promosi.",
        },
        {
          correct: false,
          label:
            "Sinta tidak menerima peninjauan gaji maupun penilaian promosi.",
        },
        {
          correct: false,
          label:
            "Sinta mengikuti penilaian promosi tanpa menerima peninjauan gaji.",
        },
        {
          correct: false,
          label: "Sinta belum menyelesaikan sertifikasi profesi.",
        },
      ],
    },
  },
};

export default item;
