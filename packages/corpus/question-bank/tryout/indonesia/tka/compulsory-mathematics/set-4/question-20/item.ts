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
          label: "$$2{,}1\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$3{,}1\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$4{,}5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$4{,}6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$7{,}9\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
