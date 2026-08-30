import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Verkaufszahlen von Fabrik Y haben konstante zweite Differenzen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Verkaufszahlen von Fabrik Z bilden eine geometrische Folge",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Verkaufszahlen von Fabrik Z sanken in jedem Zeitraum um ",
            },
            { display: "block", kind: "math", math: "50%" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Gesamtverkauf von Fabrik Y ist mehr als doppelt so hoch wie die gemeinsamen Gesamtverkäufe der Fabriken X und Z",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der größte prozentuale Rückgang bei Fabrik X trat ",
            },
            { display: "block", kind: "math", math: "2014\\text{-}2015" },
            { kind: "text", text: " auf" },
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
              text: "Factory Y's sales have constant second differences",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Factory Z's sales form a geometric sequence",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Factory Z's sales fell by " },
            { display: "block", kind: "math", math: "50%" },
            { kind: "text", text: " in every interval" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Factory Y's total sales exceed twice the combined totals of factories X and Z",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Factory X's largest percentage decrease occurred in ",
            },
            { display: "block", kind: "math", math: "2014\\text{-}2015" },
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
              text: "Penjualan Pabrik Y memiliki beda tingkat dua yang konstan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penjualan Pabrik Z membentuk barisan geometri",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Penjualan Pabrik Z turun " },
            { display: "block", kind: "math", math: "50%" },
            { kind: "text", text: " pada setiap selang tahun" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Total penjualan Pabrik Y lebih dari dua kali gabungan total Pabrik X dan Z",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Persentase penurunan terbesar Pabrik X terjadi pada ",
            },
            { display: "block", kind: "math", math: "2014\\text{-}2015" },
          ],
        },
      ],
    },
  },
};

export default item;
