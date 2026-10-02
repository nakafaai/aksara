import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur kondensasi melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan kondensasi penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Model Daur Air dalam Kotak Transparan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang kondensasi",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan kondensasi tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
