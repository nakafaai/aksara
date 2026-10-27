import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Harga beras di Indonesia",
        },
        {
          correct: false,
          label: "Beras memiliki daya tarik universal",
        },
        {
          correct: false,
          label: "Pengolahan beras",
        },
        {
          correct: false,
          label: "Evangeline Mantzioris, ahli diet terakreditasi",
        },
        {
          correct: true,
          label: "Mencuci beras sebelum dimasak",
        },
      ],
    },
  },
};

export default item;
