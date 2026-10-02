import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Harga beras di Indonesia",
        },
        {
          isCorrect: false,
          label: "Beras memiliki daya tarik universal",
        },
        {
          isCorrect: false,
          label: "Pengolahan beras",
        },
        {
          isCorrect: false,
          label: "Evangeline Mantzioris, ahli diet terakreditasi",
        },
        {
          isCorrect: true,
          label: "Mencuci beras sebelum dimasak",
        },
      ],
    },
  },
};

export default item;
