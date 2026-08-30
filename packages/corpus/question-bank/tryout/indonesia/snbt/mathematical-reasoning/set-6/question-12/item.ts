import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1\\text{ Stunde }20\\text{ Minuten}$$",
        },
        {
          isCorrect: true,
          label: "$$1\\text{ Stunde }15\\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ Stunde }25\\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ Stunden }15\\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ Stunden }20\\text{ Minuten}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1\\text{ hour }20\\text{ minutes}$$",
        },
        {
          isCorrect: true,
          label: "$$1\\text{ hour }15\\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ hour }25\\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ hours }15\\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ hours }20\\text{ minutes}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1\\text{ jam }20\\text{ menit}$$",
        },
        {
          isCorrect: true,
          label: "$$1\\text{ jam }15\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ jam }25\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ jam }15\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ jam }20\\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
