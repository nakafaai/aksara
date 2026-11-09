import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "logical-equivalence",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Jika pemiliknya hadir, toko itu buka.",
        },
        {
          correct: false,
          label: "Jika toko itu tidak buka, pemiliknya tidak hadir.",
        },
        {
          correct: false,
          label: "Toko itu buka dan pemiliknya tidak hadir.",
        },
        {
          correct: true,
          label: "Jika pemiliknya tidak hadir, toko itu tidak buka.",
        },
        {
          correct: false,
          label: "Pemiliknya hadir hanya jika toko itu buka.",
        },
      ],
    },
  },
};

export default item;
