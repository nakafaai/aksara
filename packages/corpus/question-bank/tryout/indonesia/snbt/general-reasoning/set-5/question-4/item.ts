import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penjualan Pabrik $$Y$$ memiliki beda tingkat dua yang konstan",
        },
        {
          isCorrect: true,
          label:
            "Persentase penurunan terbesar Pabrik $$X$$ terjadi pada $$2014\\text{-}2015$$",
        },
        {
          isCorrect: false,
          label: "Penjualan Pabrik $$Z$$ membentuk barisan geometri",
        },
        {
          isCorrect: false,
          label:
            "Penjualan Pabrik $$Z$$ turun $$50\\%$$ pada setiap selang tahun",
        },
        {
          isCorrect: false,
          label:
            "Total penjualan Pabrik $$Y$$ lebih dari dua kali gabungan total Pabrik $$X$$ dan $$Z$$",
        },
      ],
    },
  },
};

export default item;
