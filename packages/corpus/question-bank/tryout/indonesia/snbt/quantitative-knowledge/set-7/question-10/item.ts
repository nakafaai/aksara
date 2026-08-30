import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$PQ = 32$$",
        },
        {
          isCorrect: false,
          label: "Kann nicht bestimmt werden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$P > Q$$" },
        { isCorrect: false, label: "$$P < Q$$" },
        { isCorrect: false, label: "$$P = Q$$" },
        { isCorrect: false, label: "$$PQ = 32$$" },
        { isCorrect: false, label: "Cannot be determined" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$P > Q$$" },
        { isCorrect: false, label: "$$P < Q$$" },
        { isCorrect: false, label: "$$P = Q$$" },
        { isCorrect: false, label: "$$PQ = 32$$" },
        { isCorrect: false, label: "Tidak dapat ditentukan" },
      ],
    },
  },
};

export default item;
