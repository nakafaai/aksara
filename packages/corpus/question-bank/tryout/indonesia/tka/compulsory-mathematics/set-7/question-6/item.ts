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
          label: "$$8x^2+12x-5$$",
        },
        {
          correct: false,
          label: "$$4x^2+6x+2$$",
        },
        {
          correct: false,
          label: "$$2x^2+3x-2$$",
        },
        {
          correct: true,
          label: "$$2x^2+3x+1$$",
        },
        {
          correct: false,
          label: "$$2x^2+3x-1$$",
        },
      ],
    },
  },
};

export default item;
