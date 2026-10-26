import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mengukur jaring-jaring makanan melalui satu perbandingan awal",
        },
        {
          correct: true,
          label:
            "Kegunaan dan Batas Model Jaring-Jaring Makanan di Kebun Sekolah",
        },
        {
          correct: false,
          label:
            "Menjadikan jaring-jaring makanan penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label:
            "Kaidah akhir dari perbandingan pertama tentang jaring-jaring makanan",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan jaring-jaring makanan tidak diperlukan",
        },
      ],
    },
  },
};

export default item;
