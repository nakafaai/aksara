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
            "Pencerminan terhadap garis $$x=1$$ dilanjutkan pencerminan terhadap garis $$x=4$$ sama dengan translasi oleh $$\\begin{pmatrix}6\\\\0\\end{pmatrix}$$.",
        },
        {
          correct: false,
          label:
            "Pencerminan terhadap garis $$y=x$$ dilanjutkan pencerminan terhadap sumbu $$x$$ sama dengan rotasi $$90^\\circ$$ berlawanan arah jarum jam dengan pusat $$O(0,0)$$.",
        },
        {
          correct: true,
          label:
            "Dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$-2$$ membuat luas setiap bangun menjadi $$4$$ kali luas semula.",
        },
        {
          correct: true,
          label:
            "Rotasi $$180^\\circ$$ dengan pusat $$O(0,0)$$ sama dengan dilatasi dengan pusat $$O(0,0)$$ dan faktor skala $$-1$$.",
        },
        {
          correct: false,
          label:
            "Translasi oleh $$\\begin{pmatrix}3\\\\-1\\end{pmatrix}$$ dilanjutkan translasi oleh $$\\begin{pmatrix}-3\\\\1\\end{pmatrix}$$ memindahkan setiap titik ke posisi yang berbeda dari posisi awalnya.",
        },
      ],
    },
  },
};

export default item;
