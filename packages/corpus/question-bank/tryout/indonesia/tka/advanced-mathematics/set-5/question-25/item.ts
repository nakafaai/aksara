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
          label: "$$\\lim_{x\\to3}f(x)=6$$",
        },
        {
          correct: false,
          label: "Fungsi $$f$$ kontinu di $$x=3$$.",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to3^+}g(x)=1$$",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to3}g(x)=0$$",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to3}(x-3)\\,g(x)=0$$",
        },
      ],
    },
  },
};

export default item;
