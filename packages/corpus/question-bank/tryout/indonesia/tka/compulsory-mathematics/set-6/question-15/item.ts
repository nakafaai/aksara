import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Dilatasi dengan pusat $$(2,2)$$ dan faktor skala $$-\\frac{1}{2}$$",
        },
        {
          correct: true,
          label:
            "Rotasi $$180^\\circ$$ dengan pusat $$\\left(\\frac{3}{2},\\frac{3}{2}\\right)$$, dilanjutkan dilatasi dengan pusat $$(3,3)$$ dan faktor skala $$\\frac{1}{2}$$",
        },
        {
          correct: false,
          label:
            "Dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$-2$$, dilanjutkan translasi oleh $$\\begin{pmatrix}3\\\\3\\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "Dilatasi dengan pusat $$(3,3)$$ dan faktor skala $$-\\frac{1}{2}$$",
        },
        {
          correct: true,
          label:
            "Translasi oleh $$\\begin{pmatrix}-6\\\\-6\\end{pmatrix}$$, dilanjutkan dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$-\\frac{1}{2}$$",
        },
      ],
    },
  },
};

export default item;
