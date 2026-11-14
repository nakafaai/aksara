import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "kecapi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Oleh karena itu, pucuk dari pohon itu dipakai untuk paling sedikit seperlima bibit menteng.",
        },
        {
          correct: false,
          label:
            "Meskipun pucuk dari pohon itu dipakai untuk paling banyak seperlima bibit menteng.",
        },
        {
          correct: false,
          label:
            "Bahkan, pucuk dari pohon itu dipakai untuk paling banyak seperlima bibit menteng.",
        },
        {
          correct: true,
          label:
            "Meskipun demikian, pucuk dari pohon itu dipakai untuk paling banyak seperlima bibit menteng.",
        },
        {
          correct: false,
          label:
            "Sebaliknya, pucuk dari pohon itu dipakai untuk paling banyak seperlima bibit menteng.",
        },
      ],
    },
  },
};

export default item;
