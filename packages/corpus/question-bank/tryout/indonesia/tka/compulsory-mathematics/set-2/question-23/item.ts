import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$75{,}3$$",
        },
        {
          correct: false,
          label: "$$74{,}9$$",
        },
        {
          correct: false,
          label: "$$75{,}1$$",
        },
        {
          correct: false,
          label: "$$75{,}5$$",
        },
        {
          correct: false,
          label: "$$75{,}7$$",
        },
      ],
    },
  },
  stimulus: "combined-class-scores",
};

export default item;
