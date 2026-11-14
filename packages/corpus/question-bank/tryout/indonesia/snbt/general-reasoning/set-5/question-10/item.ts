import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "letter-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "V dan L" },
        { correct: false, label: "B dan J" },
        { correct: false, label: "C dan I" },
        { correct: false, label: "D dan J" },
        { correct: true, label: "C dan J" },
      ],
    },
  },
};

export default item;
