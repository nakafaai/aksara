import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "seed-soak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$45\\%$$",
        },
        {
          correct: false,
          label: "$$70\\%$$",
        },
        {
          correct: false,
          label: "$$84\\%$$",
        },
        {
          correct: true,
          label: "$$90\\%$$",
        },
        {
          correct: false,
          label: "$$95\\%$$",
        },
      ],
    },
  },
};

export default item;
