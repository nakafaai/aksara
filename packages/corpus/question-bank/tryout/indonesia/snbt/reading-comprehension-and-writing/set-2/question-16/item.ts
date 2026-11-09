import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "sleep-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$18\\,\\%$$",
        },
        {
          correct: false,
          label: "$$42\\,\\%$$",
        },
        {
          correct: true,
          label: "$$60\\,\\%$$",
        },
        {
          correct: false,
          label: "$$70\\,\\%$$",
        },
        {
          correct: false,
          label: "$$88\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
