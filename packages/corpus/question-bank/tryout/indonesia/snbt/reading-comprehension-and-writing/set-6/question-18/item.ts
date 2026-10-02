import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          isCorrect: false,
          label: "Berdasarkan data, menarik tentang pencatatan kebisingan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
