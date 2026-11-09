import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "recycling-rate",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "25.0%",
        },
        {
          correct: true,
          label: "31.0%",
        },
        {
          correct: false,
          label: "45.0%",
        },
        {
          correct: false,
          label: "67.5%",
        },
        {
          correct: false,
          label: "68.9%",
        },
      ],
    },
  },
};

export default item;
