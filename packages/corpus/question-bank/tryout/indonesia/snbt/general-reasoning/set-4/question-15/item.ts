import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Der Preis von Nudel A ist nie gesunken" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Preis von Nudel B ist in jedem Zeitraum gestiegen",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Bei einem Nudelprodukt sank der Preis genau einmal",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bei jedem Produkt gab es mehr Anstiege als Rückgänge",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Preis von Nudel A lag jedes Jahr unter Rp ",
            },
            { display: "block", kind: "math", math: "3000" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The price of Noodle A never decreased" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The price of Noodle B increased in every interval",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "One noodle product experienced exactly one price decrease",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every product rose more often than it fell",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The price of Noodle A stayed below Rp " },
            { display: "block", kind: "math", math: "3000" },
            { kind: "text", text: " every year" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Harga Mie A tidak pernah turun" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Harga Mie B naik pada setiap periode" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Ada satu produk mie yang mengalami tepat satu kali penurunan harga",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap produk lebih sering naik daripada turun",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Harga Mie A selalu di bawah Rp " },
            { display: "block", kind: "math", math: "3000" },
            { kind: "text", text: " setiap tahun" },
          ],
        },
      ],
    },
  },
};

export default item;
