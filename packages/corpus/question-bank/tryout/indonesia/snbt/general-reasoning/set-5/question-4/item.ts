import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Verkaufszahlen von Fabrik Y haben konstante zweite Differenzen",
        },
        {
          isCorrect: true,
          label:
            "Der größte prozentuale Rückgang bei Fabrik X trat $$2014\\text{-}2015$$ auf",
        },
        {
          isCorrect: false,
          label:
            "Die Verkaufszahlen von Fabrik Z bilden eine geometrische Folge",
        },
        {
          isCorrect: false,
          label:
            "Die Verkaufszahlen von Fabrik Z sanken in jedem Zeitraum um $$50%$$",
        },
        {
          isCorrect: false,
          label:
            "Der Gesamtverkauf von Fabrik Y ist mehr als doppelt so hoch wie die gemeinsamen Gesamtverkäufe der Fabriken X und Z",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Factory Y's sales have constant second differences",
        },
        {
          isCorrect: true,
          label:
            "Factory X's largest percentage decrease occurred in $$2014\\text{-}2015$$",
        },
        {
          isCorrect: false,
          label: "Factory Z's sales form a geometric sequence",
        },
        {
          isCorrect: false,
          label: "Factory Z's sales fell by $$50%$$ in every interval",
        },
        {
          isCorrect: false,
          label:
            "Factory Y's total sales exceed twice the combined totals of factories X and Z",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Penjualan Pabrik Y memiliki beda tingkat dua yang konstan",
        },
        {
          isCorrect: true,
          label:
            "Persentase penurunan terbesar Pabrik X terjadi pada $$2014\\text{-}2015$$",
        },
        {
          isCorrect: false,
          label: "Penjualan Pabrik Z membentuk barisan geometri",
        },
        {
          isCorrect: false,
          label: "Penjualan Pabrik Z turun $$50%$$ pada setiap selang tahun",
        },
        {
          isCorrect: false,
          label:
            "Total penjualan Pabrik Y lebih dari dua kali gabungan total Pabrik X dan Z",
        },
      ],
    },
  },
};

export default item;
