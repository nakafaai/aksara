import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "logical-equivalence",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jika Rani naik bus atau menunda perjalanan, tiket kereta habis.",
        },
        {
          correct: false,
          label:
            "Jika tiket kereta tidak habis, Rani tidak naik bus dan tidak menunda perjalanan.",
        },
        {
          correct: true,
          label:
            "Jika tiket kereta habis dan Rani tidak naik bus, Rani menunda perjalanan.",
        },
        {
          correct: false,
          label:
            "Jika Rani tidak naik bus atau tidak menunda perjalanan, tiket kereta tidak habis.",
        },
        {
          correct: false,
          label:
            "Tiket kereta habis, tetapi Rani tidak naik bus dan tidak menunda perjalanan.",
        },
      ],
    },
  },
};

export default item;
