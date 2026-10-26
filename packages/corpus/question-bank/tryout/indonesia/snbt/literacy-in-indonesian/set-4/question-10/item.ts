import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengukur kondensasi melalui satu perbandingan awal",
        },
        {
          correct: false,
          label:
            "Menjadikan kondensasi penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: true,
          label: "Kegunaan dan Batas Model Daur Air dalam Kotak Transparan",
        },
        {
          correct: false,
          label: "Kaidah akhir dari perbandingan pertama tentang kondensasi",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan kondensasi tidak diperlukan",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
