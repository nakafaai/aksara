import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "den Druck auf den indonesischen Automarkt im Jahr 2020.",
        },
        {
          isCorrect: true,
          label: "den Rückgang des Großhandelsabsatzes von 2019 auf 2020.",
        },
        {
          isCorrect: false,
          label: "die Zahl der im April ausgelieferten Fahrzeuge.",
        },
        {
          isCorrect: false,
          label: "den Tiefpunkt des Absatzes im Mai.",
        },
        {
          isCorrect: false,
          label: "die Erholung des Absatzes im Dezember.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the pressure on Indonesia's car market during 2020.",
        },
        {
          isCorrect: true,
          label: "the fall in wholesale sales from 2019 to 2020.",
        },
        {
          isCorrect: false,
          label: "the number of vehicles shipped in April.",
        },
        {
          isCorrect: false,
          label: "the sales low reached in May.",
        },
        {
          isCorrect: false,
          label: "the recovery recorded in December.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "tekanan terhadap pasar mobil Indonesia selama 2020.",
        },
        {
          isCorrect: true,
          label: "turunnya penjualan wholesales dari 2019 ke 2020.",
        },
        {
          isCorrect: false,
          label: "jumlah kendaraan yang dikirim pada April.",
        },
        {
          isCorrect: false,
          label: "titik terendah penjualan pada Mei.",
        },
        {
          isCorrect: false,
          label: "pemulihan penjualan pada Desember.",
        },
      ],
    },
  },
};

export default item;
