import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "lingua-franca",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Bahasa itu sudah dikenal oleh anggota dari berbagai daerah.",
        },
        {
          correct: false,
          label:
            "Bahasa itu dituturkan paling banyak anggota sebagai bahasa ibu.",
        },
        {
          correct: true,
          label:
            "Bahasa itu tidak mengharuskan anggota memilih kata menurut kedudukan lawan bicara.",
        },
        {
          correct: true,
          label:
            "Bahasa itu tidak terkesan mengutamakan kelompok asal salah satu anggota.",
        },
        {
          correct: false,
          label: "Bahasa itu dipakai oleh ketua organisasi sejak kecil.",
        },
      ],
    },
  },
};

export default item;
