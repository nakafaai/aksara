import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur periode melalui satu perbandingan awal",
        },
        {
          isCorrect: true,
          label: "Panjang Tali dan Periode Bandul dalam Pengukuran Manual",
        },
        {
          isCorrect: false,
          label: "Menjadikan periode penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang periode",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan periode tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
