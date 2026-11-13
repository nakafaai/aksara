import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: true,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$3$$",
        },
      ],
    },
  },
};

export default item;
