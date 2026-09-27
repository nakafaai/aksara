import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, menarik tentang pusat informasi taman kota.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
