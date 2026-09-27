import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "mendorong pembeli untuk membeli mobil penumpang.",
        },
        {
          isCorrect: true,
          label:
            "memaparkan skala dan perjalanan penurunan serta pemulihan penjualan wholesales mobil Indonesia pada 2020.",
        },
        {
          isCorrect: false,
          label:
            "membandingkan keuntungan mobil penumpang dan kendaraan niaga.",
        },
        {
          isCorrect: false,
          label: "menjelaskan sejarah dan struktur organisasi GAIKINDO.",
        },
        {
          isCorrect: false,
          label: "meramalkan jumlah kendaraan yang akan terjual pada 2021.",
        },
      ],
    },
  },
};

export default item;
