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
          label: "Tidak ada satu titik pun yang merupakan titik tetap $$T$$.",
        },
        {
          correct: false,
          label: "Garis $$x=3$$ dipetakan oleh $$T$$ ke dirinya sendiri.",
        },
        {
          correct: true,
          label: "Sumbu $$x$$ dipetakan oleh $$T$$ ke dirinya sendiri.",
        },
        {
          correct: true,
          label: "Bayangan garis $$y=x$$ oleh $$T$$ adalah garis $$y=-x+6$$.",
        },
        {
          correct: true,
          label:
            "Oleh $$T\\circ T$$, setiap titik bergeser sejauh $$12$$ satuan ke kanan.",
        },
      ],
    },
  },
};

export default item;
