import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "scheduling",
  },
  stimulus: "pentas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: true,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
      ],
    },
  },
};

export default item;
