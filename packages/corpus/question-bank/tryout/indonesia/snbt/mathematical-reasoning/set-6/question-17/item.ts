import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "speed-cameras",
  versions: {
    id: {
      kind: "numericEntry",
      unit: "km/jam",
      value: "90",
    },
  },
};

export default item;
