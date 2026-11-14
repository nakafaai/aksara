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
          label: "$$\\lim_{x\\to2}f(x)=\\frac43$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to\\infty}f(x)=1$$",
        },
        {
          correct: false,
          label: "Fungsi $$f$$ kontinu di $$x=2$$.",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to-1}f(x)$$ ada dan bernilai bilangan real.",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to0}f(x)=2$$",
        },
      ],
    },
  },
};

export default item;
