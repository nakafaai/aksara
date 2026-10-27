import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Luas panen di tahun $$2018$$ lebih dari dua kali lipat luas panen di tahun $$2016$$",
        },
        {
          correct: false,
          label:
            "Produksi bawang putih di tahun $$2018$$ lebih dari dua kali lipat dari produksi bawang putih di tahun $$2017$$",
        },
        {
          correct: false,
          label:
            "Periode $$2015\\text{-}2017$$, luas panen bawang putih mengalami penurunan terus menerus",
        },
        {
          correct: true,
          label:
            "Pada tahun $$2017$$ terjadi penurunan dalam luas panen, produksi dan impor bawang putih",
        },
        {
          correct: false,
          label:
            "Terjadi kenaikan terus menerus pada jumlah impor bawang putih di dua tahun terakhir",
        },
      ],
    },
  },
};

export default item;
