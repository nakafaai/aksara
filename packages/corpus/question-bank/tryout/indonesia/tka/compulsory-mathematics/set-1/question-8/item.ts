import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$96\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$100\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$104\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$124\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
