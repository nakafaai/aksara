import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur daya generalisasi melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan daya generalisasi penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label:
            "Kaidah akhir dari perbandingan pertama tentang daya generalisasi",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan daya generalisasi tidak diperlukan",
        },
        {
          isCorrect: true,
          label: "Pengaruh Panel Peneduh terhadap Suhu Air Kolam Mini",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
