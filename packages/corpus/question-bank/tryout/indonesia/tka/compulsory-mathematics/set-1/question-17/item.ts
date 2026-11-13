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
            "Pencerminan terhadap sumbu $$y$$, dilanjutkan translasi oleh $$\\begin{pmatrix}6\\\\0\\end{pmatrix}$$",
        },
        {
          correct: true,
          label:
            "Rotasi $$90^\\circ$$ berlawanan arah jarum jam dengan pusat $$O$$, dilanjutkan translasi oleh $$\\begin{pmatrix}6\\\\0\\end{pmatrix}$$",
        },
        {
          correct: false,
          label:
            "Pencerminan terhadap garis $$y=x$$, dilanjutkan translasi oleh $$\\begin{pmatrix}2\\\\-2\\end{pmatrix}$$",
        },
        {
          correct: true,
          label:
            "Dilatasi dengan pusat $$O$$ dan faktor skala $$-1$$, dilanjutkan translasi oleh $$\\begin{pmatrix}6\\\\6\\end{pmatrix}$$",
        },
        {
          correct: false,
          label:
            "Rotasi $$90^\\circ$$ berlawanan arah jarum jam dengan pusat $$O$$, dilanjutkan translasi oleh $$\\begin{pmatrix}0\\\\6\\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
