import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$105$$",
        },
        {
          correct: false,
          label: "$$99$$",
        },
        {
          correct: false,
          label: "$$135$$",
        },
        {
          correct: false,
          label: "$$63$$",
        },
        {
          correct: true,
          label: "$$81$$",
        },
      ],
    },
  },
};

export default item;
