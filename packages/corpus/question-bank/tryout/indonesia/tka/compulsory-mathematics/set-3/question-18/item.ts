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
          label: "$$3\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$5\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$9\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$13{,}5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$27\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
