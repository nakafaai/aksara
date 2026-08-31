import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Successful integration is determined mainly by the price and speed of the device.",
        },
        {
          isCorrect: true,
          label:
            "educators should choose technology intentionally so that it supports existing developmental and learning goals.",
        },
        {
          isCorrect: false,
          label:
            "Technology is fully integrated when children focus on the device rather than the activity.",
        },
        {
          isCorrect: false,
          label:
            "Every classroom activity should include a screen so that children become digitally fluent.",
        },
        {
          isCorrect: false,
          label:
            "passive and interactive screen use are equally suitable in early childhood settings.",
        },
      ],
    },
  },
};

export default item;
