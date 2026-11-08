import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$220\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$258{,}5\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$297\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$335{,}5\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$374\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
