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
          correct: true,
          label: "$$f^{-1}(x)=\\frac{2x+1}{3-x},\\ x\\ne3$$",
        },
        {
          correct: false,
          label: "$$f^{-1}(x)=\\frac{x+2}{3x-1},\\ x\\ne\\frac13$$",
        },
        {
          correct: false,
          label: "$$f^{-1}(x)=\\frac{2x-1}{x-3},\\ x\\ne3$$",
        },
        {
          correct: false,
          label: "$$f^{-1}(x)=\\frac{2x+1}{x+3},\\ x\\ne-3$$",
        },
        {
          correct: false,
          label: "$$f^{-1}(x)=\\frac{3-x}{2x+1},\\ x\\ne-\\frac12$$",
        },
      ],
    },
  },
};

export default item;
