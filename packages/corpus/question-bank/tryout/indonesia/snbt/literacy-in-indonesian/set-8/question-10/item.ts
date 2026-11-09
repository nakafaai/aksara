import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Dua Wadah, Dua Laju Pendinginan: Pola dan Batas Percobaan",
        },
        {
          correct: false,
          label: "Mengukur konduksi melalui satu perbandingan awal",
        },
        {
          correct: false,
          label: "Menjadikan konduksi penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label: "Kaidah akhir dari perbandingan pertama tentang konduksi",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan konduksi tidak diperlukan",
        },
      ],
    },
  },
};

export default item;
