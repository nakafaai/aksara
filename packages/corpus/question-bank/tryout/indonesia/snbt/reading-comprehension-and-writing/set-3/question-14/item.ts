import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "lapak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*menghentikan* pada kalimat (7) diganti *mengakhiri* dan *dianjurkan* pada kalimat (9) diganti *diwajibkan*",
        },
        {
          correct: true,
          label:
            "*menghentikan* pada kalimat (7) diganti *memperlambat* dan *dianjurkan* pada kalimat (9) diganti *diwajibkan*",
        },
        {
          correct: false,
          label:
            "*menghentikan* pada kalimat (7) diganti *memperlambat* dan *dianjurkan* pada kalimat (9) diganti *disarankan*",
        },
        {
          correct: false,
          label:
            "hanya *dianjurkan* pada kalimat (9) yang diganti, yaitu dengan *diwajibkan*",
        },
        {
          correct: false,
          label:
            "hanya *menghentikan* pada kalimat (7) yang diganti, yaitu dengan *memperlambat*",
        },
      ],
    },
  },
};

export default item;
