import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengukur periode melalui satu perbandingan awal",
        },
        {
          correct: true,
          label: "Panjang Tali dan Periode Bandul dalam Pengukuran Manual",
        },
        {
          correct: false,
          label: "Menjadikan periode penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label: "Kaidah akhir dari perbandingan pertama tentang periode",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan periode tidak diperlukan",
        },
      ],
    },
  },
};

export default item;
