import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Petroleum Jelly Menghentikan Seluruh Transpirasi Daun",
        },
        {
          correct: false,
          label:
            "Menjadikan transpirasi penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label: "Kaidah akhir dari perbandingan pertama tentang transpirasi",
        },
        {
          correct: true,
          label:
            "Permukaan Daun dan Kehilangan Air: Temuan Awal pada Daun Kacang",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan transpirasi tidak diperlukan",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
