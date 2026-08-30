import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\frac{27\\sqrt{5}}{2}\\text{ cm}^2$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{27\\sqrt{6}}{2}\\text{ cm}^2$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{27\\sqrt{3}}{2}\\text{ cm}^2$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{27\\sqrt{2}}{2}\\text{ cm}^2$$",
        },
        {
          isCorrect: false,
          label: "$$27\\text{ cm}^2$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$\\frac{27\\sqrt{5}}{2}\\text{ cm}^2$$" },
        { isCorrect: false, label: "$$\\frac{27\\sqrt{6}}{2}\\text{ cm}^2$$" },
        { isCorrect: false, label: "$$\\frac{27\\sqrt{3}}{2}\\text{ cm}^2$$" },
        { isCorrect: false, label: "$$\\frac{27\\sqrt{2}}{2}\\text{ cm}^2$$" },
        { isCorrect: false, label: "$$27\\text{ cm}^2$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$\\frac{27\\sqrt{5}}{2}\\text{ cm}^2$$" },
        { isCorrect: false, label: "$$\\frac{27\\sqrt{6}}{2}\\text{ cm}^2$$" },
        { isCorrect: false, label: "$$\\frac{27\\sqrt{3}}{2}\\text{ cm}^2$$" },
        { isCorrect: false, label: "$$\\frac{27\\sqrt{2}}{2}\\text{ cm}^2$$" },
        { isCorrect: false, label: "$$27\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
