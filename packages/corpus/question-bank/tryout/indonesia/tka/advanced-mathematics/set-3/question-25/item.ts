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
          label: "$$\\lim_{x\\to\\infty}f(x)=2$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to1^+}f(x)=\\infty$$",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to-1}f(x)=-\\frac12$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to0}\\frac{f(x)}{x}=-3$$",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to\\infty}x\\big(f(x)-2\\big)=0$$",
        },
      ],
    },
  },
};

export default item;
