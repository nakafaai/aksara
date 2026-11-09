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
          label: "Translasi oleh $$\\begin{pmatrix}1\\\\2\\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "Translasi oleh $$\\begin{pmatrix}2\\\\1\\end{pmatrix}$$",
        },
        {
          correct: true,
          label: "Rotasi $$180^\\circ$$ dengan pusat $$(0,1)$$",
        },
        {
          correct: false,
          label: "Rotasi $$180^\\circ$$ dengan pusat $$O(0,0)$$",
        },
        {
          correct: true,
          label: "Dilatasi dengan pusat $$(0,1)$$ dan faktor skala $$3$$",
        },
      ],
    },
  },
};

export default item;
