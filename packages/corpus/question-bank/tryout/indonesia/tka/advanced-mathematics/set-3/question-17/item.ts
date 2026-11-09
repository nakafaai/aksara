import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "$$L_1$$ dan $$L_2$$ bersinggungan di luar.",
        },
        {
          column: 2,
          label: "Pusat $$L_2$$ terletak di dalam $$L_1$$.",
        },
        {
          column: 1,
          label:
            "Tali busur persekutuan $$L_1$$ dan $$L_2$$ terletak pada garis $$8x+4y-41=0$$.",
        },
        {
          column: 1,
          label: "Garis $$y=6$$ menyinggung $$L_2$$.",
        },
      ],
    },
  },
};

export default item;
