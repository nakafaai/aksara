import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur reservoir melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan reservoir penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang reservoir",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan reservoir tidak diperlukan",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Peta kartu daur karbon",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
