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
            "Titik $$P$$, $$C$$, dan $$C'$$ segaris, dan $$P$$ terletak di antara $$C$$ dan $$C'$$.",
        },
        {
          correct: true,
          label: "Luas segitiga $$A'B'C'$$ adalah $$12$$ satuan luas.",
        },
        {
          correct: true,
          label:
            "Bayangan garis $$x-2y=4$$ oleh $$D$$ adalah garis $$x-2y=-8$$.",
        },
        {
          correct: false,
          label:
            "Titik sudut $$A$$, $$B$$, $$C$$ berurutan searah jarum jam, sedangkan $$A'$$, $$B'$$, $$C'$$ berurutan berlawanan arah jarum jam.",
        },
        {
          correct: true,
          label:
            "Jarak antara garis $$BC$$ dan bayangannya sama dengan tiga kali jarak titik $$P$$ ke garis $$BC$$.",
        },
      ],
    },
  },
};

export default item;
