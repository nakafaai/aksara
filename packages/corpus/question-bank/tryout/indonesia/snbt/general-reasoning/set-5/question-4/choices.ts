import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Verkaufszahlen von Fabrik Y haben konstante zweite Differenzen",
      value: false,
    },
    {
      label: "Die Verkaufszahlen von Fabrik Z bilden eine geometrische Folge",
      value: false,
    },
    {
      label:
        "Die Verkaufszahlen von Fabrik Z sanken in jedem Zeitraum um $$50%$$",
      value: false,
    },
    {
      label:
        "Der Gesamtverkauf von Fabrik Y ist mehr als doppelt so hoch wie die gemeinsamen Gesamtverkäufe der Fabriken X und Z",
      value: false,
    },
    {
      label:
        "Der größte prozentuale Rückgang bei Fabrik X trat $$2014\\text{-}2015$$ auf",
      value: true,
    },
  ],
  en: [
    {
      label: "Factory Y's sales have constant second differences",
      value: false,
    },
    {
      label: "Factory Z's sales form a geometric sequence",
      value: false,
    },
    {
      label: "Factory Z's sales fell by $$50%$$ in every interval",
      value: false,
    },
    {
      label:
        "Factory Y's total sales exceed twice the combined totals of factories X and Z",
      value: false,
    },
    {
      label:
        "Factory X's largest percentage decrease occurred in $$2014\\text{-}2015$$",
      value: true,
    },
  ],
  id: [
    {
      label: "Penjualan Pabrik Y memiliki beda tingkat dua yang konstan",
      value: false,
    },
    {
      label: "Penjualan Pabrik Z membentuk barisan geometri",
      value: false,
    },
    {
      label: "Penjualan Pabrik Z turun $$50%$$ pada setiap selang tahun",
      value: false,
    },
    {
      label:
        "Total penjualan Pabrik Y lebih dari dua kali gabungan total Pabrik X dan Z",
      value: false,
    },
    {
      label:
        "Persentase penurunan terbesar Pabrik X terjadi pada $$2014\\text{-}2015$$",
      value: true,
    },
  ],
};

export default choices;
