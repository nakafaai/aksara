import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
  },
  responses: {
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Peluang kedua bola berwarna sama adalah $$\\frac{5}{18}$$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Peluang tepat satu bola merah adalah $$\\frac{5}{9}$$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Warna bola pada pengambilan pertama dan kedua saling bebas.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Jika bola pertama hijau, peluang bola kedua biru adalah $$\\frac{3}{8}$$.",
        },
      ],
    },
  },
};

export default item;
