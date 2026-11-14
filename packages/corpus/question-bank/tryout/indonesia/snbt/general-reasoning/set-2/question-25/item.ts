import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "meteran",
  versions: {
    id: {
      kind: "numericEntry",
      unit: "kWh",
      value: "16",
    },
  },
};

export default item;
