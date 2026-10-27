import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Peluang kedua bola berwarna sama adalah $$\\frac{5}{18}$$.",
        },
        {
          column: 1,
          label: "Peluang tepat satu bola merah adalah $$\\frac{5}{9}$$.",
        },
        {
          column: 2,
          label: "Warna bola pada pengambilan pertama dan kedua saling bebas.",
        },
        {
          column: 1,
          label:
            "Jika bola pertama hijau, peluang bola kedua biru adalah $$\\frac{3}{8}$$.",
        },
      ],
    },
  },
};

export default item;
