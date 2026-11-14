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
          correct: true,
          label: "$$\\left|\\vec{v}\\right|=3$$",
        },
        {
          correct: false,
          label:
            "Vektor satuan yang searah dengan $$\\vec{v}$$ adalah $$\\frac19\\left(-2\\vec{i}+\\vec{j}+2\\vec{k}\\right)$$.",
        },
        {
          correct: false,
          label:
            "Vektor $$4\\vec{i}-2\\vec{j}-4\\vec{k}$$ searah dengan $$\\vec{v}$$.",
        },
        {
          correct: true,
          label:
            "Sudut antara $$\\vec{v}$$ dan sumbu $$X$$ positif adalah sudut tumpul.",
        },
        {
          correct: true,
          label:
            "Untuk setiap vektor satuan $$\\vec{w}$$ berlaku $$\\vec{v}\\cdot\\vec{w}\\le3$$.",
        },
      ],
    },
  },
};

export default item;
