import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bulan ke-$$16$$",
        },
        {
          correct: false,
          label: "Bulan ke-$$18$$",
        },
        {
          correct: false,
          label: "Bulan ke-$$20$$",
        },
        {
          correct: true,
          label: "Bulan ke-$$21$$",
        },
        {
          correct: false,
          label: "Bulan ke-$$23$$",
        },
      ],
    },
  },
};

export default item;
