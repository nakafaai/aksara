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
          label: "$$36{,}9\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$328\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$360\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$369\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$1{.}600\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
