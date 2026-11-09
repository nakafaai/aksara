import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "target-value",
  },
  stimulus: "minuman",
  versions: {
    id: {
      kind: "numericEntry",
      unit: "gelas",
      value: "192",
    },
  },
};

export default item;
