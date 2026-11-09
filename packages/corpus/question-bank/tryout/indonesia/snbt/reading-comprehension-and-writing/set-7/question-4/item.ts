import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "medicine-return",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Karena",
        },
        {
          correct: true,
          label: "Agar",
        },
        {
          correct: false,
          label: "Meskipun",
        },
        {
          correct: false,
          label: "Setelah",
        },
        {
          correct: false,
          label: "Sehingga",
        },
      ],
    },
  },
};

export default item;
