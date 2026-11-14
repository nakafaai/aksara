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
          label: "Untuk $$k=3$$, bayangan titik $$(3,2)$$ adalah $$(9,6)$$.",
        },
        {
          correct: true,
          label: "Untuk setiap nilai $$k$$, titik $$P$$ tidak berpindah.",
        },
        {
          correct: true,
          label:
            "Untuk $$k=-1$$, dilatasi $$D$$ sama dengan rotasi $$180^\\circ$$ dengan pusat $$P$$.",
        },
        {
          correct: false,
          label:
            "Untuk $$k=2$$, jarak setiap titik ke $$P$$ menjadi $$4$$ kali jarak semula.",
        },
        {
          correct: true,
          label:
            "Untuk $$k=2$$, bayangan setiap garis yang tidak melalui $$P$$ adalah garis lain yang sejajar dengan garis semula.",
        },
      ],
    },
  },
};

export default item;
