import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Dua Wadah, Dua Laju Pendinginan: Pola dan Batas Percobaan",
        },
        {
          isCorrect: false,
          label: "Mengukur konduksi melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label: "Menjadikan konduksi penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang konduksi",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan konduksi tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
