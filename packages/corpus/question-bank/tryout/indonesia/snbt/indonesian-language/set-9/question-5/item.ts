import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur atenuasi melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label: "Menjadikan atenuasi penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang atenuasi",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan atenuasi tidak diperlukan",
        },
        {
          isCorrect: true,
          label: "Menguji Lapisan Gabus sebagai Peredam Bunyi pada Kotak Model",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
