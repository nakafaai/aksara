import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "rooftop-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Meskipun demikian",
        },
        {
          correct: false,
          label: "Oleh karena itu",
        },
        {
          correct: false,
          label: "Dengan demikian",
        },
        {
          correct: false,
          label: "Selain itu",
        },
        {
          correct: false,
          label: "Akibatnya",
        },
      ],
    },
  },
};

export default item;
