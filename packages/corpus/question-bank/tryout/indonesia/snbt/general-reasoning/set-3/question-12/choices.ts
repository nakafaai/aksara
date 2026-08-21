import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "In jeder Woche werden weniger Pashmina-Tücher als quadratische Tücher verkauft.",
      value: false,
    },
    {
      label:
        "In jeder Woche werden mehr Bergo-Tücher als quadratische Tücher verkauft.",
      value: true,
    },
    {
      label:
        "Die wöchentlichen Verkaufszahlen der Bergo-Tücher bilden eine arithmetische Folge.",
      value: false,
    },
    {
      label:
        "Von jedem Kopftuchmodell werden in jeder Woche mehr Stück als in der Vorwoche verkauft.",
      value: false,
    },
    {
      label:
        "Die Verkaufszahl der Bergo-Tücher steigt von Woche 1 bis Woche 4 am wenigsten.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Pashmina headscarf sales are lower than square headscarf sales in every week.",
      value: false,
    },
    {
      label:
        "Bergo headscarf sales are higher than square headscarf sales in every week.",
      value: true,
    },
    {
      label:
        "The weekly number of bergo headscarves sold forms an arithmetic sequence.",
      value: false,
    },
    {
      label:
        "Sales of each headscarf style are higher than in the preceding week.",
      value: false,
    },
    {
      label:
        "Bergo headscarf sales have the smallest increase from week 1 to week 4.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Penjualan kerudung jenis pasmina selalu lebih sedikit dibandingkan penjualan kerudung jenis segiempat.",
      value: false,
    },
    {
      label:
        "Penjualan kerudung jenis bergo selalu lebih tinggi dibandingkan penjualan kerudung jenis segiempat.",
      value: true,
    },
    {
      label:
        "Banyak penjualan kerudung jenis bergo mengikuti pola barisan aritmetika.",
      value: false,
    },
    {
      label:
        "Tingkat penjualan jenis kerudung tiap minggu selalu lebih tinggi dibandingkan minggu sebelumnya.",
      value: false,
    },
    {
      label:
        "Penjualan kerudung jenis bergo mengalami kenaikan paling kecil dari minggu ke-1 hingga minggu ke-4.",
      value: false,
    },
  ],
};

export default choices;
