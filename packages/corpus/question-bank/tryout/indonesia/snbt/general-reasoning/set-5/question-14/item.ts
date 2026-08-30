import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$41\\text{ Stunden }25\\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ Stunden }15\\text{ Minuten}$$",
        },
        {
          isCorrect: true,
          label: "$$41\\text{ Stunden }15\\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ Stunden }25\\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ Stunden }45\\text{ Minuten}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$41\\text{ hours }25\\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ hours }15\\text{ minutes}$$",
        },
        {
          isCorrect: true,
          label: "$$41\\text{ hours }15\\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ hours }25\\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ hours }45\\text{ minutes}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$41\\text{ jam }25\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ jam }15\\text{ menit}$$",
        },
        {
          isCorrect: true,
          label: "$$41\\text{ jam }15\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ jam }25\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ jam }45\\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
