import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{,}5\\times10^{-9}$$",
        },
        {
          correct: false,
          label: "$$6\\times10^{-9}$$",
        },
        {
          correct: true,
          label: "$$1{,}5\\times10^{3}$$",
        },
        {
          correct: false,
          label: "$$1{,}5\\times10^{4}$$",
        },
        {
          correct: false,
          label: "$$1{,}5\\times10^{6}$$",
        },
      ],
    },
  },
};

export default item;
