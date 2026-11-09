import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Suhu, Pengembangan Balon, dan Hipotesis Produksi Gas Ragi",
        },
        {
          correct: false,
          label: "Mengukur hipotesis melalui satu perbandingan awal",
        },
        {
          correct: false,
          label:
            "Menjadikan hipotesis penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label: "Kaidah akhir dari perbandingan pertama tentang hipotesis",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan hipotesis tidak diperlukan",
        },
      ],
    },
  },
};

export default item;
