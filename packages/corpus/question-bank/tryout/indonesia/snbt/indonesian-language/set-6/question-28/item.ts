import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Benda berulang memperoleh makna terutama dari bentuk fisiknya, bukan dari hubungannya dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Akhir cerita menunjukkan bahwa latar, bukan tindakan tokoh, menyelesaikan konflik.",
        },
        {
          isCorrect: false,
          label:
            "Makna benda tetap sama meskipun tokoh menggunakannya dengan cara berbeda.",
        },
        {
          isCorrect: true,
          label:
            "Bacaan mendukung simpulan bahwa Reno menunda berdasarkan risiko yang tercatat, tetapi tidak membuktikan bahwa kelembapan menyebabkan garis atau supervisor menyetujui keputusan itu.",
        },
        {
          isCorrect: false,
          label:
            "Tindakan akhir penting karena mengukuhkan penafsiran yang sudah terbentuk sejak awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
