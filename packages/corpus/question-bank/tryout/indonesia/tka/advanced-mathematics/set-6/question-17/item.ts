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
          label:
            "Panjang ruas garis singgung dari $$P$$ ke titik singgungnya adalah $$5$$.",
        },
        {
          column: 2,
          label: "Titik $$P$$ terletak di dalam lingkaran.",
        },
        {
          column: 2,
          label: "Garis $$x=1$$ menyinggung lingkaran.",
        },
        {
          column: 1,
          label:
            "Titik $$(4,3)$$ adalah titik singgung salah satu garis singgung yang melalui $$P$$.",
        },
      ],
    },
  },
};

export default item;
