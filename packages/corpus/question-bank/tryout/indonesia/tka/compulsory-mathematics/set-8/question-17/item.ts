import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "tabung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$18$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
      ],
    },
  },
};

export default item;
