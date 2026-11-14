import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-\\frac{1}{2}<a<\\frac{11}{3}$$",
        },
        {
          correct: false,
          label: "$$a\\ge3$$",
        },
        {
          correct: false,
          label: "$$3<a<\\frac{11}{3}$$",
        },
        {
          correct: true,
          label: "$$3\\le a<\\frac{11}{3}$$",
        },
        {
          correct: false,
          label: "$$-\\frac{1}{2}<a\\le3$$",
        },
      ],
    },
  },
};

export default item;
