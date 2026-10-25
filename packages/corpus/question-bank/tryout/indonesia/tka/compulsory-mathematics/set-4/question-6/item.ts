import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1\\text{ tahun}$$",
        },
        {
          isCorrect: false,
          label: "$$5\\text{ tahun}$$",
        },
        {
          isCorrect: false,
          label: "$$20\\text{ tahun}$$",
        },
        {
          isCorrect: true,
          label: "$$25\\text{ tahun}$$",
        },
        {
          isCorrect: false,
          label: "$$30\\text{ tahun}$$",
        },
      ],
    },
  },
};

export default item;
