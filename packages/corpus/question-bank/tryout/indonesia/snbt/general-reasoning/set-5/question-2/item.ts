import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Erntefläche in " },
            { display: "block", kind: "math", math: "2018" },
            {
              kind: "text",
              text: " war mehr als doppelt so groß wie die Erntefläche in ",
            },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Knoblauchproduktion in " },
            { display: "block", kind: "math", math: "2018" },
            {
              kind: "text",
              text: " war doppelt so hoch wie die Knoblauchproduktion in ",
            },
            { display: "block", kind: "math", math: "2017" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Im Zeitraum " },
            { display: "block", kind: "math", math: "2015\\text{-}2017" },
            {
              kind: "text",
              text: " verringerte sich die Knoblaucherntefläche kontinuierlich",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "In " },
            { display: "block", kind: "math", math: "2017" },
            {
              kind: "text",
              text: " gab es einen Rückgang der Erntefläche, der Produktion und des Imports von Knoblauch",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "In den letzten beiden Jahren kam es zu einem kontinuierlichen Anstieg der Menge an Knoblauchimporten",
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
            { kind: "text", text: "The harvest area in " },
            { display: "block", kind: "math", math: "2018" },
            {
              kind: "text",
              text: " was more than double the harvest area in ",
            },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Garlic production in " },
            { display: "block", kind: "math", math: "2018" },
            { kind: "text", text: " was double the garlic production in " },
            { display: "block", kind: "math", math: "2017" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "In the " },
            { display: "block", kind: "math", math: "2015\\text{-}2017" },
            {
              kind: "text",
              text: " period, the garlic harvest area decreased continuously",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "In " },
            { display: "block", kind: "math", math: "2017" },
            {
              kind: "text",
              text: ", there was a decrease in harvest area, production, and import of garlic",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "There was a continuous increase in the amount of garlic imports in the last two years",
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
            { kind: "text", text: "Luas panen di tahun " },
            { display: "block", kind: "math", math: "2018" },
            {
              kind: "text",
              text: " lebih dari dua kali lipat luas panen di tahun ",
            },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Produksi bawang putih di tahun " },
            { display: "block", kind: "math", math: "2018" },
            {
              kind: "text",
              text: " dua kali lipat dari produksi bawang putih di tahun ",
            },
            { display: "block", kind: "math", math: "2017" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Periode " },
            { display: "block", kind: "math", math: "2015\\text{-}2017" },
            {
              kind: "text",
              text: ", luas panen bawang putih mengalami penurunan terus menerus",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Pada tahun " },
            { display: "block", kind: "math", math: "2017" },
            {
              kind: "text",
              text: " terjadi penurunan dalam luas panen, produksi dan impor bawang putih",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Terjadi kenaikan terus menerus pada jumlah impor bawang putih di dua tahun terakhir",
            },
          ],
        },
      ],
    },
  },
};

export default item;
