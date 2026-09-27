import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Anak bermain di luar ruangan.",
        },
        {
          isCorrect: false,
          label: "Anak memiliki lebih banyak kesempatan.",
        },
        {
          isCorrect: false,
          label: "Musim panas bermain di luar ruangan.",
        },
        {
          isCorrect: false,
          label: "Kesempatan terjadi di luar ruangan.",
        },
        {
          isCorrect: true,
          label: "Musim panas memberi anak kesempatan.",
        },
      ],
    },
  },
};

export default item;
