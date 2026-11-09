import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Successful integration is determined mainly by the price and speed of the device.",
        },
        {
          correct: true,
          label:
            "educators should choose technology intentionally so that it supports existing developmental and learning goals.",
        },
        {
          correct: false,
          label:
            "Technology is fully integrated when children focus on the device rather than the activity.",
        },
        {
          correct: false,
          label:
            "Every classroom activity should include a screen so that children become digitally fluent.",
        },
        {
          correct: false,
          label:
            "passive and interactive screen use are equally suitable in early childhood settings.",
        },
      ],
    },
  },
};

export default item;
