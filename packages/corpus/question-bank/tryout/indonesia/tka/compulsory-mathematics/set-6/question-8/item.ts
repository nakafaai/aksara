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
          label: "$$93$$",
        },
        {
          correct: false,
          label: "$$96$$",
        },
        {
          correct: true,
          label: "$$189$$",
        },
        {
          correct: false,
          label: "$$192$$",
        },
        {
          correct: false,
          label: "$$381$$",
        },
      ],
    },
  },
};

export default item;
