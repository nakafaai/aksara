import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "water-meters",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "2.0%",
        },
        {
          correct: false,
          label: "9.3%",
        },
        {
          correct: false,
          label: "12.1%",
        },
        {
          correct: true,
          label: "15.0%",
        },
        {
          correct: false,
          label: "17.6%",
        },
      ],
    },
  },
};

export default item;
