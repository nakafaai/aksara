import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "area",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Luas jalan setapak adalah $$141\\text{ m}^2$$.",
        },
        {
          column: 1,
          label: "Keliling tepi luar jalan setapak adalah $$100\\text{ m}$$.",
        },
        {
          column: 2,
          label:
            "Jika lebar jalan setapak dijadikan $$3\\text{ m}$$, luasnya menjadi dua kali luas semula.",
        },
        {
          column: 2,
          label: "Luas jalan setapak lebih dari $$35\\%$$ luas taman.",
        },
      ],
    },
  },
};

export default item;
