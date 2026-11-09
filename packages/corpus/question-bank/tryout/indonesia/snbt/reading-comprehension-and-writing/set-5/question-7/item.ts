import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "goat-milk",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Namun",
        },
        {
          correct: false,
          label: "Sebaliknya",
        },
        {
          correct: false,
          label: "Misalnya",
        },
        {
          correct: false,
          label: "Meskipun demikian",
        },
        {
          correct: true,
          label: "Oleh karena itu",
        },
      ],
    },
  },
};

export default item;
