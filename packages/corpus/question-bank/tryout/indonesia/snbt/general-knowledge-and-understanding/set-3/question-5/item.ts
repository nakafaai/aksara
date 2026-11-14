import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "kabin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kaca pembesar : cahaya",
        },
        {
          correct: false,
          label: "tutup panci : uap",
        },
        {
          correct: false,
          label: "jendela terbuka : angin",
        },
        {
          correct: true,
          label: "kasa nyamuk : udara",
        },
        {
          correct: false,
          label: "atap : air hujan",
        },
      ],
    },
  },
};

export default item;
