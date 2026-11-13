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
          label: "Satria tiba paling awal.",
        },
        {
          correct: false,
          label: "Olivia tiba sebelum Tiara.",
        },
        {
          correct: true,
          label: "Olivia tiba sebelum Ratri.",
        },
        {
          correct: false,
          label: "Ratri tiba pada urutan keempat.",
        },
        {
          correct: false,
          label: "Naufal tiba sebelum Pandu.",
        },
      ],
    },
  },
};

export default item;
