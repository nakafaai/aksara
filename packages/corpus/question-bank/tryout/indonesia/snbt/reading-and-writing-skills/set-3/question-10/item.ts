import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan aturan pengukuran yang diubah, tim akan menguji simbol lebih lama pada beberapa kelompok.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya akan mengulang sesi yang mencatat hasil tertinggi untuk simbol baru.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan simbol baru secara permanen sebagai pengganti pengujian lanjutan.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim akan menguji simbol lebih lama pada beberapa kelompok.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menguji simbol lebih lama pada satu kelompok saja tanpa pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
