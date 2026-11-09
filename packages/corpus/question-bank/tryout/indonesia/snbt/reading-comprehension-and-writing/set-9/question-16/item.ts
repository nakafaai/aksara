import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "tooth-brushing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$40\\%$$",
        },
        {
          correct: false,
          label: "$$50\\%$$",
        },
        {
          correct: false,
          label: "$$60\\%$$",
        },
        {
          correct: false,
          label: "$$70\\%$$",
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
