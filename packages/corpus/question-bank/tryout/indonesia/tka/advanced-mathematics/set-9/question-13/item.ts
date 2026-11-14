import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Vektor $$\\vec{a}$$ tegak lurus vektor $$\\vec{b}$$.",
        },
        {
          correct: true,
          label: "$$\\vec{c}=\\vec{b}-2\\vec{a}$$",
        },
        {
          correct: false,
          label:
            "$$\\left|\\vec{c}\\right|=\\left|\\vec{b}\\right|+2\\left|\\vec{a}\\right|$$",
        },
        {
          correct: true,
          label: "Sudut antara $$\\vec{a}$$ dan $$\\vec{c}$$ tumpul.",
        },
        {
          correct: true,
          label:
            "Vektor $$\\vec{a}+\\vec{b}$$ sejajar dengan vektor $$8\\vec{i}+4\\vec{k}$$.",
        },
      ],
    },
  },
};

export default item;
