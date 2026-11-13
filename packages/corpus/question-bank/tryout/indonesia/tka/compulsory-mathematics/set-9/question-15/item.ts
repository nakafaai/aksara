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
          label: "Transformasi itu dapat berupa translasi oleh vektor $$(6,0)$$.",
        },
        {
          correct: false,
          label:
            "Transformasi itu dapat berupa rotasi sebesar $$90^\\circ$$ searah putaran jarum jam terhadap suatu titik pusat.",
        },
        {
          correct: false,
          label:
            "Transformasi itu dapat berupa dilatasi dengan pusat $$(4,4)$$ dan faktor skala $$-1$$.",
        },
        {
          correct: true,
          label: "Transformasi itu dapat berupa pencerminan terhadap garis $$x=4$$.",
        },
        {
          correct: true,
          label:
            "Transformasi itu dapat berupa rotasi sebesar $$90^\\circ$$ berlawanan arah putaran jarum jam terhadap suatu titik pusat.",
        },
      ],
    },
  },
};

export default item;
