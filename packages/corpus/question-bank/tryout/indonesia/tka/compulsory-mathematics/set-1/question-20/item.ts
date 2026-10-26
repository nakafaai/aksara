import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac8{13}$$",
        },
        {
          correct: false,
          label: "$$\\frac{\\sqrt{105}}8$$",
        },
        {
          correct: false,
          label: "$$\\frac5{13}$$",
        },
        {
          correct: false,
          label: "$$\\frac{12}{13}$$",
        },
        {
          correct: true,
          label: "$$\\frac{\\sqrt{105}}{13}$$",
        },
      ],
    },
  },
};

export default item;
