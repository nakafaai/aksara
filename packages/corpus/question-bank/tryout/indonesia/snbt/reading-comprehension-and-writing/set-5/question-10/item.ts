import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan ukuran kesepakatan yang diubah, tim akan menguji contoh foto pada lebih banyak jenis pohon.",
        },
        {
          isCorrect: true,
          label:
            "Dengan ukuran kesepakatan yang sama, tim akan menguji contoh foto pada lebih banyak jenis pohon.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi yang menghasilkan kesepakatan tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan contoh foto secara permanen tanpa pengujian lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menguji contoh foto hanya pada jenis pohon yang sudah terwakili.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
