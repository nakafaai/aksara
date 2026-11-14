import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "perahu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(9) _meskipun demikian_, (14) _sebaliknya_",
        },
        {
          correct: false,
          label: "(9) _sebaliknya_, (14) _oleh karena itu_",
        },
        {
          correct: true,
          label: "(9) _sebaliknya_, (14) _meskipun demikian_",
        },
        {
          correct: false,
          label: "(9) _sebaliknya_, (14) _meskipun_",
        },
        {
          correct: false,
          label: "(9) _oleh karena itu_, (14) _meskipun demikian_",
        },
      ],
    },
  },
};

export default item;
