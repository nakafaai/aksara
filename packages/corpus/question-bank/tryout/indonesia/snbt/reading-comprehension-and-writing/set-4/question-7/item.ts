import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "cassava-flour",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Karena",
        },
        {
          correct: false,
          label: "Meskipun",
        },
        {
          correct: false,
          label: "Sehingga",
        },
        {
          correct: false,
          label: "Bahkan",
        },
        {
          correct: false,
          label: "Agar",
        },
      ],
    },
  },
};

export default item;
