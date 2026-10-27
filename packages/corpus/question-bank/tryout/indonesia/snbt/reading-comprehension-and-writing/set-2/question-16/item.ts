import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "bahkan.",
        },
        {
          correct: false,
          label: "dan.",
        },
        {
          correct: false,
          label: "ketika.",
        },
        {
          correct: true,
          label: "bahwa.",
        },
        {
          correct: false,
          label: "jika.",
        },
      ],
    },
  },
};

export default item;
