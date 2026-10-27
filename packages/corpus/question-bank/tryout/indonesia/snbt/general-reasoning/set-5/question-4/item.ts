import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penjualan Pabrik $$Y$$ memiliki beda tingkat dua yang konstan",
        },
        {
          correct: true,
          label:
            "Persentase penurunan terbesar Pabrik $$X$$ terjadi pada $$2014\\text{-}2015$$",
        },
        {
          correct: false,
          label: "Penjualan Pabrik $$Z$$ membentuk barisan geometri",
        },
        {
          correct: false,
          label:
            "Penjualan Pabrik $$Z$$ turun $$50\\%$$ pada setiap selang tahun",
        },
        {
          correct: false,
          label:
            "Total penjualan Pabrik $$Y$$ lebih dari dua kali gabungan total Pabrik $$X$$ dan $$Z$$",
        },
      ],
    },
  },
};

export default item;
