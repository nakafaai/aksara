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
          label: "$$4x^2-12x+10$$",
        },
        {
          correct: false,
          label: "$$2x^3-3x^2+2x-3$$",
        },
        {
          correct: false,
          label: "$$2x^2-2$$",
        },
        {
          correct: false,
          label: "$$x^2-2$$",
        },
        {
          correct: true,
          label: "$$2x^2-1$$",
        },
      ],
    },
  },
};

export default item;
