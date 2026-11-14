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
          label: "Oki adalah peserta yang pertama tiba.",
        },
        {
          correct: false,
          label: "Umar tiba sebelum Taufik.",
        },
        {
          correct: false,
          label: "Vina tiba sebelum Sinta.",
        },
        {
          correct: false,
          label: "Taufik adalah peserta keempat yang tiba.",
        },
        {
          correct: true,
          label: "Sinta adalah peserta kelima yang tiba.",
        },
      ],
    },
  },
};

export default item;
