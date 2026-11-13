import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "ordering",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lusi adalah anggota yang paling tinggi.",
        },
        {
          correct: false,
          label: "Kevin lebih tinggi daripada Mira.",
        },
        {
          correct: false,
          label: "Oki adalah anggota yang paling pendek.",
        },
        {
          correct: true,
          label: "Sekar lebih tinggi daripada Mira.",
        },
        {
          correct: false,
          label: "Sekar lebih tinggi daripada Kevin.",
        },
      ],
    },
  },
};

export default item;
