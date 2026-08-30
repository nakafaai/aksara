import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Uwet mencoba mengambil buah ceri",
        },
        {
          isCorrect: false,
          label: "Uwet berkebun di bawah pohon ceri",
        },
        {
          isCorrect: false,
          label: "Uwet mencari siput",
        },
        {
          isCorrect: false,
          label: "Uwet menangkap siput",
        },
        {
          isCorrect: false,
          label: "Uwet menunggu kedatangan Enjin dan Ensi",
        },
      ],
    },
  },
};

export default item;
