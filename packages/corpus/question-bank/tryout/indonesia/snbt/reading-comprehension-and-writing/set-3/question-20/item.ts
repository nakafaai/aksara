import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "angkutan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sebaliknya,",
        },
        {
          correct: false,
          label: "Meskipun demikian,",
        },
        {
          correct: false,
          label: "Selain itu,",
        },
        {
          correct: true,
          label: "Akibatnya,",
        },
        {
          correct: false,
          label: "Dengan kata lain,",
        },
      ],
    },
  },
};

export default item;
