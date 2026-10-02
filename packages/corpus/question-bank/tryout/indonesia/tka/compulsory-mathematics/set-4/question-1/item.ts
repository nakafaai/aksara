import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}5\\times10^{-9}$$",
        },
        {
          isCorrect: false,
          label: "$$6\\times10^{-9}$$",
        },
        {
          isCorrect: true,
          label: "$$1{,}5\\times10^{3}$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}5\\times10^{4}$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}5\\times10^{6}$$",
        },
      ],
    },
  },
};

export default item;
