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
          label: "$$7{,}5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$8{,}4\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$9{,}9\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$10{,}4\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$13{,}26\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
