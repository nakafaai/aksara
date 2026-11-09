import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "komodo",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1991$$",
        },
        {
          correct: false,
          label: "$$1980$$",
        },
        {
          correct: false,
          label: "$$1969$$",
        },
        {
          correct: false,
          label: "$$1990$$",
        },
        {
          correct: false,
          label: "$$1992$$",
        },
      ],
    },
  },
};

export default item;
