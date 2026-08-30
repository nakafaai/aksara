import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Käufer zum Kauf von Pkw anzuregen." }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Umfang und Verlauf des Rückgangs und der Erholung des indonesischen Großhandelsabsatzes im Jahr 2020 darzustellen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "die Rentabilität von Pkw und Nutzfahrzeugen zu vergleichen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "die Geschichte und Organisationsstruktur von GAIKINDO zu erläutern.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "die Zahl der im Jahr 2021 verkauften Fahrzeuge vorherzusagen.",
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
              text: "encourage buyers to purchase passenger cars.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "report the scale and course of Indonesia's wholesale car-sales decline and recovery in 2020.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "compare the profitability of passenger and commercial vehicles.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "explain the history and organizational structure of GAIKINDO.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "predict the number of vehicles that would be sold in 2021.",
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
              text: "mendorong pembeli untuk membeli mobil penumpang.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "memaparkan skala dan perjalanan penurunan serta pemulihan penjualan wholesales mobil Indonesia pada 2020.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "membandingkan keuntungan mobil penumpang dan kendaraan niaga.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "menjelaskan sejarah dan struktur organisasi GAIKINDO.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "meramalkan jumlah kendaraan yang akan terjual pada 2021.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
