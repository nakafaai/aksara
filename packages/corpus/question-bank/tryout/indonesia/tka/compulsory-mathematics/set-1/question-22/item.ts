import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "call-duration",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{7}{9}$$",
        },
        {
          correct: false,
          label: "$$\\frac{43}{63}$$",
        },
        {
          correct: false,
          label: "$$\\frac{8}{13}$$",
        },
        {
          correct: false,
          label: "$$\\frac{49}{80}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{9}$$",
        },
      ],
    },
  },
};

export default item;
