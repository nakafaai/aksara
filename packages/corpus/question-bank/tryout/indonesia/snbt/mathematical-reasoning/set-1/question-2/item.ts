import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "electricity-tariff",
  versions: {
    id: {
      kind: "numericEntry",
      unit: "kWh",
      value: "365",
    },
  },
};

export default item;
