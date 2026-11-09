import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "sewa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$46{,}7\\%$$",
        },
        {
          correct: true,
          label: "$$70\\%$$",
        },
        {
          correct: false,
          label: "$$72{,}5\\%$$",
        },
        {
          correct: false,
          label: "$$75\\%$$",
        },
        {
          correct: false,
          label: "$$80\\%$$",
        },
      ],
    },
  },
};

export default item;
