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
          label: "dilatasi dengan pusat $$O$$ dan faktor skala $$-2$$",
        },
        {
          correct: false,
          label:
            "pencerminan terhadap sumbu $$y$$, dilanjutkan dilatasi dengan pusat $$O$$ dan faktor skala $$2$$",
        },
        {
          correct: true,
          label:
            "rotasi $$180^\\circ$$ dengan pusat $$O$$, dilanjutkan dilatasi dengan pusat $$O$$ dan faktor skala $$2$$",
        },
        {
          correct: false,
          label:
            "pencerminan terhadap garis $$y=x$$, dilanjutkan dilatasi dengan pusat $$O$$ dan faktor skala $$-2$$",
        },
        {
          correct: true,
          label:
            "dilatasi dengan pusat $$O$$ dan faktor skala $$2$$, dilanjutkan pencerminan terhadap titik $$O$$",
        },
      ],
    },
  },
};

export default item;
