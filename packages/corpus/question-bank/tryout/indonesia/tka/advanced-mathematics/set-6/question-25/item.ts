import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "calculus",
    topic: "limits",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\lim_{x\\to0}h(x)=\\frac14$$",
        },
        {
          correct: false,
          label: "$$h(0)=\\frac14$$",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to\\infty}h(x)=1$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to-4^+}h(x)=\\frac12$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to0}x\\,h(x)=0$$",
        },
      ],
    },
  },
};

export default item;
