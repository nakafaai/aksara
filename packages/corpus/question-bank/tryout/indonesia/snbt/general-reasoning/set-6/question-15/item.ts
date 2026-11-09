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
          label: "S tampil pada urutan ketiga.",
        },
        {
          correct: false,
          label: "U tampil pada urutan terakhir.",
        },
        {
          correct: false,
          label: "P tampil pada urutan ketiga.",
        },
        {
          correct: false,
          label: "Q tampil pada urutan terakhir.",
        },
        {
          correct: true,
          label: "T tampil pada urutan pertama.",
        },
      ],
    },
  },
};

export default item;
