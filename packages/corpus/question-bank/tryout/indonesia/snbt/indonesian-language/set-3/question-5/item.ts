import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pengaruh Pencahayaan Enam Jam terhadap Perkecambahan Kacang Hijau",
        },
        {
          isCorrect: false,
          label: "Mengukur variabel kontrol melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan variabel kontrol penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label:
            "Kaidah akhir dari perbandingan pertama tentang variabel kontrol",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan variabel kontrol tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
