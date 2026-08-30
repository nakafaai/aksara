import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: true,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P + Q = 3$$",
        },
        {
          isCorrect: false,
          label: "Kann nicht ermittelt werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$P > Q$$" },
        { isCorrect: true, label: "$$P < Q$$" },
        { isCorrect: false, label: "$$P = Q$$" },
        { isCorrect: false, label: "$$P + Q = 3$$" },
        { isCorrect: false, label: "Cannot be determined." },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$P > Q$$" },
        { isCorrect: true, label: "$$P < Q$$" },
        { isCorrect: false, label: "$$P = Q$$" },
        { isCorrect: false, label: "$$P + Q = 3$$" },
        { isCorrect: false, label: "Tidak dapat ditentukan." },
      ],
    },
  },
};

export default item;
