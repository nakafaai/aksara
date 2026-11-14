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
          label: "$$\\lim_{x\\to\\infty}\\frac{x^2+1}{2x^2-x}=\\frac12$$",
        },
        {
          correct: false,
          label:
            "$$\\lim_{x\\to\\infty}\\left(\\sqrt{x+1}-\\sqrt x\\right)=1$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to\\infty}\\frac{3x+\\sin x}{x}=3$$",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to0^+}\\frac{\\sin x}{x^2}=1$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to\\infty}x\\left(1-\\cos\\frac1x\\right)=0$$",
        },
      ],
    },
  },
};

export default item;
