import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "percentage",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7\\%$$",
        },
        {
          correct: false,
          label: "$$17{,}5\\%$$",
        },
        {
          correct: true,
          label: "$$35\\%$$",
        },
        {
          correct: false,
          label: "$$55\\%$$",
        },
        {
          correct: false,
          label: "$$65\\%$$",
        },
      ],
    },
  },
};

export default item;
