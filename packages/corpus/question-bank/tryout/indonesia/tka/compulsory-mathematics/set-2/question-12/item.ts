import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Ada tepat $$13$$ nilai $$x$$ yang mungkin.",
        },
        {
          column: 2,
          label: "Jika $$x=12$$, segitiga itu tumpul.",
        },
        {
          column: 1,
          label: "Jika $$x=13$$, segitiga itu tumpul.",
        },
        {
          column: 2,
          label: "Nilai $$x=17$$ mungkin.",
        },
      ],
    },
  },
};

export default item;
