import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$Df = \\{x | x \\leq 5\\}$$",
        },
        {
          isCorrect: false,
          label: "$$Df = \\{x | 2 < x \\leq 5\\}$$",
        },
        {
          isCorrect: false,
          label: "$$Df = \\{x | x < -3 \\text{ oder } 2 < x < 5\\}$$",
        },
        {
          isCorrect: true,
          label: "$$Df = \\{x | x < -3 \\text{ oder } 2 < x \\leq 5\\}$$",
        },
        {
          isCorrect: false,
          label: "$$Df = \\{x | x < -3 \\text{ oder } 2 \\leq x \\leq 5\\}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$Df = \\{x | x \\leq 5\\}$$" },
        { isCorrect: false, label: "$$Df = \\{x | 2 < x \\leq 5\\}$$" },
        {
          isCorrect: false,
          label: "$$Df = \\{x | x < -3 \\text{ or } 2 < x < 5\\}$$",
        },
        {
          isCorrect: true,
          label: "$$Df = \\{x | x < -3 \\text{ or } 2 < x \\leq 5\\}$$",
        },
        {
          isCorrect: false,
          label: "$$Df = \\{x | x < -3 \\text{ or } 2 \\leq x \\leq 5\\}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$Df = \\{x | x \\leq 5\\}$$" },
        { isCorrect: false, label: "$$Df = \\{x | 2 < x \\leq 5\\}$$" },
        {
          isCorrect: false,
          label: "$$Df = \\{x | x < -3 \\text{ atau } 2 < x < 5\\}$$",
        },
        {
          isCorrect: true,
          label: "$$Df = \\{x | x < -3 \\text{ atau } 2 < x \\leq 5\\}$$",
        },
        {
          isCorrect: false,
          label: "$$Df = \\{x | x < -3 \\text{ atau } 2 \\leq x \\leq 5\\}$$",
        },
      ],
    },
  },
};

export default item;
