import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "In $$2017$$ gab es einen Rückgang der Erntefläche, der Produktion und des Imports von Knoblauch",
        },
        {
          isCorrect: false,
          label:
            "Die Erntefläche in $$2018$$ war mehr als doppelt so groß wie die Erntefläche in $$2016$$",
        },
        {
          isCorrect: false,
          label:
            "Die Knoblauchproduktion in $$2018$$ war doppelt so hoch wie die Knoblauchproduktion in $$2017$$",
        },
        {
          isCorrect: false,
          label:
            "Im Zeitraum $$2015\\text{-}2017$$ verringerte sich die Knoblaucherntefläche kontinuierlich",
        },
        {
          isCorrect: false,
          label:
            "In den letzten beiden Jahren kam es zu einem kontinuierlichen Anstieg der Menge an Knoblauchimporten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "In $$2017$$, there was a decrease in harvest area, production, and import of garlic",
        },
        {
          isCorrect: false,
          label:
            "The harvest area in $$2018$$ was more than double the harvest area in $$2016$$",
        },
        {
          isCorrect: false,
          label:
            "Garlic production in $$2018$$ was double the garlic production in $$2017$$",
        },
        {
          isCorrect: false,
          label:
            "In the $$2015\\text{-}2017$$ period, the garlic harvest area decreased continuously",
        },
        {
          isCorrect: false,
          label:
            "There was a continuous increase in the amount of garlic imports in the last two years",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada tahun $$2017$$ terjadi penurunan dalam luas panen, produksi dan impor bawang putih",
        },
        {
          isCorrect: false,
          label:
            "Luas panen di tahun $$2018$$ lebih dari dua kali lipat luas panen di tahun $$2016$$",
        },
        {
          isCorrect: false,
          label:
            "Produksi bawang putih di tahun $$2018$$ dua kali lipat dari produksi bawang putih di tahun $$2017$$",
        },
        {
          isCorrect: false,
          label:
            "Periode $$2015\\text{-}2017$$, luas panen bawang putih mengalami penurunan terus menerus",
        },
        {
          isCorrect: false,
          label:
            "Terjadi kenaikan terus menerus pada jumlah impor bawang putih di dua tahun terakhir",
        },
      ],
    },
  },
};

export default item;
