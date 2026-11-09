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
          label: "Titik $$P$$ terletak di luar lingkaran $$L$$.",
        },
        {
          column: 2,
          label: "Tali busur terpanjang yang melalui $$P$$ panjangnya $$5$$.",
        },
        {
          column: 1,
          label:
            "Tali busur terpendek yang melalui $$P$$ panjangnya $$2\\sqrt{15}$$.",
        },
        {
          column: 1,
          label:
            "Garis yang memuat tali busur dengan titik tengah $$P$$ adalah $$x+3y-19=0$$.",
        },
      ],
    },
  },
};

export default item;
