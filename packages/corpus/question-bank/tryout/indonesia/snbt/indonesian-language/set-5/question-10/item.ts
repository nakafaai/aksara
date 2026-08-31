import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Rangkaian listrik dengan dua lampu",
        },
        {
          isCorrect: false,
          label: "Mengukur rangkaian tertutup melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan rangkaian tertutup penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label:
            "Kaidah akhir dari perbandingan pertama tentang rangkaian tertutup",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan rangkaian tertutup tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
