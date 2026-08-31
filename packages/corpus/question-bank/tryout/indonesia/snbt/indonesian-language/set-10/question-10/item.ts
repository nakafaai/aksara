import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur infiltrasi melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan infiltrasi penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang infiltrasi",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan infiltrasi tidak diperlukan",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Kolom infiltrasi dari tiga jenis tanah",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
