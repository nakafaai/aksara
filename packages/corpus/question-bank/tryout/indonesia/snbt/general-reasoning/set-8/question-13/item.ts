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
          label: "Rudi tidak lembur dan makan malam di rumah.",
        },
        {
          correct: true,
          label: "Rudi lembur atau makan malam di rumah.",
        },
        {
          correct: false,
          label: "Jika Rudi lembur, ia tidak makan malam di rumah.",
        },
        {
          correct: false,
          label: "Jika Rudi makan malam di rumah, ia tidak lembur.",
        },
        {
          correct: false,
          label: "Rudi tidak lembur atau tidak makan malam di rumah.",
        },
      ],
    },
  },
};

export default item;
