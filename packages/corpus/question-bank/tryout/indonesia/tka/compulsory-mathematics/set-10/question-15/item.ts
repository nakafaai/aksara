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
            "Dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$2$$, dilanjutkan dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$-3$$, sama dengan dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$-6$$.",
        },
        {
          correct: false,
          label:
            "Dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$2$$, dilanjutkan dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$3$$, membuat luas setiap bangun menjadi $$6$$ kali luas semula.",
        },
        {
          correct: true,
          label:
            "Dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$3$$, dilanjutkan pencerminan terhadap sumbu $$x$$, sama dengan pencerminan terhadap sumbu $$x$$, dilanjutkan dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$3$$.",
        },
        {
          correct: true,
          label:
            "Dilatasi dengan pusat $$(1,0)$$ dan faktor skala $$2$$, dilanjutkan dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$\\frac12$$, sama dengan translasi oleh $$\\begin{pmatrix}-\\frac12\\\\0\\end{pmatrix}$$.",
        },
        {
          correct: false,
          label:
            "Dua dilatasi berurutan selalu dapat diganti dengan satu dilatasi yang berpusat di $$O(0,0)$$.",
        },
      ],
    },
  },
};

export default item;
