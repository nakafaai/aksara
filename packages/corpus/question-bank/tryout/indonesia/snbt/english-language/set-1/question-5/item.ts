import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Successful integration is determined mainly by the price and speed of the device.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Technology is fully integrated when children focus on the device rather than the activity.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every classroom activity should include a screen so that children become digitally fluent.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "educators should choose technology intentionally so that it supports existing developmental and learning goals.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "passive and interactive screen use are equally suitable in early childhood settings.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
