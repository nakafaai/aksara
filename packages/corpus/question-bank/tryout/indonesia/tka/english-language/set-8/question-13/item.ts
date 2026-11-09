import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "night-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "that her grandmother is wasting food the family needs",
        },
        {
          correct: true,
          label: "that small kindnesses can come back in unexpected ways",
        },
        {
          correct: false,
          label: "that she should hide the basket from her grandmother",
        },
        {
          correct: false,
          label: "that ferries always leave before their scheduled time",
        },
        {
          correct: false,
          label: "that she should never travel with her grandmother again",
        },
      ],
    },
  },
};

export default item;
