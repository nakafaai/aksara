import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang peminjaman payung.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang peminjaman payung.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang peminjaman payung.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang peminjaman payung.",
        },
        {
          isCorrect: false,
          label: "Berdasarkan data, menarik tentang peminjaman payung.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
