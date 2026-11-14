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
          label: "$$\\lim_{x\\to2}\\bigl(f(x)+g(x)\\bigr)=4$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to2}f(x)\\,g(x)=0$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to2}\\bigl(f(x)^2-g(x)\\bigr)=16$$",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to2}\\dfrac{f(x)}{g(x)}=0$$",
        },
        {
          correct: false,
          label: "$$f(2)=4$$",
        },
      ],
    },
  },
};

export default item;
