import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pengaruh Suhu Air terhadap Produksi Gas pada Campuran Ragi",
        },
        {
          isCorrect: false,
          label: "Mengukur hipotesis melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan hipotesis penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang hipotesis",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan hipotesis tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
