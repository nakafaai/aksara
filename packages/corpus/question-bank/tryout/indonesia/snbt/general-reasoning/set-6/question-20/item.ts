import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "sufficient-premise",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pohon L lebih tinggi daripada pohon O.",
        },
        {
          correct: false,
          label: "Pohon L lebih rendah daripada pohon N.",
        },
        {
          correct: false,
          label: "Pohon M lebih tinggi daripada pohon L.",
        },
        {
          correct: false,
          label: "Pohon N adalah pohon yang paling tinggi.",
        },
        {
          correct: true,
          label: "Pohon L lebih rendah daripada pohon K.",
        },
      ],
    },
  },
};

export default item;
