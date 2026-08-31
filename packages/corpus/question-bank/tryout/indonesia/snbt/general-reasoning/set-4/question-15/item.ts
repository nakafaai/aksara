import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Der Preis von Nudel A ist nie gesunken",
        },
        {
          isCorrect: false,
          label: "Der Preis von Nudel B ist in jedem Zeitraum gestiegen",
        },
        {
          isCorrect: false,
          label: "Bei jedem Produkt gab es mehr Anstiege als Rückgänge",
        },
        {
          isCorrect: true,
          label: "Bei einem Nudelprodukt sank der Preis genau einmal",
        },
        {
          isCorrect: false,
          label: "Der Preis von Nudel A lag jedes Jahr unter Rp $$3000$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The price of Noodle A never decreased",
        },
        {
          isCorrect: false,
          label: "The price of Noodle B increased in every interval",
        },
        {
          isCorrect: false,
          label: "Every product rose more often than it fell",
        },
        {
          isCorrect: true,
          label: "One noodle product experienced exactly one price decrease",
        },
        {
          isCorrect: false,
          label: "The price of Noodle A stayed below Rp $$3000$$ every year",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Harga Mie A tidak pernah turun",
        },
        {
          isCorrect: false,
          label: "Harga Mie B naik pada setiap periode",
        },
        {
          isCorrect: false,
          label: "Setiap produk lebih sering naik daripada turun",
        },
        {
          isCorrect: true,
          label:
            "Ada satu produk mie yang mengalami tepat satu kali penurunan harga",
        },
        {
          isCorrect: false,
          label: "Harga Mie A selalu di bawah Rp $$3000$$ setiap tahun",
        },
      ],
    },
  },
};

export default item;
