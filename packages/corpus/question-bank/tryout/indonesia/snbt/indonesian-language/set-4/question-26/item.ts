import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap bangunan tua yang sedang dipugar tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap bangunan tua yang sedang dipugar.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: true,
          label:
            "Pilihan kecil Galih mengubah makna serpihan cat biru dalam menghadapi konflik di bangunan tua yang sedang dipugar.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi foreshadowing tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
