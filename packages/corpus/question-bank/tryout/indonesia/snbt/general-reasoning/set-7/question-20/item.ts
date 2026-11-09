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
          label: "Gedung E adalah gedung yang paling rendah.",
        },
        {
          correct: false,
          label: "Gedung B adalah gedung tertinggi kedua.",
        },
        {
          correct: true,
          label: "Gedung A adalah gedung yang paling tinggi.",
        },
        {
          correct: false,
          label: "Gedung E lebih tinggi daripada gedung D.",
        },
        {
          correct: false,
          label: "Gedung C adalah gedung yang paling rendah.",
        },
      ],
    },
  },
};

export default item;
