import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "rotasi $$90^\\circ$$ berlawanan arah jarum jam dengan pusat $$O$$, dilanjutkan dilatasi dengan pusat $$O$$ dan faktor skala $$2$$",
        },
        {
          correct: false,
          label:
            "rotasi $$90^\\circ$$ searah jarum jam dengan pusat $$O$$, dilanjutkan dilatasi dengan pusat $$O$$ dan faktor skala $$2$$",
        },
        {
          correct: false,
          label:
            "pencerminan terhadap garis $$y=x$$, dilanjutkan dilatasi dengan pusat $$O$$ dan faktor skala $$2$$",
        },
        {
          correct: false,
          label:
            "rotasi $$180^\\circ$$ dengan pusat $$O$$, dilanjutkan dilatasi dengan pusat $$O$$ dan faktor skala $$2$$",
        },
        {
          correct: false,
          label:
            "rotasi $$90^\\circ$$ berlawanan arah jarum jam dengan pusat $$O$$, dilanjutkan dilatasi dengan pusat $$O$$ dan faktor skala $$\\frac12$$",
        },
      ],
    },
  },
};

export default item;
