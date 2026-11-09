import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "senior-exercise",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Setelah",
        },
        {
          correct: false,
          label: "Sebelum",
        },
        {
          correct: false,
          label: "Meskipun",
        },
        {
          correct: false,
          label: "Agar",
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
