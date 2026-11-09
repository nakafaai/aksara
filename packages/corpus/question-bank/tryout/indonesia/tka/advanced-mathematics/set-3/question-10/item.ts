import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Grafik $$g$$ memotong sumbu $$Y$$ di titik $$(0,-6)$$.",
        },
        {
          column: 1,
          label: "Grafik $$g$$ memotong sumbu $$X$$ di titik $$(2,0)$$.",
        },
        {
          column: 2,
          label: "Daerah hasil $$g$$ adalah $$\\{y\\mid y>0\\}$$.",
        },
        {
          column: 2,
          label: "$$g(x)<0$$ untuk setiap $$x>2$$.",
        },
      ],
    },
  },
};

export default item;
