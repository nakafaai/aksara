import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Menguji Susunan Bahan pada Model Penyaringan Air Keruh",
        },
        {
          isCorrect: false,
          label: "Mengukur indikator melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan indikator penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang indikator",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan indikator tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
