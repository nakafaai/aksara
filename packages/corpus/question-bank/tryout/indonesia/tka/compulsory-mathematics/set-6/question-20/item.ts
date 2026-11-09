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
          label: "$$235{,}2\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$245\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$806{,}4\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$875\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2{.}880\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
