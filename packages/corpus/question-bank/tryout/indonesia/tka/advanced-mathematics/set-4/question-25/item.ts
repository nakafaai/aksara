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
          label: "$$\\lim_{x\\to1}f(x)=0$$",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to3}f(x)=4$$",
        },
        {
          correct: true,
          label: "Fungsi $$f$$ kontinu di $$x=1$$.",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to3^+}f(x)=4$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to\\infty}\\frac{f(x)}{x}=-1$$",
        },
      ],
    },
  },
};

export default item;
