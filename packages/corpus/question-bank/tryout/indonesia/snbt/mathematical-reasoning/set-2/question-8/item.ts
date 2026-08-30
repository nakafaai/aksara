import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$37.$$ Monat",
        },
        {
          isCorrect: true,
          label: "$$38.$$ Monat",
        },
        {
          isCorrect: false,
          label: "$$39.$$ Monat",
        },
        {
          isCorrect: false,
          label: "$$40.$$ Monat",
        },
        {
          isCorrect: false,
          label: "$$41.$$ Monat",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$37^{\\text{th}}$$ Month" },
        { isCorrect: true, label: "$$38^{\\text{th}}$$ Month" },
        { isCorrect: false, label: "$$39^{\\text{th}}$$ Month" },
        { isCorrect: false, label: "$$40^{\\text{th}}$$ Month" },
        { isCorrect: false, label: "$$41^{\\text{st}}$$ Month" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Bulan ke-$$37$$" },
        { isCorrect: true, label: "Bulan ke-$$38$$" },
        { isCorrect: false, label: "Bulan ke-$$39$$" },
        { isCorrect: false, label: "Bulan ke-$$40$$" },
        { isCorrect: false, label: "Bulan ke-$$41$$" },
      ],
    },
  },
};

export default item;
