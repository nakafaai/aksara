import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "deductive-reasoning",
    topic: "rule-application",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rp166.500",
        },
        {
          correct: false,
          label: "Rp175.500",
        },
        {
          correct: false,
          label: "Rp185.000",
        },
        {
          correct: true,
          label: "Rp216.000",
        },
        {
          correct: false,
          label: "Rp221.500",
        },
      ],
    },
  },
};

export default item;
