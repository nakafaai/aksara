import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengukur daya dukung melalui satu perbandingan awal",
        },
        {
          correct: false,
          label:
            "Menjadikan daya dukung penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: true,
          label: "Daya Dukung dalam Simulasi Keping: Aturan dan Batas",
        },
        {
          correct: false,
          label: "Kaidah akhir dari perbandingan pertama tentang daya dukung",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan daya dukung tidak diperlukan",
        },
      ],
    },
  },
};

export default item;
