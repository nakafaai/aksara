import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Indonesiens Bekleidungsexporte in die Vereinigten Staaten sanken um $$9{,}3\\%$$.",
        },
        {
          isCorrect: false,
          label:
            "Japan ist der wichtigste Markt für Indonesiens Konfektionsbekleidung.",
        },
        {
          isCorrect: false,
          label:
            "Die USA und Deutschland sind die beiden Länder mit den höchsten Exportwerten.",
        },
        {
          isCorrect: true,
          label:
            "Der wichtigste Markt für Indonesiens Konfektionsbekleidung waren die Vereinigten Staaten.",
        },
        {
          isCorrect: false,
          label:
            "Der Wert der Bekleidungsexporte in die Vereinigten Staaten war niedriger als im Vorjahr.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Indonesia's garment exports to the United States fell by $$9.3\\%$$.",
        },
        {
          isCorrect: false,
          label:
            "Japan is the main market for Indonesia's ready-made clothing products.",
        },
        {
          isCorrect: false,
          label:
            "The United States and Germany are the two countries with the highest export values.",
        },
        {
          isCorrect: true,
          label:
            "The main market for Indonesia's ready-made clothing products is the United States.",
        },
        {
          isCorrect: false,
          label:
            "The export value of Indonesia's ready-made clothing to the United States is less than last year.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ekspor pakaian jadi Indonesia ke Amerika Serikat turun $$9{,}3\\%$$.",
        },
        {
          isCorrect: false,
          label: "Jepang merupakan pasar utama produk pakaian jadi Indonesia.",
        },
        {
          isCorrect: false,
          label:
            "Amerika Serikat dan Jerman merupakan dua negara dengan nilai ekspor tertinggi.",
        },
        {
          isCorrect: true,
          label:
            "Pasar utama produk pakaian jadi Indonesia adalah Amerika Serikat.",
        },
        {
          isCorrect: false,
          label:
            "Nilai ekspor pakaian jadi Indonesia ke Amerika Serikat lebih sedikit daripada tahun lalu.",
        },
      ],
    },
  },
};

export default item;
