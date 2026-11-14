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
          label: "$$\\lim_{x\\to2^+}f(x)=3$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to2}f(x)$$ tidak ada.",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to2^-}f(x)=3$$",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to2}f(x)=0$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to-1}f(x)=0$$",
        },
      ],
    },
  },
};

export default item;
