import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "refill-depot",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pesan itu tepat karena ada depot yang gagal uji",
        },
        {
          correct: false,
          label: "pesan itu tepat karena air kemasan bermerek lebih mahal",
        },
        {
          correct: false,
          label: "pesan itu salah karena semua depot lolos uji",
        },
        {
          correct: false,
          label: "pesan itu tidak berhubungan dengan pemeriksaan puskesmas",
        },
        {
          correct: true,
          label:
            "pesan itu berlebihan karena hanya 4 dari 20 depot yang gagal dan masalahnya dapat dicegah dengan perawatan alat",
        },
      ],
    },
  },
};

export default item;
