import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "polysemy",
  },
  stimulus: "puter",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "tidak sopan dalam bertutur kata",
        },
        {
          correct: true,
          label: "berbutir dan tidak halus",
        },
        {
          correct: false,
          label: "berat sekali",
        },
        {
          correct: false,
          label: "mahal harganya",
        },
        {
          correct: false,
          label: "besar ukurannya",
        },
      ],
    },
  },
};

export default item;
