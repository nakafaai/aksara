import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur reflektor melalui satu perbandingan awal",
        },
        {
          isCorrect: true,
          label:
            "Pengaruh Sudut Reflektor terhadap Pemanasan Air dalam Oven Surya Model",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan reflektor penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang reflektor",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan reflektor tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
