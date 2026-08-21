import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Es war der Anteil des Gesamtbudgets, der für landwirtschaftliche Produktionsmittel und Infrastruktur ausgegeben wurde.",
      value: true,
    },
    {
      label:
        "Es war der Anteil des Budgets, der für andere Aufgaben des Ministeriums übrig blieb.",
      value: false,
    },
    {
      label: "Es war der gemeldete Anstieg der Reisproduktion.",
      value: false,
    },
    {
      label: "Es war der gemeldete Anstieg der Maisproduktion.",
      value: false,
    },
    {
      label:
        "Es war der Anteil des Budgets, der ausschließlich zur Regelung von Importen diente.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "It was the share of the ministry's total budget spent on agricultural production facilities and infrastructure.",
      value: true,
    },
    {
      label: "It was the share of the budget left for other ministry needs.",
      value: false,
    },
    {
      label: "It was the reported increase in rice production.",
      value: false,
    },
    {
      label: "It was the reported increase in corn production.",
      value: false,
    },
    {
      label: "It was the share of the budget used only to regulate imports.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Angka itu merupakan bagian dari total anggaran kementerian yang dibelanjakan untuk sarana dan prasarana produksi pertanian.",
      value: true,
    },
    {
      label:
        "Angka itu merupakan bagian anggaran yang tersisa untuk kebutuhan kementerian lainnya.",
      value: false,
    },
    {
      label: "Angka itu merupakan kenaikan produksi padi yang dilaporkan.",
      value: false,
    },
    {
      label: "Angka itu merupakan kenaikan produksi jagung yang dilaporkan.",
      value: false,
    },
    {
      label:
        "Angka itu merupakan bagian anggaran yang hanya digunakan untuk mengatur impor.",
      value: false,
    },
  ],
};

export default choices;
