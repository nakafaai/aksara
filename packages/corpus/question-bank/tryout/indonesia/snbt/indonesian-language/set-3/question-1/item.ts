import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap perkecambahan kacang hijau tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap perkecambahan kacang hijau.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: true,
          label:
            "Simulasi membandingkan pencahayaan enam jam dengan jarak lampu yang tetap dalam perkecambahan kacang hijau sambil menjaga faktor lain dan mengakui batasan pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi variabel kontrol tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
