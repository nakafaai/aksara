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
          label: "$$f(x)=2x+3$$",
        },
        {
          correct: false,
          label: "$$f(x)=-2x+3$$",
        },
        {
          correct: false,
          label: "$$f(x)=-6x+11$$",
        },
        {
          correct: false,
          label: "$$f(x)=-\\frac12x+\\frac{11}{2}$$",
        },
        {
          correct: true,
          label: "$$f(x)=-2x+7$$",
        },
      ],
    },
  },
};

export default item;
