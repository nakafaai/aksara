import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengukur daya generalisasi melalui satu perbandingan awal",
        },
        {
          correct: false,
          label:
            "Menjadikan daya generalisasi penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label:
            "Kaidah akhir dari perbandingan pertama tentang daya generalisasi",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan daya generalisasi tidak diperlukan",
        },
        {
          correct: true,
          label: "Uji Awal Panel Peneduh terhadap Suhu Air Kolam Mini",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
