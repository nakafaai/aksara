import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "counting",
  },
  stimulus: "seminar",
  versions: {
    id: {
      kind: "numericEntry",
      unit: "urutan",
      value: "10",
    },
  },
};

export default item;
