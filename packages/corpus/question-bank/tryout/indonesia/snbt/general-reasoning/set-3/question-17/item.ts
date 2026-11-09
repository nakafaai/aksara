import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grouping",
  },
  stimulus: "rak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: true,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
      ],
    },
  },
};

export default item;
