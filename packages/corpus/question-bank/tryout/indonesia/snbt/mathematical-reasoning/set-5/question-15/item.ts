import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$60 \\text{ tahun}$$",
        },
        {
          isCorrect: true,
          label: "$$57 \\text{ tahun}$$",
        },
        {
          isCorrect: false,
          label: "$$56 \\text{ tahun}$$",
        },
        {
          isCorrect: false,
          label: "$$54 \\text{ tahun}$$",
        },
        {
          isCorrect: false,
          label: "$$52 \\text{ tahun}$$",
        },
      ],
    },
  },
};

export default item;
