import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap pemanasan air dengan oven surya model tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap pemanasan air dengan oven surya model.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi reflektor tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Simulasi membandingkan reflektor pada sudut 45 derajat dalam pemanasan air dengan oven surya model sambil menjaga faktor lain dan mengakui batasan pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
