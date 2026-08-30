import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$h(t) = 8 \\sin 6{,}2 \\pi t$$",
        },
        {
          isCorrect: false,
          label: "$$h(t) = 8 \\sin \\frac{2\\pi}{6{,}2} t$$",
        },
        {
          isCorrect: true,
          label: "$$h(t) = 8 \\sin \\frac{2\\pi}{12{,}4} t$$",
        },
        {
          isCorrect: false,
          label: "$$h(t) = 16 \\sin \\frac{2\\pi}{6{,}2} t$$",
        },
        {
          isCorrect: false,
          label: "$$h(t) = 16 \\sin \\frac{2\\pi}{12{,}4} t$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$h(t) = 8 \\sin 6.2 \\pi t$$" },
        { isCorrect: false, label: "$$h(t) = 8 \\sin \\frac{2\\pi}{6.2} t$$" },
        { isCorrect: true, label: "$$h(t) = 8 \\sin \\frac{2\\pi}{12.4} t$$" },
        { isCorrect: false, label: "$$h(t) = 16 \\sin \\frac{2\\pi}{6.2} t$$" },
        {
          isCorrect: false,
          label: "$$h(t) = 16 \\sin \\frac{2\\pi}{12.4} t$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$h(t) = 8 \\sin 6{,}2 \\pi t$$" },
        {
          isCorrect: false,
          label: "$$h(t) = 8 \\sin \\frac{2\\pi}{6{,}2} t$$",
        },
        {
          isCorrect: true,
          label: "$$h(t) = 8 \\sin \\frac{2\\pi}{12{,}4} t$$",
        },
        {
          isCorrect: false,
          label: "$$h(t) = 16 \\sin \\frac{2\\pi}{6{,}2} t$$",
        },
        {
          isCorrect: false,
          label: "$$h(t) = 16 \\sin \\frac{2\\pi}{12{,}4} t$$",
        },
      ],
    },
  },
};

export default item;
