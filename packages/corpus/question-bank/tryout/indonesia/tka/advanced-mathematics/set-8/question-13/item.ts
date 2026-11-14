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
          label: "Jika $$\\vec{a}$$ tegak lurus $$\\vec{b}$$, maka $$m=-3$$.",
        },
        {
          correct: false,
          label:
            "Ada nilai $$m$$ yang membuat $$\\vec{a}$$ sejajar $$\\vec{b}$$.",
        },
        {
          correct: true,
          label:
            "Sudut antara $$\\vec{a}$$ dan $$\\vec{b}$$ lancip tepat ketika $$m<3$$.",
        },
        {
          correct: true,
          label:
            "Untuk $$m=0$$, proyeksi skalar $$\\vec{b}$$ pada $$\\vec{a}$$ adalah $$2$$.",
        },
        {
          correct: true,
          label:
            "Jika $$\\left|\\vec{b}\\right|=\\sqrt{26}$$, maka $$m=3$$ atau $$m=-3$$.",
        },
      ],
    },
  },
};

export default item;
