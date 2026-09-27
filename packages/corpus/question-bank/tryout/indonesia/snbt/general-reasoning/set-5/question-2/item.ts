import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Luas panen di tahun $$2018$$ lebih dari dua kali lipat luas panen di tahun $$2016$$",
        },
        {
          isCorrect: false,
          label:
            "Produksi bawang putih di tahun $$2018$$ lebih dari dua kali lipat dari produksi bawang putih di tahun $$2017$$",
        },
        {
          isCorrect: false,
          label:
            "Periode $$2015\\text{-}2017$$, luas panen bawang putih mengalami penurunan terus menerus",
        },
        {
          isCorrect: true,
          label:
            "Pada tahun $$2017$$ terjadi penurunan dalam luas panen, produksi dan impor bawang putih",
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
