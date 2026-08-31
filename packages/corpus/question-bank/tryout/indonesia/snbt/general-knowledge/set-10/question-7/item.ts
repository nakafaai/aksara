import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "die Fähigkeit, Herkunft, Weg und Behandlung einer Sache anhand von Aufzeichnungen zu verfolgen",
        },
        {
          isCorrect: false,
          label: "einen Ortsnamen auf die Vorderseite einer Packung drucken",
        },
        {
          isCorrect: false,
          label: "den Verkaufspreis aus allen Produktionskosten berechnen",
        },
        {
          isCorrect: false,
          label: "die Qualität jedes Produkts in der Lieferkette garantieren",
        },
        {
          isCorrect: false,
          label: "Produkte alphabetisch nach Namen sortieren",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "the ability to follow the origin, movement, and handling of something through records",
        },
        {
          isCorrect: false,
          label: "printing one place name on the front of a package",
        },
        {
          isCorrect: false,
          label: "calculating a selling price from all production costs",
        },
        {
          isCorrect: false,
          label:
            "guaranteeing that every product in a supply chain is high quality",
        },
        {
          isCorrect: false,
          label: "sorting products alphabetically by name",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "kemampuan mengikuti asal, perpindahan, dan penanganan sesuatu melalui catatan",
        },
        {
          isCorrect: false,
          label: "pencetakan satu nama tempat pada bagian depan kemasan",
        },
        {
          isCorrect: false,
          label: "perhitungan harga jual dari seluruh biaya produksi",
        },
        {
          isCorrect: false,
          label:
            "jaminan bahwa setiap produk di rantai pasok selalu bermutu baik",
        },
        {
          isCorrect: false,
          label: "pengurutan produk menurut nama secara alfabetis",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
