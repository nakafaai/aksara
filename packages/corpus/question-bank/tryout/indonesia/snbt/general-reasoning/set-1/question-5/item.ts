import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Es war der Anteil des Gesamtbudgets, der für landwirtschaftliche Produktionsmittel und Infrastruktur ausgegeben wurde.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Es war der Anteil des Budgets, der für andere Aufgaben des Ministeriums übrig blieb.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Es war der gemeldete Anstieg der Reisproduktion.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Es war der gemeldete Anstieg der Maisproduktion.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Es war der Anteil des Budgets, der ausschließlich zur Regelung von Importen diente.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "It was the share of the ministry's total budget spent on agricultural production facilities and infrastructure.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It was the share of the budget left for other ministry needs.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It was the reported increase in rice production.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It was the reported increase in corn production.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It was the share of the budget used only to regulate imports.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Angka itu merupakan bagian dari total anggaran kementerian yang dibelanjakan untuk sarana dan prasarana produksi pertanian.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Angka itu merupakan bagian anggaran yang tersisa untuk kebutuhan kementerian lainnya.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Angka itu merupakan kenaikan produksi padi yang dilaporkan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Angka itu merupakan kenaikan produksi jagung yang dilaporkan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Angka itu merupakan bagian anggaran yang hanya digunakan untuk mengatur impor.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
