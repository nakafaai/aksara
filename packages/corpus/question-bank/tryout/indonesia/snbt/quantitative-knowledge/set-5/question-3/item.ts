import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Jika (1), (2), dan (3) yang betul.",
        },
        {
          correct: false,
          label: "Jika (1) dan (3) yang betul.",
        },
        {
          correct: false,
          label: "Jika (2) dan (4) yang betul.",
        },
        {
          correct: false,
          label: "Jika semuanya betul.",
        },
        {
          correct: true,
          label: "Jika (4) saja yang betul.",
        },
      ],
    },
  },
};

export default item;
