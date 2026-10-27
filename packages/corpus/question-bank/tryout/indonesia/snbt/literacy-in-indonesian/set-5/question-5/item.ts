import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Menguji Susunan Bahan pada Model Penyaringan Air Keruh",
        },
        {
          correct: false,
          label: "Mengukur indikator melalui satu perbandingan awal",
        },
        {
          correct: false,
          label:
            "Menjadikan indikator penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label: "Kaidah akhir dari perbandingan pertama tentang indikator",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan indikator tidak diperlukan",
        },
      ],
    },
  },
};

export default item;
