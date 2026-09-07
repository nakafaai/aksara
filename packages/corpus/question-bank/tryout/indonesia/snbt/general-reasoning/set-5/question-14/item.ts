import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$41\\text{ Stunden }15\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$41\\text{ Stunden }25\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ Stunden }15\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ Stunden }25\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ Stunden }45\\text{ min}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$41\\text{ hours }15\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$41\\text{ hours }25\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ hours }15\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ hours }25\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ hours }45\\text{ min}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$41\\text{ jam }15\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$41\\text{ jam }25\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ jam }15\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ jam }25\\text{ min}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ jam }45\\text{ min}$$",
        },
      ],
    },
  },
};

export default item;
