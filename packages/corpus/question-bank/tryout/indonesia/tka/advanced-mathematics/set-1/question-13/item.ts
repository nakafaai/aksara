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
          label:
            "Ada nilai $$k$$ yang membuat $$\\vec{u}$$ sejajar dengan $$\\vec{v}$$.",
        },
        {
          correct: true,
          label:
            "Untuk $$k=0$$, vektor $$\\vec{u}$$ tegak lurus vektor $$\\vec{v}$$.",
        },
        {
          correct: true,
          label:
            "Untuk $$k=4$$, sudut antara $$\\vec{u}$$ dan $$\\vec{v}$$ lancip.",
        },
        {
          correct: true,
          label:
            "Untuk $$k=2$$, panjang $$\\vec{v}$$ sama dengan panjang $$\\vec{u}$$.",
        },
        {
          correct: false,
          label: "Untuk $$k=-1$$, berlaku $$\\vec{u}\\cdot\\vec{v}=2$$.",
        },
      ],
    },
  },
};

export default item;
