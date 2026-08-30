import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap kelas reparasi pakaian tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap kelas reparasi pakaian.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi konflik tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Pilihan kecil Ayu mengubah makna benang merah dalam menghadapi konflik di kelas reparasi pakaian.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
