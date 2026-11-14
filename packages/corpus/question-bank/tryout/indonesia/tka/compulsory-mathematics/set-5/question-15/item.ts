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
          label:
            "Pencerminan terhadap garis $$x+2y=12$$ memetakan $$g$$ pada dirinya sendiri.",
        },
        {
          correct: false,
          label:
            "Rotasi $$180^\\circ$$ dengan pusat $$O(0,0)$$ yang dilanjutkan dengan translasi $$\\begin{pmatrix}2\\\\4\\end{pmatrix}$$ memetakan $$g$$ pada dirinya sendiri.",
        },
        {
          correct: true,
          label:
            "Pencerminan terhadap garis $$x=3$$ yang dilanjutkan dengan pencerminan terhadap garis $$y=2$$ memetakan $$g$$ pada dirinya sendiri.",
        },
        {
          correct: true,
          label:
            "Dilatasi dengan pusat $$(1,-2)$$ dan faktor skala $$-3$$ memetakan $$g$$ pada dirinya sendiri.",
        },
        {
          correct: true,
          label:
            "Translasi yang memetakan titik $$(1,3)$$ ke titik $$(4,9)$$ memetakan $$g$$ pada dirinya sendiri.",
        },
      ],
    },
  },
};

export default item;
