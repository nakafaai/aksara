import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "dataran tinggi.",
        },
        {
          correct: false,
          label: "fenomena embun.",
        },
        {
          correct: false,
          label: "hamparan rumput.",
        },
        {
          correct: false,
          label: "embun es.",
        },
        {
          correct: false,
          label: "masih berada.",
        },
      ],
    },
  },
};

export default item;
