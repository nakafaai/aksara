import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$59$$",
        },
        {
          correct: false,
          label: "$$305$$",
        },
        {
          correct: false,
          label: "$$590$$",
        },
        {
          correct: true,
          label: "$$610$$",
        },
        {
          correct: false,
          label: "$$1{.}220$$",
        },
      ],
    },
  },
};

export default item;
