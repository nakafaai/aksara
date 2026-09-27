import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang lokakarya kompos.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, tim yang menarik simpulan terbatas tentang lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Data menghasilkan simpulan terbatas tentang lokakarya kompos karena.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, menarik simpulan terbatas tentang lokakarya kompos.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
