import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengukur erosi melalui satu perbandingan awal",
        },
        {
          correct: false,
          label: "Menjadikan erosi penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label: "Kaidah akhir dari perbandingan pertama tentang erosi",
        },
        {
          correct: true,
          label: "Penutup Permukaan dalam Model Erosi: Hasil dan Batas",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan erosi tidak diperlukan",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
