import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Indonesiens Bekleidungsexporte in die Vereinigten Staaten sanken um ",
            },
            { display: "block", kind: "math", math: "9{,}3\\%" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Japan ist der wichtigste Markt für Indonesiens Konfektionsbekleidung.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der wichtigste Markt für Indonesiens Konfektionsbekleidung waren die Vereinigten Staaten.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die USA und Deutschland sind die beiden Länder mit den höchsten Exportwerten.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Wert der Bekleidungsexporte in die Vereinigten Staaten war niedriger als im Vorjahr.",
            },
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
            {
              kind: "text",
              text: "Indonesia's garment exports to the United States fell by ",
            },
            { display: "block", kind: "math", math: "9.3\\%" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Japan is the main market for Indonesia's ready-made clothing products.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The main market for Indonesia's ready-made clothing products is the United States.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The United States and Germany are the two countries with the highest export values.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The export value of Indonesia's ready-made clothing to the United States is less than last year.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ekspor pakaian jadi Indonesia ke Amerika Serikat turun ",
            },
            { display: "block", kind: "math", math: "9{,}3\\%" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jepang merupakan pasar utama produk pakaian jadi Indonesia.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pasar utama produk pakaian jadi Indonesia adalah Amerika Serikat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Amerika Serikat dan Jerman merupakan dua negara dengan nilai ekspor tertinggi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nilai ekspor pakaian jadi Indonesia ke Amerika Serikat lebih sedikit daripada tahun lalu.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
