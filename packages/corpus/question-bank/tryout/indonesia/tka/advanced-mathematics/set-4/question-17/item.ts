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
          column: 1,
          label: "Garis $$y=2x+10$$ menyinggung lingkaran $$L$$.",
        },
        {
          column: 2,
          label: "Garis $$y=2x+5$$ tidak memotong lingkaran $$L$$.",
        },
        {
          column: 1,
          label: "Garis $$y=2x+10$$ menyinggung $$L$$ di titik $$(-4,2)$$.",
        },
        {
          column: 2,
          label:
            "Hanya ada satu garis singgung $$L$$ yang sejajar garis $$y=2x$$.",
        },
      ],
    },
  },
};

export default item;
