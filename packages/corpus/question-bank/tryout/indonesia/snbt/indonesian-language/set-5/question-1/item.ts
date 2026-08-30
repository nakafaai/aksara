import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Simulasi membandingkan susunan kerikil, pasir, dan arang dengan ketebalan sama dalam model penyaringan air keruh sambil menjaga faktor lain dan mengakui batasan pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap model penyaringan air keruh tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap model penyaringan air keruh.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi indikator tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
