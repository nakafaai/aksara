import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mengukur jaring-jaring makanan melalui satu perbandingan awal",
        },
        {
          isCorrect: true,
          label:
            "Kegunaan dan Batas Model jaring-jaring makanan di kebun sekolah",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan jaring-jaring makanan penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label:
            "Kaidah akhir dari perbandingan pertama tentang jaring-jaring makanan",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan jaring-jaring makanan tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
