import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In jeder Woche werden weniger Pashmina-Tücher als quadratische Tücher verkauft.",
        },
        {
          isCorrect: false,
          label:
            "Die wöchentlichen Verkaufszahlen der Bergo-Tücher bilden eine arithmetische Folge.",
        },
        {
          isCorrect: false,
          label:
            "Von jedem Kopftuchmodell werden in jeder Woche mehr Stück als in der Vorwoche verkauft.",
        },
        {
          isCorrect: true,
          label:
            "In jeder Woche werden mehr Bergo-Tücher als quadratische Tücher verkauft.",
        },
        {
          isCorrect: false,
          label:
            "Die Verkaufszahl der Bergo-Tücher steigt von Woche 1 bis Woche 4 am wenigsten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pashmina headscarf sales are lower than square headscarf sales in every week.",
        },
        {
          isCorrect: false,
          label:
            "The weekly number of bergo headscarves sold forms an arithmetic sequence.",
        },
        {
          isCorrect: false,
          label:
            "Sales of each headscarf style are higher than in the preceding week.",
        },
        {
          isCorrect: true,
          label:
            "Bergo headscarf sales are higher than square headscarf sales in every week.",
        },
        {
          isCorrect: false,
          label:
            "Bergo headscarf sales have the smallest increase from week 1 to week 4.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penjualan kerudung jenis pasmina selalu lebih sedikit dibandingkan penjualan kerudung jenis segiempat.",
        },
        {
          isCorrect: false,
          label:
            "Banyak penjualan kerudung jenis bergo mengikuti pola barisan aritmetika.",
        },
        {
          isCorrect: false,
          label:
            "Tingkat penjualan jenis kerudung tiap minggu selalu lebih tinggi dibandingkan minggu sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Penjualan kerudung jenis bergo selalu lebih tinggi dibandingkan penjualan kerudung jenis segiempat.",
        },
        {
          isCorrect: false,
          label:
            "Penjualan kerudung jenis bergo mengalami kenaikan paling kecil dari minggu ke-1 hingga minggu ke-4.",
        },
      ],
    },
  },
};

export default item;
