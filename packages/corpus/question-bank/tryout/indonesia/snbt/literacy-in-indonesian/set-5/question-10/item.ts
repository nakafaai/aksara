import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Kegunaan dan Batas Model Rangkaian Listrik Dua Lampu",
        },
        {
          correct: false,
          label: "Mengukur rangkaian tertutup melalui satu perbandingan awal",
        },
        {
          correct: false,
          label:
            "Menjadikan rangkaian tertutup penjelasan tunggal atas hasil pengamatan",
        },
        {
          correct: false,
          label:
            "Kaidah akhir dari perbandingan pertama tentang rangkaian tertutup",
        },
        {
          correct: false,
          label:
            "Keterbatasan yang membuat uji lanjutan rangkaian tertutup tidak diperlukan",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
