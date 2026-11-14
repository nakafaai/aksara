import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "koperasi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mencukupi dan pusingan",
        },
        {
          correct: false,
          label: "mengakhiri dan siklus",
        },
        {
          correct: true,
          label: "mencukupi dan siklus",
        },
        {
          correct: false,
          label: "menyembunyikan dan kisaran",
        },
        {
          correct: false,
          label: "mengakhiri dan babak",
        },
      ],
    },
  },
};

export default item;
