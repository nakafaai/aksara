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
          correct: false,
          label: "Fungsi $$f$$ terdefinisi di $$x=2$$ dengan $$f(2)=7$$.",
        },
        {
          correct: true,
          label: "Nilai $$a$$ adalah $$3$$.",
        },
        {
          correct: false,
          label: "$$\\lim_{x\\to\\infty}\\frac{f(x)}{x}=2$$",
        },
        {
          correct: true,
          label: "Nilai $$b$$ adalah $$-10$$.",
        },
        {
          correct: true,
          label: "$$\\lim_{x\\to-5}f(x)=0$$",
        },
      ],
    },
  },
};

export default item;
