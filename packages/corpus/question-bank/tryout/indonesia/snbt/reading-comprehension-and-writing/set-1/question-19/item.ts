import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mendorong pembeli untuk membeli mobil penumpang.",
        },
        {
          correct: true,
          label:
            "memaparkan skala dan perjalanan penurunan serta pemulihan penjualan wholesales mobil Indonesia pada 2020.",
        },
        {
          correct: false,
          label:
            "membandingkan keuntungan mobil penumpang dan kendaraan niaga.",
        },
        {
          correct: false,
          label: "menjelaskan sejarah dan struktur organisasi GAIKINDO.",
        },
        {
          correct: false,
          label: "meramalkan jumlah kendaraan yang akan terjual pada 2021.",
        },
      ],
    },
  },
};

export default item;
