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
          label: "$$162$$",
        },
        {
          correct: false,
          label: "$$54\\sqrt{3}$$",
        },
        {
          correct: false,
          label: "$$42$$",
        },
        {
          correct: false,
          label: "$$36$$",
        },
        {
          correct: true,
          label: "$$18\\sqrt{3}$$",
        },
      ],
    },
  },
};

export default item;
