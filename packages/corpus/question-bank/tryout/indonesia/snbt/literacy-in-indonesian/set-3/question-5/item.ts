import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Uji Awal Pencahayaan Enam Jam pada Perkecambahan Kacang Hijau",
        },
        {
          correct: false,
          label: "Mengukur variabel kontrol melalui satu perbandingan awal",
        },
        {
          correct: false,
          label:
            "Menjadikan variabel kontrol penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label:
            "Kaidah akhir dari perbandingan pertama tentang variabel kontrol",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan variabel kontrol tidak diperlukan",
        },
      ],
    },
  },
};

export default item;
