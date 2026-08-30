import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}2 \\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$4{,}8 \\text{ Minuten}$$",
        },
        {
          isCorrect: true,
          label: "$$16{,}8 \\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$18{,}8 \\text{ Minuten}$$",
        },
        {
          isCorrect: false,
          label: "$$14{,}2 \\text{ Minuten}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1.2 \\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$4.8 \\text{ minutes}$$",
        },
        {
          isCorrect: true,
          label: "$$16.8 \\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$18.8 \\text{ minutes}$$",
        },
        {
          isCorrect: false,
          label: "$$14.2 \\text{ minutes}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}2 \\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$4{,}8 \\text{ menit}$$",
        },
        {
          isCorrect: true,
          label: "$$16{,}8 \\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$18{,}8 \\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$14{,}2 \\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
