import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap produksi gas pada campuran ragi tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap produksi gas pada campuran ragi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: true,
          label:
            "Simulasi membandingkan air bersuhu 35 derajat Celsius dalam produksi gas pada campuran ragi sambil menjaga faktor lain dan mengakui batasan pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi hipotesis tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
