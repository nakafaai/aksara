import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Käufer zum Kauf von Pkw anzuregen.",
        },
        {
          isCorrect: true,
          label:
            "Umfang und Verlauf des Rückgangs und der Erholung des indonesischen Großhandelsabsatzes im Jahr 2020 darzustellen.",
        },
        {
          isCorrect: false,
          label: "die Rentabilität von Pkw und Nutzfahrzeugen zu vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "die Geschichte und Organisationsstruktur von GAIKINDO zu erläutern.",
        },
        {
          isCorrect: false,
          label:
            "die Zahl der im Jahr 2021 verkauften Fahrzeuge vorherzusagen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "encourage buyers to purchase passenger cars.",
        },
        {
          isCorrect: true,
          label:
            "report the scale and course of Indonesia's wholesale car-sales decline and recovery in 2020.",
        },
        {
          isCorrect: false,
          label:
            "compare the profitability of passenger and commercial vehicles.",
        },
        {
          isCorrect: false,
          label:
            "explain the history and organizational structure of GAIKINDO.",
        },
        {
          isCorrect: false,
          label: "predict the number of vehicles that would be sold in 2021.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "mendorong pembeli untuk membeli mobil penumpang.",
        },
        {
          isCorrect: true,
          label:
            "memaparkan skala dan perjalanan penurunan serta pemulihan penjualan wholesales mobil Indonesia pada 2020.",
        },
        {
          isCorrect: false,
          label:
            "membandingkan keuntungan mobil penumpang dan kendaraan niaga.",
        },
        {
          isCorrect: false,
          label: "menjelaskan sejarah dan struktur organisasi GAIKINDO.",
        },
        {
          isCorrect: false,
          label: "meramalkan jumlah kendaraan yang akan terjual pada 2021.",
        },
      ],
    },
  },
};

export default item;
