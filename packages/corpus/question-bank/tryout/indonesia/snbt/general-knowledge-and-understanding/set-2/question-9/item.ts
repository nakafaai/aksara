import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sempit.",
        },
        {
          correct: false,
          label: "terbatas.",
        },
        {
          correct: false,
          label: "kecil.",
        },
        {
          correct: false,
          label: "berkurang.",
        },
        {
          correct: true,
          label: "tinggi.",
        },
      ],
    },
  },
};

export default item;
