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
          label: "$$0{,}37$$",
        },
        {
          correct: false,
          label: "$$0{,}5$$",
        },
        {
          correct: true,
          label: "$$0{,}63$$",
        },
        {
          correct: false,
          label: "$$0{,}74$$",
        },
        {
          correct: false,
          label: "$$1{,}26$$",
        },
      ],
    },
  },
};

export default item;
