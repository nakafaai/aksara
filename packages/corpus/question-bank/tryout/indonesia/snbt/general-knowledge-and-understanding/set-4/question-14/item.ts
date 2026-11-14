import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "pusaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "dimiliki" },
        { correct: false, label: "diamati" },
        { correct: true, label: "dijaga" },
        { correct: false, label: "dikuasai" },
        { correct: false, label: "diselidiki" },
      ],
    },
  },
};

export default item;
