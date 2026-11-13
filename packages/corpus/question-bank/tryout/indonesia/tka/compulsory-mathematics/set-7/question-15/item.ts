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
          correct: false,
          label:
            "Rotasi $$180^\\circ$$ dengan pusat $$O$$ dan rotasi $$180^\\circ$$ dengan pusat $$(2,0)$$ dapat dipertukarkan.",
        },
        {
          correct: true,
          label:
            "Pencerminan terhadap garis $$y=x$$ dan translasi oleh $$\\begin{pmatrix}2\\\\2\\end{pmatrix}$$ dapat dipertukarkan.",
        },
        {
          correct: false,
          label:
            "Dilatasi dengan pusat $$O$$ dan faktor skala $$2$$ serta dilatasi dengan pusat $$(2,0)$$ dan faktor skala $$3$$ dapat dipertukarkan.",
        },
        {
          correct: false,
          label:
            "Rotasi $$90^\\circ$$ berlawanan arah jarum jam dengan pusat $$O$$ dan pencerminan terhadap sumbu $$x$$ dapat dipertukarkan.",
        },
        {
          correct: true,
          label:
            "Rotasi $$180^\\circ$$ dengan pusat $$O$$ dan pencerminan terhadap garis $$y=-x$$ dapat dipertukarkan.",
        },
      ],
    },
  },
};

export default item;
