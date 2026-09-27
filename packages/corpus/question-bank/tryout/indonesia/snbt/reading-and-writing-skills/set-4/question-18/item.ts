import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: false,
          label: "Berdasarkan data, menarik tentang pasar tukar buku.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
