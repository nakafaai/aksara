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
          label:
            "Untuk setiap $$a\\ne0$$, lingkaran $$L_a$$ menyinggung sumbu $$X$$ tetapi tidak menyinggung sumbu $$Y$$.",
        },
        {
          column: 1,
          label: "Pusat setiap lingkaran $$L_a$$ terletak pada garis $$y=x$$.",
        },
        {
          column: 1,
          label: "Titik $$(2,0)$$ terletak pada lingkaran $$L_2$$.",
        },
        {
          column: 2,
          label: "Lingkaran $$L_1$$ melalui titik asal.",
        },
      ],
    },
  },
};

export default item;
