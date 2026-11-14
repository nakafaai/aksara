import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "percent-change",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\%$$",
        },
        {
          correct: false,
          label: "$$25\\%$$",
        },
        {
          correct: false,
          label: "$$28\\%$$",
        },
        {
          correct: true,
          label: "$$30\\%$$",
        },
        {
          correct: false,
          label: "$$36\\%$$",
        },
      ],
    },
  },
};

export default item;
