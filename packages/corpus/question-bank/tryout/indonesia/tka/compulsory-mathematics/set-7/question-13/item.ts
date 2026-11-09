import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "translasi oleh $$\\begin{pmatrix}3\\\\-2\\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "rotasi $$90^\\circ$$ dengan pusat $$(1,1)$$",
        },
        {
          correct: false,
          label: "pencerminan terhadap garis $$y=x$$",
        },
        {
          correct: false,
          label: "dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$-1$$",
        },
        {
          correct: true,
          label:
            "dilatasi dengan pusat $$(2,0)$$ dan faktor skala $$\\frac12$$",
        },
      ],
    },
  },
};

export default item;
