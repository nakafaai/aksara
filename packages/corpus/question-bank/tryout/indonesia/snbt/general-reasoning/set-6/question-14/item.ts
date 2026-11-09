import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "ordering",
  },
  stimulus: "urutan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pertama",
        },
        {
          correct: true,
          label: "kedua",
        },
        {
          correct: false,
          label: "ketiga",
        },
        {
          correct: false,
          label: "kelima",
        },
        {
          correct: false,
          label: "keenam",
        },
      ],
    },
  },
};

export default item;
