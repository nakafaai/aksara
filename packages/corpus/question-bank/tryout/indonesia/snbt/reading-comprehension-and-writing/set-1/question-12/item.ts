import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "kenikir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "*Oleh karena itu,* dan *Hal itu terjadi karena*",
        },
        {
          correct: false,
          label: "*Meskipun demikian,* dan *Akibatnya,*",
        },
        {
          correct: true,
          label: "*Meskipun demikian,* dan *Hal itu terjadi karena*",
        },
        {
          correct: false,
          label: "*Selain itu,* dan *Hal itu terjadi karena*",
        },
        {
          correct: false,
          label: "*Meskipun demikian,* dan *Dengan kata lain,*",
        },
      ],
    },
  },
};

export default item;
